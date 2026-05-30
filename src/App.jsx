import { useState } from "react";

import SupervisorPage from "./pages/SupervisorPage";

import WorkerPage from "./pages/WorkerPage";

import ClientPage from "./pages/ClientPage";

import "./App.css";

export default function App() {
  const [role, setRole] = useState("supervisor");

  function renderPage() {

    if (role === "supervisor") return <SupervisorPage />;
    
    if (role === "worker") return <WorkerPage />;
    
    return <ClientPage />;
  }

  return (
    <div>
      <div
        className="nav"
      >
        <strong>Sección:</strong>
        <h1>
          Banco Creditos
        </h1>

        <button onClick={() => setRole("supervisor")}>
          Supervisor
        </button>

        <button onClick={() => setRole("worker")}>
          Trabajador
        </button>

        <button onClick={() => setRole("client")}>
          Cliente
        </button>

        {/*<h1 style={{padding:20}}>Banco Creditos</h1>*/}
      </div>

      {renderPage()}
    </div>
  );
}