import React, { useState, useEffect } from "react";
import "../App.css";
import {
  inputEvents,
  buttonEvents,
  radioEvents,
  checkboxEvents,
  selectEvents,
} from "./eventsData";

const CodeBox = ({ code }) => {
  const lines = code.split("\n");

  return (
    <div className="interactive-code-block">
      <div className="interactive-code-content">
        {lines.map((line, index) => (
          <div key={`${index}-${line}`} className="interactive-code-line static-code-line">
            <span className="interactive-code-number">{index + 1}</span>
            <span className="interactive-code-text">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const renderEventModal = (isOpen, onClose, title, events, elementType) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
            <h2>Eventi {title}</h2>
            <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
        <div style={{ marginBottom: "20px" }}>
          <p style={{ color: "#374151", lineHeight: "1.6" }}>
            Ecco gli eventi più importanti che puoi associare agli elementi{" "}
            <code>&lt;{elementType}&gt;</code>.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {events.map((event, index) => (
            <div
              key={event.name}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "16px",
                background: index % 2 === 0 ? "#f8fafc" : "white",
              }}
            >
              <code
                style={{
                  background: "#e0e7ff",
                  color: "#1e3a8a",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                }}
              >
                {event.name}
              </code>

              <p
                style={{
                  margin: "12px 0 8px",
                  color: "#374151",
                  lineHeight: "1.5",
                }}
              >
                {event.description}
              </p>

              <div
                style={{
                  background: "#020617",
                  color: "#f8fafc",
                  padding: "12px",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "0.85rem",
                  overflow: "auto",
                }}
              >
                {event.example}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default function Step3EventsIntro() {
  const [showInputModal, setShowInputModal] = useState(false);
  const [showButtonModal, setShowButtonModal] = useState(false);
  const [showRadioModal, setShowRadioModal] = useState(false);
  const [showCheckboxModal, setShowCheckboxModal] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [listenerMessage, setListenerMessage] = useState(
    "Premi il bottone per vedere un esempio con addEventListener."
  );

  useEffect(() => {
    const button = document.getElementById("demo-listener-button");

    const handleClick = () => {
      setListenerMessage(
        "Questo messaggio è stato aggiornato tramite addEventListener."
      );
    };

    if (button) {
      button.addEventListener("click", handleClick);
    }

    return () => {
      if (button) {
        button.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <div className="page-content">
      <div className="panel">
        <div className="panel-header">Introduzione agli eventi</div>
        <div className="panel-body">
          <p style={{ color: "#374151", lineHeight: "1.7" }}>
            Gli eventi permettono a JavaScript di reagire alle azioni
            dell’utente. Per esempio, un click su un bottone, la digitazione in
            un campo di input o la selezione di una voce in una lista.
          </p>
          <p style={{ color: "#374151", lineHeight: "1.7" }}>
            Ogni elemento HTML può essere associato ad alcuni eventi specifici.
            Scegli un tipo di elemento per vedere gli eventi più comuni.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <button className="primary-btn" onClick={() => setShowInputModal(true)}>
              📝 Input
            </button>
            <button className="primary-btn" onClick={() => setShowButtonModal(true)}>
              🔘 Button
            </button>
            <button className="primary-btn" onClick={() => setShowRadioModal(true)}>
              ⭕ Radio
            </button>
            <button className="primary-btn" onClick={() => setShowCheckboxModal(true)}>
              ☑️ Checkbox
            </button>
            <button className="primary-btn" onClick={() => setShowSelectModal(true)}>
              📋 Select
            </button>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Due modi per collegare un evento</div>
        <div className="panel-body">
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "16px",
                background: "#f8fafc",
              }}
            >
              <h4 style={{ marginTop: 0, color: "#0f172a", height: "40px" }}>
                1. Evento associato direttamente all’elemento
              </h4>
              <p style={{ color: "#374151", lineHeight: "2.5" }}>
                In HTML classico si può scrivere l’evento direttamente nel tag,
                ad esempio:
              </p>
              <CodeBox code={`<button id="mioBottone" onclick="saluta()">Cliccami</button>`} />
            
            </div>

            <div
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "16px",
                background: "#f8fafc",
              }}
            >
              <h4 style={{ marginTop: 0, color: "#0f172a" }}>
                2. Evento associato con <code>addEventListener()</code>
              </h4>
              <p style={{ color: "#374151", lineHeight: "1.6" }}>
                In JavaScript tradizionale si può prima selezionare un elemento
                e poi collegare l’evento con <code>addEventListener()</code>.
              </p>
              <CodeBox
                code={`const bottone = document.getElementById("mioBottone");

bottone.addEventListener("click", function () {
  console.log("Hai fatto click");
});`}
              />
              <p style={{ color: "#374151", lineHeight: "1.6", marginTop: "12px" }}>
                Questo metodo separa la struttura HTML dalla logica JavaScript.
                È molto usato nel JavaScript tradizionale.
              </p>
            </div>

            <div
              style={{
                border: "1px solid #fde68a",
                borderRadius: "10px",
                padding: "16px",
                background: "#fef3c7",
              }}
            >
              <h4 style={{ marginTop: 0, color: "#92400e" }}>Differenza principale</h4>
              <p style={{ margin: 0, color: "#78350f", lineHeight: "1.7" }}>
                Con l’evento scritto nel tag, l’associazione è immediata e visibile
                direttamente sull’elemento. <br/>Con <code>addEventListener()</code>,
                invece, l’evento viene collegato via JavaScript dopo aver
                selezionato l’elemento. 
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Piccolo esempio con addEventListener</div>
        <div className="panel-body">
          <button id="demo-listener-button" className="primary-btn">
            Prova addEventListener
          </button>
          <p style={{ marginTop: "16px", color: "#374151" }}>{listenerMessage}</p>
        </div>
      </div>

      {renderEventModal(showInputModal, () => setShowInputModal(false), "degli Input", inputEvents, "input")}
      {renderEventModal(showButtonModal, () => setShowButtonModal(false), "dei Button", buttonEvents, "button")}
      {renderEventModal(showRadioModal, () => setShowRadioModal(false), "dei Radio Button", radioEvents, 'input type="radio"')}
      {renderEventModal(showCheckboxModal, () => setShowCheckboxModal(false), "delle Checkbox", checkboxEvents, 'input type="checkbox"')}
      {renderEventModal(showSelectModal, () => setShowSelectModal(false), "dei Select", selectEvents, "select")}
    </div>
  );
}
