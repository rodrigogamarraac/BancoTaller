import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { obtenerPagosPendientesOrdenados } from "../logica/reglasBanco";

/**
 * ClientPage (modo demo):
 * - Muestra un selector de clientes (viene de la tabla clients)
 * - Al seleccionar un cliente, muestra sus pagos pendientes (tabla payments)
 *
 * Luego, con Auth, este selector se elimina y se usa el user_id logueado.
 */
export default function ClientPage() {
  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [clientsError, setClientsError] = useState("");

  const [selectedClientId, setSelectedClientId] = useState("");

  const [pendingPayments, setPendingPayments] = useState([]);
  const [paymentsLoading, setPaymentsLoading] = useState(false);
  const [paymentsError, setPaymentsError] = useState("");

  useEffect(() => {
    async function loadClients() {
      setClientsLoading(true);
      setClientsError("");

      const { data, error } = await supabase
        .from("clients")
        .select("id, name, email")
        .order("name", { ascending: true });

      if (error) {
        setClientsError(error.message);
        setClients([]);
      } else {
        const list = data ?? [];
        setClients(list);

        if (list.length > 0) {
          setSelectedClientId(list[0].id);
        }
      }

      setClientsLoading(false);
    }

    loadClients();
  }, []);

  useEffect(() => {
    async function loadPendingPayments() {
      if (!selectedClientId) {
        setPendingPayments([]);
        return;
      }

      setPaymentsLoading(true);
      setPaymentsError("");

      
      const { data, error } = await supabase
        .from("payments")
        .select("id, amount, due_date, description, status")
        .eq("client_id", selectedClientId)
        .eq("status", "pending")
        .order("due_date", { ascending: true });

      if (error) {
        setPaymentsError(error.message);
        setPendingPayments([]);
      } else {
        setPendingPayments(obtenerPagosPendientesOrdenados(data ?? []));
      }

      setPaymentsLoading(false);
    }

    loadPendingPayments();
  }, [selectedClientId]);

  
  const selectedClient = clients.find((c) => c.id === selectedClientId);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 760 }}>
      <h2>Cliente</h2>
      <p style={{ opacity: 0.85 }}>
        Selecciona un cliente y revisa sus pagos pendientes.
      </p>

      
      <div style={{ marginTop: 16, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
        <label style={{ display: "block", fontWeight: 600 }}>Seleccionar cliente</label>

        {clientsLoading ? (
          <div style={{ marginTop: 8 }}>Cargando clientes...</div>
        ) : clientsError ? (
          <div role="alert" style={{ marginTop: 8 }}>
            Error cargando clientes: {clientsError}
          </div>
        ) : clients.length === 0 ? (
          <div role="alert" style={{ marginTop: 8 }}>
            No hay clientes registrados.
          </div>
        ) : (
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            style={{ marginTop: 8, width: "100%", padding: 10, fontSize: 16 }}
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} {c.email ? `(${c.email})` : ""}
              </option>
            ))}
          </select>
        )}
      </div>

      
      <div style={{ marginTop: 16 }}>
        <h3>Pagos pendientes</h3>

        {selectedClient ? (
          <p style={{ marginTop: 4, opacity: 0.85 }}>
            Cliente: <strong>{selectedClient.name}</strong>
          </p>
        ) : (
          <p style={{ marginTop: 4, opacity: 0.85 }}>
            Selecciona un cliente para ver sus pagos.
          </p>
        )}

        {paymentsLoading ? (
          <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
            Cargando pagos...
          </div>
        ) : paymentsError ? (
          <div role="alert" style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
            Error cargando pagos: {paymentsError}
          </div>
        ) : pendingPayments.length === 0 ? (
          <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
            No hay pagos pendientes.
          </div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
            {pendingPayments.map((p) => (
              <li
                key={p.id}
                style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}
              >
                <div style={{ fontWeight: 700 }}>
                  Bs. {Number(p.amount).toFixed(2)}
                </div>
                <div style={{ fontSize: 14, opacity: 0.85 }}>
                  Vence: {p.due_date} — {p.description || "Sin descripción"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}