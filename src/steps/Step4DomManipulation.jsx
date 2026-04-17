import React, { useEffect, useMemo, useState } from "react";
import "../App.css";
import "../Selector.css";

const actionMap = {
  innerHTML: {
    title: "innerHTML",
    targets: ["title", "explainBox"],
    explanation: (
      <>
        <p>
          <strong>innerHTML</strong> permette di leggere o modificare il contenuto
          interno di un elemento <strong>interpretando anche eventuali tag HTML</strong>.
        </p>

        <p>
          Se dentro il contenuto compare, per esempio,
          <code> &lt;strong&gt;Primo&lt;/strong&gt; </code>,
          il browser lo interpreta come HTML e mostra la parola <strong>Primo</strong> in grassetto.
        </p>

        <div className="code-inline">
          Contenuto interpretato come HTML
        </div>

        <p>
          È utile quando vuoi inserire contenuti che contengono anche tag HTML,
          ma bisogna usarlo con attenzione perché sostituisce tutto il contenuto interno.
        </p>
      </>
    ),
  },

  textContent: {
    title: "textContent",
    targets: ["title", "explainBox"],
    explanation: (
      <>
        <p>
          <strong>textContent</strong> permette di leggere o modificare il contenuto
          testuale di un elemento.
        </p>

        <p>
          A differenza di <strong>innerHTML</strong>, i tag non vengono interpretati:
          vengono mostrati come semplice testo.
        </p>

        <div className="code-inline">
          Contenuto mostrato come testo semplice
        </div>

        <p>
          Quindi una sequenza come
          <code> &lt;strong&gt;Primo&lt;/strong&gt; </code>
          appare esattamente così, senza grassetto.
        </p>
      </>
    ),
  },

  setAttribute: {
    title: "setAttribute",
    targets: ["input"],
    explanation: (
      <>
        <p>
          <strong>setAttribute</strong> permette di aggiungere o modificare un attributo HTML.
        </p>

        <p>
          Per esempio possiamo cambiare il <code>placeholder</code> di un campo input
          oppure modificare attributi come <code>src</code>, <code>href</code> o <code>title</code>.
        </p>

        <div className="code-inline">
          Placeholder modificato dinamicamente
        </div>
      </>
    ),
  },

  classList: {
    title: "classList.add",
    targets: ["box"],
    explanation: (
      <>
        <p>
          <strong>classList.add</strong> aggiunge una classe CSS a un elemento.
        </p>

        <p>
          In questo modo possiamo cambiare l’aspetto dell’elemento senza modificare
          direttamente il contenuto.
        </p>

        <div className="code-inline">
          Classe CSS aggiunta al box
        </div>
      </>
    ),
  },

  style: {
    title: "style",
    targets: ["paragraph"],
    explanation: (
      <>
        <p>
          <strong>style</strong> permette di modificare direttamente una proprietà CSS
          dell’elemento.
        </p>

        <p>
          È utile per effetti veloci, ad esempio cambiare colore, sfondo o bordo.
        </p>

        <div className="code-inline">
          Colore del paragrafo modificato
        </div>
      </>
    ),
  },
};

export default function Step4DomManipulation() {
  const [activeAction, setActiveAction] = useState(null);
  const [titleText, setTitleText] = useState("Titolo iniziale");
  const [inputPlaceholder, setInputPlaceholder] = useState("Scrivi qualcosa");
  const [boxHighlighted, setBoxHighlighted] = useState(false);
  const [paragraphStyled, setParagraphStyled] = useState(false);
  const [modeInfo, setModeInfo] = useState("");

  const current = useMemo(
    () =>
      actionMap[activeAction] || {
        title: "",
        targets: [],
        explanation: "",
      },
    [activeAction]
  );

  useEffect(() => {
    const handler = (event) => {
      applyAction(event.detail?.action);
    };

    window.addEventListener("step4-highlight", handler);
    return () => window.removeEventListener("step4-highlight", handler);
  }, []);

  function applyAction(action) {
    if (!action) return;

    setActiveAction(action);
    setTitleText("Titolo iniziale");
    setInputPlaceholder("Scrivi qualcosa");
    setBoxHighlighted(false);
    setParagraphStyled(false);
    setModeInfo("");

    if (action === "innerHTML") {
      setTitleText("Primo Titolo della nostra pagina");
      setModeInfo(
        'Con innerHTML il browser interpreterebbe "<strong>Primo</strong>" come HTML, quindi "Primo" apparirebbe in grassetto.'
      );
    }

    if (action === "textContent") {
      setTitleText("<strong>Primo</strong> Titolo della nostra pagina");
      setModeInfo(
        'Con textContent i tag non vengono interpretati: "<strong>Primo</strong>" viene mostrato come semplice testo.'
      );
    }

    if (action === "setAttribute") {
      setInputPlaceholder("Nuovo placeholder!");
    }

    if (action === "classList") {
      setBoxHighlighted(true);
    }

    if (action === "style") {
      setParagraphStyled(true);
    }
  }

  function triggerAction(action) {
    window.dispatchEvent(
      new CustomEvent("step4-highlight", {
        detail: { action },
      })
    );
  }

  function isTargetActive(target) {
    return current.targets.includes(target);
  }

  function isButtonActive(action) {
    return activeAction === action;
  }

  return (
    <div className="page-content">
      <div className="panel">
        <div className="panel-header">Step 4: modificare il DOM</div>
        <div className="panel-body">
          <p>
            Dopo aver selezionato un elemento, JavaScript può modificarne
            contenuto, attributi, classi CSS e stile.
          </p>

          <ul className="function-list">
            <li><i>innerHTML</i>: interpreta eventuale HTML</li>
            <li><i>textContent</i>: mostra solo testo</li>
            <li><i>setAttribute</i>: modifica un attributo</li>
            <li><i>classList.add</i>: aggiunge una classe CSS</li>
            <li><i>style</i>: modifica una proprietà CSS</li>
          </ul>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Metodi disponibili</div>
        <div className="panel-body">
          <div className="button-row">
            {["innerHTML", "textContent", "setAttribute", "classList", "style"].map(
              (action) => (
                <button
                  key={action}
                  className={`small-btn ${isButtonActive(action) ? "small-btn-active" : ""}`}
                  onClick={() => triggerAction(action)}
                >
                  {actionMap[action].title}
                </button>
              )
            )}
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
            <p>Clicca un pulsante per vedere una modifica del DOM.</p>
          )}
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Anteprima della pagina</div>
        <div className="panel-body">
          <div
            className={`demo-card ${
              boxHighlighted || isTargetActive("box")
                ? "dom-manip-box-active"
                : ""
            }`}
          >
            <h2 className={isTargetActive("title") ? "hl-blue" : "step2-title"}>
              {titleText}
            </h2>

            {(activeAction === "innerHTML" || activeAction === "textContent") && (
              <div
                className={`vector-box ${
                  isTargetActive("explainBox") ? "dom-manip-box-active" : ""
                }`}
              >
                <p><strong>Differenza visiva</strong></p>
                <p>{modeInfo}</p>
              </div>
            )}

            <p
              className={
                paragraphStyled || isTargetActive("paragraph")
                  ? "dom-style-active"
                  : ""
              }
            >
              Questo paragrafo può essere modificato con style.
            </p>

            <input
              className={isTargetActive("input") ? "hl-green input" : "input"}
              type="text"
              placeholder={inputPlaceholder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}