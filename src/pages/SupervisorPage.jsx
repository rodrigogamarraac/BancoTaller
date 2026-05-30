import { useEffect, useMemo, useState } from "react";
import supabase from "../supabaseClient";
import {
  filtrarClientesPorBusqueda,
  validarIdUsuario,
} from "../logica/reglasBanco";

export default function App() {
  const [userId, setUserId] = useState("");
  const [history, setHistory] = useState(null);
  const [alertMsg, setAlertMsg] = useState("");

  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [clientsError, setClientsError] = useState("");

  const [clientQuery, setClientQuery] = useState("");

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
        setClients(data ?? []);
      }

      setClientsLoading(false);
    }

    loadClients();
  }, []);

  const filteredClients = useMemo(() => {
    return filtrarClientesPorBusqueda(clients, clientQuery);
  }, [clientQuery, clients]);

  async function openHistory() {
    setAlertMsg("");
    setHistory(null);

    const validacion = validarIdUsuario(userId);
    if (!validacion.valido) {
      setAlertMsg(validacion.mensaje);
      return;
    }

    const { data, error } = await supabase
      .from("credit_histories")
      .select("credit_score")
      .eq("client_id", validacion.id)
      .maybeSingle();

    if (error) {
      setAlertMsg("No existe ese cliente");
      return;
    }

    if (!data) {
      setAlertMsg("No existe historial para ese usuario.");
      return;
    }

    setHistory({ creditScore: data.credit_score });
  }

  return (
    <div style={{ padding: 12, fontFamily: "system-ui", maxWidth: 760 }}>
      <p>Panel del supervisor</p>

      <h2 style={{ marginTop: 16 }}>Historial de crédito</h2>

      <label style={{ display: "block", marginTop: 12 }}>ID de usuario</label>

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Pega aquí el ID"
          style={{ flex: 1, padding: 10, fontSize: 16 }}
        />
        <button onClick={openHistory} style={{ padding: "10px 14px" }}>
          Ver historial
        </button>
      </div>

      {alertMsg && (
        <div
          role="alert"
          style={{
            marginTop: 12,
            padding: 12,
            background: "#ffe5e5",
            border: "1px solid #ffb3b3",
            borderRadius: 8,
          }}
        >
          {alertMsg}
        </div>
      )}

      {history && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            background: "#e9f7ef",
            border: "1px solid #b7e4c7",
            borderRadius: 8,
          }}
        >
          <strong>Puntaje crediticio:</strong> {history.creditScore}
        </div>
      )}

      <h2 style={{ marginTop: 28 }}>Clientes</h2>

      <label style={{ display: "block", marginTop: 12 }}>
        Buscar cliente
      </label>

      <input
        value={clientQuery}
        onChange={(e) => setClientQuery(e.target.value)}
        placeholder="Ej: Ana"
        style={{ width: "100%", padding: 10, fontSize: 16, marginTop: 8 }}
      />

      <div style={{ marginTop: 12 }}>
        {clientsLoading ? (
          <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
            Cargando clientes...
          </div>
        ) : clientsError ? (
          <div role="alert" style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
            Error: {clientsError}
          </div>
        ) : filteredClients.length === 0 ? (
          <div role="alert" style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
            No se encontraron clientes.
          </div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
            {filteredClients.map((client) => (
              <li
                key={client.id}
                style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}
              >
                <div style={{ fontWeight: 700 }}>{client.name}</div>
                <div style={{ fontSize: 14, opacity: 0.85 }}>
                  UUID: {client.id} - Email: {client.email ?? "(sin email)"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
