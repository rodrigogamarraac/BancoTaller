import "../App.css";

export default function WorkerPage() {
  return (
    <div style={{ padding: 12, fontFamily: "system-ui" }}>
      <h2>Trabajador</h2>
      <p>Calculador de credito</p>
      <div>
        <p>Monto a prestarse (Bolivanos): </p>
        <input type="number" placeholder="Monto solicitado" className="inputs"/>
      </div>
      <div>
        <p>Plazo (meses): </p>
        <input type="number" placeholder="Plazo en meses" className="inputs"/>
      </div>
      <div>
        <p>Ingreso mensual actual (Bolivianos): </p>
        <input type="number" placeholder="Ingresos mensuales" className="inputs"/>
      </div>
      <button onClick={() => alert("Cálculo de crédito realizado")} style={{ marginTop: 16, padding: "10px 14px" }}>
        Calcular crédito
      </button>
    </div>
  );
}