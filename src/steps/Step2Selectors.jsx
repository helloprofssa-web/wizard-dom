import React, { useMemo, useState } from "react";
import "../App.css";

const actionMap = {
  id: {
    title: "getElementById",
    jsLines: [2],
    htmlTargets: ["title"],
    explanation:
      "getElementById seleziona un solo elemento tramite il suo id.",
  },
  class: {
    title: "getElementsByClassName",
    jsLines: [3],
    htmlTargets: ["message"],
    explanation:
      "getElementsByClassName seleziona tutti gli elementi con una certa classe.",
  },
  name: {
    title: "getElementsByName",
    jsLines: [4, 10, 11, 13, 14, 15],
    htmlTargets: ["email1", "email2", "email3"],
    explanation:
      "getElementsByName restituisce una collezione di elementi con lo stesso attributo name.",
  },
  innerHTML: {
    title: "innerHTML",
    jsLines: [7],
    htmlTargets: ["title"],
    explanation:
      "innerHTML modifica il contenuto interno di un elemento.",
  },
  alert: {
    title: "alert",
    jsLines: [18],
    htmlTargets: [],
    explanation:
      "alert mostra una finestra di messaggio immediata.",
  },
};

export default function Step2Selectors() {
  const [activeAction, setActiveAction] = useState("id");
  const [titleText, setTitleText] = useState("Titolo iniziale");
  const [showFakeAlert, setShowFakeAlert] = useState(false);
  const [emails, setEmails] = useState([
    "studente1@example.com",
    "studente2@example.com",
    "studente3@example.com",
  ]);

  const current = useMemo(() => actionMap[activeAction], [activeAction]);

  function triggerAction(action) {
    setActiveAction(action);
    setShowFakeAlert(false);

    if (action === "id") {
      setTitleText("Titolo iniziale");
    }

    if (action === "innerHTML") {
      setTitleText("Titolo modificato con innerHTML");
    }

    if (action === "alert") {
      setShowFakeAlert(true);
    }
  }

  function isHtmlActive(target) {
    return current.htmlTargets.includes(target);
  }

  return (
    <div className="page-content">
      <div className="panel">
        <div className="panel-header">Step 2: Selettori CSS</div>
        <div className="panel-body">
          <p>
            Qui vediamo una vera pagina web: l'HTML definisce gli elementi, mentre JavaScript li seleziona e li modifica. 
            <ul className="function-list">
              <li><i>getElementById</i>: restituisce un solo elemento;</li>
              <li><i>getElementsByClassName</i>: restituiscono una collezione di elementi caratterizzati dallo stesso attributo className;</li>
              <li><i>getElementsByName</i>: restituiscono una collezione di elementi caratterizzati dallo stesso attributo name;</li>
            </ul>
          </p>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Selettori disponibili</div>
        <div className="panel-body">
          <div className="button-row">
            <button className="small-btn" onClick={() => triggerAction("id")}>
              getElementById
            </button>

            <button
              className="small-btn"
              onClick={() => triggerAction("class")}
            >
              getElementsByClassName
            </button>

            <button className="small-btn" onClick={() => triggerAction("name")}>
              getElementsByName
            </button>

            <button
              className="small-btn"
              onClick={() => triggerAction("innerHTML")}
            >
              innerHTML
            </button>

            <button className="small-btn" onClick={() => triggerAction("alert")}>
              alert
            </button>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Pagina di esempio</div>
        <div className="panel-body">
          <div className="demo-card">
            <h2 className={isHtmlActive("title") ? "hl-blue" : ""}>
              {titleText}
            </h2>

            <p
              className={
                isHtmlActive("message") ? "hl-yellow block" : "block"
              }
            >
              Messaggio con classe <code>messaggio</code>
            </p>

            <div className="step2-inputs">
              {emails.map((email, index) => {
                const target = `email${index + 1}`;
                return (
                  <input
                    key={index}
                    className={isHtmlActive(target) ? "hl-green input" : "input"}
                    value={email}
                    onChange={(e) => {
                      const copy = [...emails];
                      copy[index] = e.target.value;
                      setEmails(copy);
                    }}
                  />
                );
              })}
            </div>

            {activeAction === "name" && (
              <div className="vector-box">
                <p>
                  <strong>Simulazione collezione restituita da getElementsByName</strong>
                </p>
                <p>length: {emails.length}</p>
                <p>email[0]: {emails[0]}</p>
                <p>email[1]: {emails[1]}</p>
                <p>email[2]: {emails[2]}</p>
              </div>
            )}

            {showFakeAlert && (
              <div className="fake-alert">
                Questo è un esempio di alert.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Spiegazione</div>
        <div className="panel-body">
          <p>
            <strong>{current.title}</strong>: {current.explanation}
          </p>
          <p>
            In questa simulazione vengono evidenziati:
            la riga JavaScript coinvolta, l’elemento HTML corrispondente e,
            quando serve, l’effetto visibile sulla pagina.
          </p>
        </div>
      </div>
    </div>
  );
}