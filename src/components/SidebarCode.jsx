import React, { useEffect, useMemo, useState } from "react";
import "../App.css";
import {
  step1Lines,
  step2HtmlLines,
  step2JsLines,
  step3JsLines,
  step4HtmlLines,
  step4JsLines,
  codeSnippets,
} from "./sidebarCodeData";

function StaticCodeBlock({ title, code }) {
  const lines = code.split("\n");

  return (
    <div>
      {title && <div className="code-section-title">{title}</div>}
      <div className="interactive-code-block">
        <div className="interactive-code-content">
          {lines.map((line, index) => (
            <div key={index} className="interactive-code-line static-code-line">
              <span className="interactive-code-number">{index + 1}</span>
              <span className="interactive-code-text">{line}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EditableCodeStep6() {
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8">
    <title>Pagina di Esempio</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; }
      h1 { color: #1d4ed8; }
      .messaggio { background: #f0f9ff; padding: 10px; border-radius: 8px; }
      input { padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; }
      button { background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
    </style>
  </head>
  <body>
    <h1 id="titolo">Titolo della Pagina</h1>
    <p class="messaggio">Questo è un paragrafo con classe messaggio.</p>
    <input type="text" name="email" value="studente@example.com">
    <button id="bottone">Cliccami</button>
  </body>
</html>`);

  const [jsCode, setJsCode] = useState(codeSnippets[6].js);

  const handleHtmlChange = (e) => {
    const newCode = e.target.value;
    setHtmlCode(newCode);
    window.dispatchEvent(
      new CustomEvent("step6-html-update", {
        detail: { html: newCode, js: jsCode },
      })
    );
  };

  const handleJsChange = (e) => {
    const newCode = e.target.value;
    setJsCode(newCode);
    window.dispatchEvent(
      new CustomEvent("step6-html-update", {
        detail: { html: htmlCode, js: newCode },
      })
    );
  };

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("step6-html-update", {
        detail: { html: htmlCode, js: jsCode },
      })
    );
  }, []);

  return (
    <>
      <div className="code-section-title" style={{ fontSize: "1.3em", fontWeight: "bold", marginBottom: "20px" }}>
        Step 7: Scrivi il tuo codice
      </div>

      <div className="code-explanation">
        <strong>Spiegazione:</strong> Modifica l'HTML e JavaScript qui sopra. Le modifiche si riflettono automaticamente nell'anteprima a destra.
      </div>

      <div>
        <div className="code-section-title">HTML</div>
        <textarea
          className="code-block"
          value={htmlCode}
          onChange={handleHtmlChange}
          rows={15}
          style={{
            fontFamily: "monospace",
            fontSize: "0.78rem",
            lineHeight: "1.35",
            resize: "vertical",
            minHeight: "200px",
          }}
        />
      </div>

      <div>
        <div className="code-section-title">JavaScript</div>
        <textarea
          className="code-block"
          value={jsCode}
          onChange={handleJsChange}
          rows={10}
          style={{
            fontFamily: "monospace",
            fontSize: "0.78rem",
            lineHeight: "1.35",
            resize: "vertical",
            minHeight: "150px",
          }}
        />
      </div>
    </>
  );
}

function InteractiveStep1Code() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="code-explanation" style={{ marginBottom: "20px" }}>
        <strong style={{ fontSize: "1.2em" }}>Spiegazione:</strong> {codeSnippets[1].explanation}
      </div>

      <div>
        <div className="code-section-title" style={{ fontSize: "1.3em", fontWeight: "bold", marginBottom: "10px" }}>
          HTML interattivo
        </div>
        <div className="interactive-code-block">
          <div className="interactive-code-content">
            {step1Lines.map((line, index) => (
              <button
                key={line.id}
                className={`interactive-code-line ${line.keyName && selected === line.keyName
                    ? "interactive-code-line-active"
                    : ""
                  }`}
                onClick={() => {
                  if (line.keyName) {
                    setSelected(line.keyName);
                    window.dispatchEvent(
                      new CustomEvent("step1-highlight", {
                        detail: { selected: line.keyName },
                      })
                    );
                  }
                }}
              >
                <span className="interactive-code-number">{index + 1}</span>
                <span className="interactive-code-text">{line.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function InteractiveStep2Code() {
  const [activeAction, setActiveAction] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      if (event.detail?.action) {
        setActiveAction(event.detail.action);
      }
    };

    window.addEventListener("step2-highlight", handler);
    return () => window.removeEventListener("step2-highlight", handler);
  }, []);

  const actionLines = {
    id: [3],
    class: [4],
    name: [5, 11, 12, 14, 15, 16],
    innerHTML: [8],
    alert: [19],
  };

  const htmlTargets = {
    innerHTML: [4],
    textContent: [4],
    setAttribute: [6],
    classList: [7],
    style: [5],
  };

  const trigger = (action) => {
    if (!action) return;

    setActiveAction(action);
    window.dispatchEvent(
      new CustomEvent("step2-highlight", {
        detail: { action },
      })
    );
  };

  return (
    <>
      <div className="code-explanation">
        <strong>Spiegazione:</strong> {codeSnippets[2].explanation}
      </div>

      <div>
        <div className="code-section-title">HTML</div>
        <div className="interactive-code-block">
          <div className="interactive-code-content">
            {step2HtmlLines.map((line, index) => {
              const lineNumber = index + 1;
              const isActive = htmlTargets[activeAction]?.includes(lineNumber);

              let action = null;
              if ([4].includes(lineNumber)) action = "id";
              if ([5].includes(lineNumber)) action = "class";
              if ([7, 8, 9].includes(lineNumber)) action = "name";

              return (
                <button
                  key={index}
                  className={`interactive-code-line static-code-line ${isActive ? "interactive-code-line-active" : ""
                    }`}
                  onClick={() => trigger(action)}
                >
                  <span className="interactive-code-number">{lineNumber}</span>
                  <span className="interactive-code-text">{line}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <div className="code-section-title">JavaScript: script.js</div>
        <div className="interactive-code-block">
          <div className="interactive-code-content">
            {step2JsLines.map((line, index) => {
              const lineNumber = index + 1;
              const isActive = actionLines[activeAction]?.includes(lineNumber);

              let action = null;
              if ([3].includes(lineNumber)) action = "id";
              if ([4].includes(lineNumber)) action = "class";
              if ([5, 11, 12, 14, 15, 16].includes(lineNumber)) action = "name";
              if ([8].includes(lineNumber)) action = "innerHTML";
              if ([19].includes(lineNumber)) action = "alert";

              return (
                <button
                  key={index}
                  className={`interactive-code-line ${isActive ? "interactive-code-line-active" : ""
                    }`}
                  onClick={() => trigger(action)}
                >
                  <span className="interactive-code-number">{lineNumber}</span>
                  <span className="interactive-code-text">{line}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function InteractiveStep3Code() {
  const [activeEvent, setActiveEvent] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      if (event.detail?.eventType) {
        setActiveEvent(event.detail.eventType);
      }
    };

    window.addEventListener("step3-highlight", handler);
    return () => {
      window.removeEventListener("step3-highlight", handler);
    };
  }, []);

  const eventLines = {
    focus: [8],
    input: [12],
    blur: [16],
    change: [20, 24, 28],
    click: [32],
  };

  const trigger = (eventType) => {
    if (!eventType) return;

    setActiveEvent(eventType);
    window.dispatchEvent(
      new CustomEvent("step3-highlight", {
        detail: { eventType },
      })
    );
  };

  return (
    <>
      <div>
        <div className="code-explanation">
          <strong>Spiegazione:</strong> {codeSnippets[3].explanation}
        </div>
        <div className="code-section-title">HTML</div>
        <StaticCodeBlock title="" code={codeSnippets[3].html} />
      </div>

      <div>
        <div className="code-section-title">JavaScript: script.js</div>
        <div className="interactive-code-block">
          <div className="interactive-code-content">
            {step3JsLines.map((line, index) => {
              const lineNumber = index + 1;
              const isActive = eventLines[activeEvent]?.includes(lineNumber);

              let eventType = null;
              if ([8].includes(lineNumber)) eventType = "focus";
              if ([12].includes(lineNumber)) eventType = "input";
              if ([16].includes(lineNumber)) eventType = "blur";
              if ([20, 24, 28].includes(lineNumber)) eventType = "change";
              if ([32].includes(lineNumber)) eventType = "click";

              return (
                <button
                  key={index}
                  className={`interactive-code-line ${isActive ? "interactive-code-line-active" : ""
                    }`}
                  onClick={() => trigger(eventType)}
                >
                  <span className="interactive-code-number">{lineNumber}</span>
                  <span className="interactive-code-text">{line}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function InteractiveStep4Code() {
  const [activeAction, setActiveAction] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      if (event.detail?.action) {
        setActiveAction(event.detail.action);
      }
    };

    window.addEventListener("step4-highlight", handler);
    return () => window.removeEventListener("step4-highlight", handler);
  }, []);

  const htmlTargets = {
    innerHTML: [4],
    textContent: [4],
    setAttribute: [6],
    classList: [7],
    style: [5],
  };

  const jsTargets = {
    innerHTML: [6, 7],
    textContent: [9, 10],
    setAttribute: [12],
    classList: [15],
    style: [18],
  };

  const trigger = (action) => {
    if (!action) return;

    setActiveAction(action);
    window.dispatchEvent(
      new CustomEvent("step4-highlight", {
        detail: { action },
      })
    );
  };

  return (
    <>
      <div className="code-explanation">
        <strong>Spiegazione:</strong> {codeSnippets[4].explanation}
      </div>

      <div>
        <div className="code-section-title">HTML</div>
        <div className="interactive-code-block">
          <div className="interactive-code-content">
            {step4HtmlLines.map((line, index) => {
              const lineNumber = index + 1;
              const isActive = htmlTargets[activeAction]?.includes(lineNumber);

              let action = null;
              if ([4].includes(lineNumber)) action = activeAction === "textContent" ? "textContent" : "innerHTML";
              if ([5].includes(lineNumber)) action = "style";
              if ([6].includes(lineNumber)) action = "setAttribute";
              if ([7].includes(lineNumber)) action = "classList";

              return (
                <button
                  key={index}
                  className={`interactive-code-line static-code-line ${isActive ? "interactive-code-line-active" : ""
                    }`}
                  onClick={() => action && trigger(action)}
                >
                  <span className="interactive-code-number">{lineNumber}</span>
                  <span className="interactive-code-text">{line}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <div className="code-section-title">JavaScript: script.js</div>
        <div className="interactive-code-block">
          <div className="interactive-code-content">
            {step4JsLines.map((line, index) => {
              const lineNumber = index + 1;
              const isActive = jsTargets[activeAction]?.includes(lineNumber);

              let action = null;
              if ([6, 7].includes(lineNumber)) action = "innerHTML";
              if ([9, 10].includes(lineNumber)) action = "textContent";
              if ([12].includes(lineNumber)) action = "setAttribute";
              if ([15].includes(lineNumber)) action = "classList";
              if ([18].includes(lineNumber)) action = "style";

              return (
                <button
                  key={index}
                  className={`interactive-code-line ${isActive ? "interactive-code-line-active" : ""
                    }`}
                  onClick={() => action && trigger(action)}
                >
                  <span className="interactive-code-number">{lineNumber}</span>
                  <span className="interactive-code-text">{line}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default function SidebarCode({ step }) {
  const snippetKey = useMemo(() => {
    if (step === 3) return 4;
    if (step === 4 || step === 5) return 3;
    if (step === 6) return 5;
    if (step === 7) return 6;
    return step;
  }, [step]);

  const current = useMemo(() => codeSnippets[snippetKey], [snippetKey]);

  if (step === 1) {
    return (
      <div className="panel">
        <div className="panel-body">
          <div className="code-columns">
            <InteractiveStep1Code />
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="panel">
        <div className="panel-body">
          <div className="code-columns">
            <InteractiveStep2Code />
          </div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="panel">
        <div className="panel-body">
          <div className="code-columns">
            <InteractiveStep4Code />
          </div>
        </div>
      </div>
    );
  }

  if (step === 4 || step === 5) {
    return (
      <div className="panel">
        <div className="panel-body">
          <div className="code-columns">
            <InteractiveStep3Code />
          </div>
        </div>
      </div>
    );
  }

  if (step === 7) {
    return (
      <div className="panel">
        <div className="panel-body">
          <div className="code-columns">
            <EditableCodeStep6 />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="panel-body">
        <div className="code-columns">
          <div className="code-section-title" style={{ fontSize: "1.3em", fontWeight: "bold", marginBottom: "20px" }}>
            {step === 6 ? "Step 6: Esercizi" : "Step"}
          </div>

          <div className="code-explanation">
            <strong>Spiegazione:</strong> {current.explanation}
          </div>

          <StaticCodeBlock title="HTML" code={current.html} />
          <StaticCodeBlock
            title={step === 6 ? "Traccia" : "JavaScript: script.js"}
            code={current.js}
          />
        </div>
      </div>
    </div>
  );
}