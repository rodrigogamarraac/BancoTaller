import { useState } from "react";
import "../App.css";
import { evaluarSolicitudCredito } from "../logica/reglasBanco";

export default function WorkerPage() {
  const [monto, setMonto] = useState("");
  const [plazoMeses, setPlazoMeses] = useState("");
  const [ingresoMensual, setIngresoMensual] = useState("");
  const [puntajeCrediticio, setPuntajeCrediticio] = useState("");
  const [resultado, setResultado] = useState(null);

  function calcularCredito() {
    const evaluacion = evaluarSolicitudCredito({
      monto,
      plazoMeses,
      ingresoMensual,
      puntajeCrediticio,
    });

    setResultado(evaluacion);
  }

  return (
    <div style={{ padding: 12, fontFamily: "system-ui" }}>
      <h2>Trabajador</h2>
      <p>Calculador de crédito</p>

      <div>
        <p>Monto a prestarse (Bolivianos): </p>
        <input
          type="number"
          placeholder="Monto solicitado"
          className="inputs"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
      </div>

      <div>
        <p>Plazo (meses): </p>
        <input
          type="number"
          placeholder="Plazo en meses"
          className="inputs"
          value={plazoMeses}
          onChange={(e) => setPlazoMeses(e.target.value)}
        />
      </div>

      <div>
        <p>Ingreso mensual actual (Bolivianos): </p>
        <input
          type="number"
          placeholder="Ingresos mensuales"
          className="inputs"
          value={ingresoMensual}
          onChange={(e) => setIngresoMensual(e.target.value)}
        />
      </div>

      <div>
        <p>Puntaje crediticio: </p>
        <input
          type="number"
          placeholder="Puntaje crediticio"
          className="inputs"
          value={puntajeCrediticio}
          onChange={(e) => setPuntajeCrediticio(e.target.value)}
        />
      </div>

      <button onClick={calcularCredito} style={{ marginTop: 16, padding: "10px 14px" }}>
        Calcular crédito
      </button>

      {resultado && (
        <div
          role="status"
          style={{
            marginTop: 16,
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
        >
          <strong>{resultado.aprobado ? "Solicitud aprobada" : "Solicitud rechazada"}</strong>
          <p>{resultado.motivo}</p>
          <p>Cuota mensual estimada: Bs. {resultado.cuotaMensual.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
