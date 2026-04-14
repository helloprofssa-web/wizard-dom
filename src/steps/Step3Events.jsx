import React, { useState } from "react";
import "../App.css";

export default function Step3Events() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    "Compila il form per vedere gli eventi in azione."
  );

  return (
    <div className="page-content">
      <div className="panel">
        <div className="panel-header">Form di esempio</div>
        <div className="panel-body">
          <div className="form-grid">
            <div>
              <label>Nome</label>
              <input
                className="input"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setMessage(`Evento input sul campo nome: ${e.target.value}`);
                }}
                onFocus={() => setMessage("Evento focus sul campo nome")}
                onBlur={() => setMessage("Evento blur sul campo nome")}
              />
            </div>

            <div>
              <label>Email</label>
              <input
                className="input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage(`Evento input sul campo email: ${e.target.value}`);
                }}
                onFocus={() => setMessage("Evento focus sul campo email")}
                onBlur={() => setMessage("Evento blur sul campo email")}
              />
            </div>
          </div>

          <div className="button-row">
            <button
              className="primary-btn"
              onClick={() => window.alert(`Ciao ${name || "studente"}!`)}
            >
              Alert di saluto
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                setMessage(`Click sul bottone con nome = ${name || "(vuoto)"}`)
              }
            >
              Simula click
            </button>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Output evento</div>
        <div className="panel-body">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}