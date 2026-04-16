import React, { useState } from "react";
import "../App.css";

const renderEventModal = (isOpen, onClose, title, events, elementType) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 style={{ margin: 0, color: "#0f172a" }}>Eventi {title}</h2>
          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ color: "#374151", lineHeight: "1.6" }}>
            Ecco gli eventi più importanti che puoi associare agli elementi <code>&lt;{elementType}&gt;</code>.
            Ogni evento si attiva in momenti diversi dell'interazione con l'utente.
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
                background: index % 2 === 0 ? "#f8fafc" : "white"
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "8px"
              }}>
                <code style={{
                  background: "#e0e7ff",
                  color: "#1e3a8a",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontWeight: "bold"
                }}>
                  {event.name}
                </code>
              </div>

              <p style={{
                margin: "8px 0",
                color: "#374151",
                lineHeight: "1.5"
              }}>
                {event.description}
              </p>

              <div style={{
                background: "#020617",
                color: "#f8fafc",
                padding: "12px",
                borderRadius: "8px",
                fontFamily: "monospace",
                fontSize: "0.85rem",
                overflow: "auto"
              }}>
                {event.example}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: "24px",
          padding: "16px",
          background: "#eff6ff",
          borderRadius: "12px",
          border: "1px solid #bfdbfe"
        }}>
          <h3 style={{ margin: "0 0 12px 0", color: "#1d4ed8" }}>💡 Suggerimento</h3>
          <p style={{ margin: 0, color: "#1e40af", lineHeight: "1.5" }}>
            Usa gli eventi più appropriati per il tipo di elemento selezionato.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Step3Events() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    "Compila il form per vedere gli eventi in azione."
  );
  const [showEventsModal, setShowEventsModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showButtonModal, setShowButtonModal] = useState(false);
  const [showRadioModal, setShowRadioModal] = useState(false);
  const [showCheckboxModal, setShowCheckboxModal] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);

  const inputEvents = [
    {
      name: "focus",
      description: "Si attiva quando l'input riceve il focus (cliccato o tabbato)",
      example: "onFocus={() => console.log('Input attivato')}"
    },
    {
      name: "blur",
      description: "Si attiva quando l'input perde il focus",
      example: "onBlur={() => console.log('Input disattivato')}"
    },
    {
      name: "input",
      description: "Si attiva ogni volta che il valore cambia (più moderno di change)",
      example: "onInput={(e) => console.log('Valore:', e.target.value)}"
    },
    {
      name: "change",
      description: "Si attiva quando il valore cambia e perde il focus",
      example: "onChange={(e) => setValue(e.target.value)}"
    },
    {
      name: "keydown",
      description: "Si attiva quando un tasto viene premuto",
      example: "onKeyDown={(e) => console.log('Tasto:', e.key)}"
    },
    {
      name: "keyup",
      description: "Si attiva quando un tasto viene rilasciato",
      example: "onKeyUp={(e) => console.log('Tasto rilasciato:', e.key)}"
    },
    {
      name: "keypress",
      description: "Si attiva quando un tasto viene premuto (deprecato)",
      example: "onKeyPress={(e) => console.log('Carattere:', e.key)}"
    }
  ];

  const buttonEvents = [
    {
      name: "click",
      description: "Si attiva quando il bottone viene cliccato",
      example: "onClick={() => console.log('Bottone cliccato')}"
    },
    {
      name: "mouseover",
      description: "Si attiva quando il mouse entra nell'area del bottone",
      example: "onMouseOver={() => console.log('Mouse sopra')}"
    },
    {
      name: "mouseout",
      description: "Si attiva quando il mouse esce dall'area del bottone",
      example: "onMouseOut={() => console.log('Mouse fuori')}"
    },
    {
      name: "focus",
      description: "Si attiva quando il bottone riceve il focus",
      example: "onFocus={() => console.log('Focus sul bottone')}"
    },
    {
      name: "blur",
      description: "Si attiva quando il bottone perde il focus",
      example: "onBlur={() => console.log('Blur sul bottone')}"
    }
  ];

  const radioEvents = [
    {
      name: "change",
      description: "Si attiva quando il radio button viene selezionato/deselezionato",
      example: "onChange={(e) => console.log('Radio cambiato:', e.target.checked)}"
    },
    {
      name: "click",
      description: "Si attiva quando il radio button viene cliccato",
      example: "onClick={() => console.log('Radio cliccato')}"
    }
  ];

  const checkboxEvents = [
    {
      name: "change",
      description: "Si attiva quando la checkbox viene selezionato/deselezionato",
      example: "onChange={(e) => console.log('Checkbox cambiata:', e.target.checked)}"
    },
    {
      name: "click",
      description: "Si attiva quando la checkbox viene cliccata",
      example: "onClick={() => console.log('Checkbox cliccata')}"
    }
  ];

  const selectEvents = [
    {
      name: "change",
      description: "Si attiva quando cambia la selezione",
      example: "onChange={(e) => console.log('Selezione:', e.target.value)}"
    },
    {
      name: "focus",
      description: "Si attiva quando il select riceve il focus",
      example: "onFocus={() => console.log('Focus sul select')}"
    },
    {
      name: "blur",
      description: "Si attiva quando il select perde il focus",
      example: "onBlur={() => console.log('Blur sul select')}"
    }
  ];

  return (
    <div className="page-content">
      <div className="panel">
        <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Form di esempio</span>
          <button
            className="small-btn"
            onClick={() => setShowEventsModal(true)}
          >
            📋 Eventi
          </button>
        </div>
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

      {/* Modal principale per selezionare il tipo di elemento */}
      {showEventsModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowEventsModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 style={{ margin: 0, color: "#0f172a" }}>Eventi per elemento</h2>
              <button
                className="modal-close"
                onClick={() => setShowEventsModal(false)}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#374151", lineHeight: "1.6" }}>
                Scegli il tipo di elemento per vedere gli eventi principali associati.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              <button
                className="primary-btn"
                onClick={() => {
                  setShowEventsModal(false);
                  setShowInputModal(true);
                }}
                style={{ padding: "12px", textAlign: "center" }}
              >
                📝 Input
              </button>
              <button
                className="primary-btn"
                onClick={() => {
                  setShowEventsModal(false);
                  setShowButtonModal(true);
                }}
                style={{ padding: "12px", textAlign: "center" }}
              >
                🔘 Button
              </button>
              <button
                className="primary-btn"
                onClick={() => {
                  setShowEventsModal(false);
                  setShowRadioModal(true);
                }}
                style={{ padding: "12px", textAlign: "center" }}
              >
                ⭕ Radio
              </button>
              <button
                className="primary-btn"
                onClick={() => {
                  setShowEventsModal(false);
                  setShowCheckboxModal(true);
                }}
                style={{ padding: "12px", textAlign: "center" }}
              >
                ☑️ Checkbox
              </button>
              <button
                className="primary-btn"
                onClick={() => {
                  setShowEventsModal(false);
                  setShowSelectModal(true);
                }}
                style={{ padding: "12px", textAlign: "center" }}
              >
                📋 Select
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modali per ciascun tipo di elemento */}
      {renderEventModal(showInputModal, () => setShowInputModal(false), "degli Input", inputEvents, "input")}
      {renderEventModal(showButtonModal, () => setShowButtonModal(false), "dei Button", buttonEvents, "button")}
      {renderEventModal(showRadioModal, () => setShowRadioModal(false), "dei Radio Button", radioEvents, 'input type="radio"')}
      {renderEventModal(showCheckboxModal, () => setShowCheckboxModal(false), "delle Checkbox", checkboxEvents, 'input type="checkbox"')}
      {renderEventModal(showSelectModal, () => setShowSelectModal(false), "dei Select", selectEvents, "select")}
    </div>
  );
}