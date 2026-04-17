import React, { useEffect, useMemo, useState } from "react";
import "../App.css";
import "../Selector.css";

const actionMap = {
  id: {
    title: "getElementById",
    htmlTargets: ["title"],
    explanation:
      "getElementById seleziona un solo elemento tramite il suo id. Si usa quando vogliamo individuare un elemento preciso della pagina.",
  },

  class: {
    title: "getElementsByClassName",
    htmlTargets: ["message"],
    explanation:
      "getElementsByClassName seleziona tutti gli elementi che condividono la stessa classe. Il risultato è una collezione di elementi.",
  },

  name: {
    title: "getElementsByName",
    htmlTargets: ["email1", "email2", "email3"],
    explanation:
      "getElementsByName restituisce una collezione di elementi con lo stesso attributo name. In questo esempio i tre input funzionano come un piccolo vettore.",
  },
 
  alert: {
    title: "alert",
    htmlTargets: [],
    explanation: "alert mostra una finestra di messaggio immediata.",
  },
};

export default function Step2Selectors() {
  const [activeAction, setActiveAction] = useState(null);
  const [titleText, setTitleText] = useState("Titolo iniziale");
  const [animateTitle, setAnimateTitle] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [emails, setEmails] = useState([
    "studente1@example.com",
    "studente2@example.com",
    "studente3@example.com",
  ]);

  const current = useMemo(
    () =>
      actionMap[activeAction] || {
        title: "",
        htmlTargets: [],
        explanation: "",
      },
    [activeAction]
  );

  useEffect(() => {
    const handler = (event) => {
      applyAction(event.detail?.action);
    };

    window.addEventListener("step2-highlight", handler);
    return () => window.removeEventListener("step2-highlight", handler);
  }, [emails]);

  function buildConsoleOutput(currentEmails) {
    const output = [];
    output.push(`Numero di campi email: ${currentEmails.length}`);
    output.push(`Primo elemento: ${currentEmails[0]}`);

    for (let i = 0; i < currentEmails.length; i++) {
      output.push(`Elemento ${i} = ${currentEmails[i]}`);
    }

    return output;
  }

  function applyAction(action) {
    if (!action) return;

    setActiveAction(action);
    setAnimateTitle(false);
    setConsoleOutput([]);

    if (action === "innerHTML") {
      setTitleText("Titolo modificato con innerHTML");
      setAnimateTitle(true);

      setTimeout(() => {
        setAnimateTitle(false);
      }, 900);
    } else {
      setTitleText("Titolo iniziale");
    }

    if (action === "alert") {
      alert("Questo è un esempio di alert.");
    }

    if (action === "name") {
      setConsoleOutput(buildConsoleOutput(emails));
    }
  }

  function triggerAction(action) {
    window.dispatchEvent(
      new CustomEvent("step2-highlight", {
        detail: { action },
      })
    );
  }

  function isHtmlActive(target) {
    return current.htmlTargets.includes(target);
  }

  function isButtonActive(action) {
    return activeAction === action;
  }

  return (
    <div className="page-content">
      <div className="panel">
        <div className="panel-header">Step 2: selettori e modifiche del DOM</div>
        <div className="panel-body">
          <p>
            Qui vediamo una vera pagina web: l'HTML definisce gli elementi,
            mentre JavaScript li seleziona e li modifica.
          </p>

          <ul className="function-list">
            <li>
              <i>getElementById</i>: un elemento
            </li>
            <li>
              <i>getElementsByClassName</i>: più elementi
            </li>
            <li>
              <i>getElementsByName</i>: collezione
            </li>
          </ul>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Selettori disponibili</div>
        <div className="panel-body">
          <div className="button-row">
            {["id", "class", "name", "alert"].map((action) => (
              <button
                key={action}
                className={`small-btn ${
                  isButtonActive(action) ? "small-btn-active" : ""
                }`}
                onClick={() => triggerAction(action)}
              >
                {actionMap[action].title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Cosa succede</div>
        <div className="panel-body">
          {activeAction ? (
            <div className="explanation-block">
              <strong>{current.title}</strong>
              <div style={{ marginTop: "8px" }}>{current.explanation}</div>
            </div>
          ) : (
            <p>Clicca un pulsante per vedere il funzionamento.</p>
          )}
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Pagina di esempio</div>
        <div className="panel-body">
          <div className="demo-card">
            <h2
              className={`${
                isHtmlActive("title") ? "hl-blue" : "step2-title"
              } ${animateTitle ? "title-flash" : ""}`}
            >
              {titleText}
            </h2>

            <p className={isHtmlActive("message") ? "hl-yellow block" : "block"}>
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

                      if (activeAction === "name") {
                        setConsoleOutput(buildConsoleOutput(copy));
                      }
                    }}
                  />
                );
              })}
            </div>            
          </div>
        </div>
      </div>

      {activeAction === "name" && (
  <div className="panel">
    <div className="panel-header">Console JavaScript</div>
    <div className="panel-body">
      
      <p>
        In JavaScript possiamo usare <code>console.log()</code> per stampare
        informazioni utili durante l’esecuzione del programma.
      </p>

      <div className="code-inline">
        console.log("Numero di campi email:", email.length);
      </div>

      <p>
        Qui simuliamo l’output della console mentre scorriamo la collezione
        restituita da <code>getElementsByName</code>.
      </p>

      <div className="fake-console">
        <div className="console-header">Console</div>
        <div className="console-body">
          {consoleOutput.map((line, index) => (
            <div key={index} className="console-line">
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}