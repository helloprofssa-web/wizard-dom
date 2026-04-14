import React, { useMemo, useState } from "react";
import "../App.css";

export default function Step2Selectors() {
  const [highlight, setHighlight] = useState("id");
  const [titleText, setTitleText] = useState("Titolo iniziale");
  const [emails, setEmails] = useState([
    "studente1@example.com",
    "studente2@example.com",
    "studente3@example.com",
  ]);

  const message = useMemo(() => {
    switch (highlight) {
      case "id":
        return "getElementById seleziona un solo elemento tramite il suo id.";
      case "class":
        return "getElementsByClassName seleziona tutti gli elementi con una certa classe.";
      case "name":
        return "getElementsByName restituisce più elementi: possiamo trattarli come una collezione simile a un vettore.";
      case "innerHTML":
        return "innerHTML cambia il contenuto interno di un elemento.";
      case "alert":
        return "alert mostra una finestra di messaggio immediata.";
      default:
        return "Clicca un pulsante per vedere l'effetto.";
    }
  }, [highlight]);

  return (
    <div className="page-content">
      <div className="panel">
        <div className="panel-header">Pagina di esempio</div>
        <div className="panel-body">
          <div className="button-row">
            <button
              className="small-btn"
              onClick={() => {
                setHighlight("id");
                setTitleText("Titolo iniziale");
              }}
            >
              getElementById
            </button>

            <button
              className="small-btn"
              onClick={() => setHighlight("class")}
            >
              getElementsByClassName
            </button>

            <button
              className="small-btn"
              onClick={() => setHighlight("name")}
            >
              getElementsByName
            </button>

            <button
              className="small-btn"
              onClick={() => {
                setHighlight("innerHTML");
                setTitleText("Titolo modificato con innerHTML");
              }}
            >
              innerHTML
            </button>

            <button
              className="small-btn"
              onClick={() => {
                setHighlight("alert");
                window.alert("Questo è un esempio di alert.");
              }}
            >
              alert
            </button>
          </div>

          <div className="demo-card">
            <h2
              className={
                highlight === "id" || highlight === "innerHTML" ? "hl-blue" : ""
              }
            >
              {titleText}
            </h2>

            <p className={highlight === "class" ? "hl-yellow block" : "block"}>
              Messaggio con classe <code>messaggio</code>
            </p>

            {emails.map((email, index) => (
              <input
                key={index}
                className={highlight === "name" ? "hl-green input" : "input"}
                value={email}
                onChange={(e) => {
                  const copy = [...emails];
                  copy[index] = e.target.value;
                  setEmails(copy);
                }}
                style={{ marginBottom: "8px" }}
              />
            ))}

            {highlight === "name" && (
              <div className="vector-box">
                <p>
                  <strong>Simulazione vettore</strong>
                </p>
                <p>length: {emails.length}</p>
                <p>elemento [0]: {emails[0] || "(vuoto)"}</p>
                <p>elemento [1]: {emails[1] || "(vuoto)"}</p>
                <p>elemento [2]: {emails[2] || "(vuoto)"}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Spiegazione</div>
        <div className="panel-body">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}