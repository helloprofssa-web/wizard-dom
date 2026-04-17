import React, { useState, useEffect } from "react";
import "../App.css";
import { inputEvents, buttonEvents, radioEvents, checkboxEvents, selectEvents } from "./eventsData";

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
      </div>
    </div>
  );
};

export default function Step3Events() {
  const [name, setName] = useState("");
  const [genere, setGenere] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [paese, setPaese] = useState("");
  const [message, setMessage] = useState(
    "Interagisci con i campi del form per vedere gli eventi e i valori in azione. Osserva come cambiano le proprietà value e checked."
  );
  const [showButtonModal, setShowButtonModal] = useState(false);
  const [showRadioModal, setShowRadioModal] = useState(false);
  const [showCheckboxModal, setShowCheckboxModal] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);

  useEffect(() => {
    const handler = (event) => {
      if (event.detail?.eventType) {
        const { eventType } = event.detail;
        if (["focus", "input", "blur"].includes(eventType)) {
          setShowInputModal(true);
        } else if (eventType === "click") {
          setShowButtonModal(true);
        } else if (eventType === "change") {
          setShowRadioModal(true);
        }
      }
    };

    window.addEventListener("step3-highlight", handler);
    return () => window.removeEventListener("step3-highlight", handler);
  }, []);

  return (
    <div className="page-content">
      <div className="panel">
        <div className="panel-header">Eventi per elemento</div>
        <div className="panel-body">
          <p style={{ color: "#374151", lineHeight: "1.6", marginBottom: "20px" }}>
            Scegli il tipo di elemento per vedere gli eventi principali associati.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
            <button
              className="primary-btn"
              onClick={() => setShowInputModal(true)}
              style={{ padding: "12px", textAlign: "center" }}
            >
              📝 Input
            </button>
            <button
              className="primary-btn"
              onClick={() => setShowButtonModal(true)}
              style={{ padding: "12px", textAlign: "center" }}
            >
              🔘 Button
            </button>
            <button
              className="primary-btn"
              onClick={() => setShowRadioModal(true)}
              style={{ padding: "12px", textAlign: "center" }}
            >
              ⭕ Radio
            </button>
            <button
              className="primary-btn"
              onClick={() => setShowCheckboxModal(true)}
              style={{ padding: "12px", textAlign: "center" }}
            >
              ☑️ Checkbox
            </button>
            <button
              className="primary-btn"
              onClick={() => setShowSelectModal(true)}
              style={{ padding: "12px", textAlign: "center" }}
            >
              📋 Select
            </button>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Form di esempio</div>
        <div className="panel-body">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label>Nome</label>
              <input
                id="nome"
                type="text"
                className="input"
                value={name}
                placeholder="Scrivi il tuo nome"
                onChange={(e) => {
                  setName(e.target.value);
                  setMessage(`Evento input sul campo nome: ${e.target.value}`);
                  window.dispatchEvent(new CustomEvent('step3-code-highlight', { detail: { line: 12 } }));
                }}
                onFocus={() => {
                  setMessage("Evento focus sul campo nome");
                  window.dispatchEvent(new CustomEvent('step3-code-highlight', { detail: { line: 8 } }));
                }}
                onBlur={() => {
                  setMessage("Evento blur sul campo nome");
                  window.dispatchEvent(new CustomEvent('step3-code-highlight', { detail: { line: 16 } }));
                }}
              />
            </div>

            <div>
              <label>Genere</label>
              <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                <label>
                  <input
                    type="radio"
                    name="genere"
                    value="maschio"
                    id="maschio"
                    checked={genere === "maschio"}
                    onChange={(e) => {
                      setGenere(e.target.value);
                      setMessage(`Evento change sul radio: ${e.target.value}`);
                      window.dispatchEvent(new CustomEvent('step3-code-highlight', { detail: { line: 20 } }));
                    }}
                  />
                  Maschio
                </label>
                <label>
                  <input
                    type="radio"
                    name="genere"
                    value="femmina"
                    id="femmina"
                    checked={genere === "femmina"}
                    onChange={(e) => {
                      setGenere(e.target.value);
                      setMessage(`Evento change sul radio: ${e.target.value}`);
                      window.dispatchEvent(new CustomEvent('step3-code-highlight', { detail: { line: 20 } }));
                    }}
                  />
                  Femmina
                </label>
              </div>
            </div>

            <div>
              <label>
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={newsletter}
                  onChange={(e) => {
                    setNewsletter(e.target.checked);
                    setMessage(`Evento change sulla checkbox: ${e.target.checked ? "selezionata" : "deselezionata"}`);
                    window.dispatchEvent(new CustomEvent('step3-code-highlight', { detail: { line: 24 } }));
                  }}
                />
                Iscriviti alla newsletter
              </label>
            </div>

            <div>
              <label>Paese</label>
              <select
                id="paese"
                className="input"
                value={paese}
                onChange={(e) => {
                  setPaese(e.target.value);
                  setMessage(`Evento change sul select: ${e.target.value}`);
                  window.dispatchEvent(new CustomEvent('step3-code-highlight', { detail: { line: 28 } }));
                }}
                style={{ marginTop: "8px" }}
              >
                <option value="">Seleziona paese</option>
                <option value="it">Italia</option>
                <option value="fr">Francia</option>
              </select>
            </div>
          </div>

          <div className="button-row">
            <button
              id="saluta"
              className="primary-btn"
              onClick={() => {
                window.alert(`Ciao ${name || "studente"}!`);
                window.dispatchEvent(new CustomEvent('step3-code-highlight', { detail: { line: 32 } }));
              }}
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
        <div className="panel-header">Spiegazione dei valori negli elementi form</div>
        <div className="panel-body">
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px", background: "#f8fafc" }}>
              <h4 style={{ margin: "0 0 12px", color: "#0f172a" }}>📝 Proprietà <code>value</code></h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <strong>Input text:</strong> Contiene il testo digitato dall'utente.
                  <br />
                  <code style={{ background: "#e0e7ff", padding: "2px 6px", borderRadius: "4px" }}>
                    inputNome.value = "{name}"
                  </code>
                </div>
                <div>
                  <strong>Radio button:</strong> Il valore dell'opzione selezionata nel gruppo.
                  <br />
                  <code style={{ background: "#e0e7ff", padding: "2px 6px", borderRadius: "4px" }}>
                    genere = "{genere}"
                  </code>
                </div>
                <div>
                  <strong>Select:</strong> Il valore dell'opzione selezionata (attributo <code>value</code> dell'<code>&lt;option&gt;</code>).
                  <br />
                  <code style={{ background: "#e0e7ff", padding: "2px 6px", borderRadius: "4px" }}>
                    paese = "{paese}"
                  </code>
                  <br />
                  <small style={{ color: "#64748b" }}>
                    Nota: il testo visualizzato ("Italia", "Francia") è diverso dal valore interno ("it", "fr")
                  </small>
                </div>
              </div>
            </div>

            <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px", background: "#f8fafc" }}>
              <h4 style={{ margin: "0 0 12px", color: "#0f172a" }}>☑️ Proprietà <code>checked</code></h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <strong>Radio button:</strong> <code>true</code> se quell'opzione è selezionata, <code>false</code> altrimenti.
                  <br />
                  <code style={{ background: "#e0e7ff", padding: "2px 6px", borderRadius: "4px" }}>
                    maschio.checked = {genere === "maschio" ? "true" : "false"}
                  </code>
                </div>
                <div>
                  <strong>Checkbox:</strong> <code>true</code> se la casella è spuntata, <code>false</code> se deselezionata.
                  <br />
                  <code style={{ background: "#e0e7ff", padding: "2px 6px", borderRadius: "4px" }}>
                    newsletter.checked = {newsletter ? "true" : "false"}
                  </code>
                </div>
              </div>
            </div>

            <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px", background: "#fef3c7" }}>
              <h4 style={{ margin: "0 0 12px", color: "#92400e" }}>💡 Concetto chiave</h4>
              <p style={{ margin: 0, color: "#78350f", lineHeight: "1.6" }}>
                Gli elementi form hanno proprietà che riflettono il loro stato attuale.
                <strong>value</strong> contiene il dato da elaborare, mentre <strong>checked</strong> indica lo stato di selezione.
                Questi valori vengono letti negli event handler per reagire alle interazioni dell'utente.
              </p>
            </div>

          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Valori attuali del form</div>
        <div className="panel-body">
          <div style={{ fontFamily: "monospace", background: "#020617", color: "#f8fafc", padding: "16px", borderRadius: "8px", overflow: "auto" }}>
            <div style={{ marginBottom: "8px" }}>
              <span style={{ color: "#60a5fa" }}>const</span> formData = {"{"}
            </div>
            <div style={{ marginLeft: "20px", marginBottom: "4px" }}>
              name: <span style={{ color: "#34d399" }}>"{name}"</span>,
            </div>
            <div style={{ marginLeft: "20px", marginBottom: "4px" }}>
              genere: <span style={{ color: "#34d399" }}>"{genere}"</span>,
            </div>
            <div style={{ marginLeft: "20px", marginBottom: "4px" }}>
              newsletter: <span style={{ color: "#fbbf24" }}>{newsletter.toString()}</span>,
            </div>
            <div style={{ marginLeft: "20px", marginBottom: "8px" }}>
              paese: <span style={{ color: "#34d399" }}>"{paese}"</span>
            </div>
            <div>{"}"};</div>
          </div>
          <p style={{ marginTop: "12px", fontSize: "0.9rem", color: "#64748b" }}>
            Questi sono i valori che JavaScript può leggere dagli elementi del form per elaborare i dati inseriti dall'utente.
          </p>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Output evento</div>
        <div className="panel-body">
          <p>{message}</p>
        </div>
      </div>

      {/* Modali per ciascun tipo di elemento */}
      {renderEventModal(showInputModal, () => setShowInputModal(false), "degli Input", inputEvents, "input")}
      {renderEventModal(showButtonModal, () => setShowButtonModal(false), "dei Button", buttonEvents, "button")}
      {renderEventModal(showRadioModal, () => setShowRadioModal(false), "dei Radio Button", radioEvents, 'input type="radio"')}
      {renderEventModal(showCheckboxModal, () => setShowCheckboxModal(false), "delle Checkbox", checkboxEvents, 'input type="checkbox"')}
      {renderEventModal(showSelectModal, () => setShowSelectModal(false), "dei Select", selectEvents, "select")}
    </div>

  );
};
