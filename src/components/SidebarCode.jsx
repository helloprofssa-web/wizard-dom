import React, { useMemo, useState } from "react";
import "../App.css";

const step1Lines = [
  { id: "l1", text: "<!DOCTYPE html>", keyName: null },
  { id: "l2", text: "<html>", keyName: "html" },
  { id: "l3", text: "  <body>", keyName: "body" },
  { id: "l4", text: '    <div id="pagina">', keyName: "pagina" },
  { id: "l5", text: '      <div class="sezione">', keyName: "sezione1" },
  { id: "l6", text: "        <h1>Titolo della pagina</h1>", keyName: "h1" },
  {
    id: "l7",
    text: "        <p>Questo è un paragrafo dentro il primo div.</p>",
    keyName: "p",
  },
  { id: "l8", text: "      </div>", keyName: "sezione1" },
  { id: "l9", text: '      <div class="sezione">', keyName: "sezione2" },
  { id: "l10", text: "        <button>Pulsante</button>", keyName: "button" },
  { id: "l11", text: "        <ul>", keyName: "ul" },
  { id: "l12", text: "          <li>Elemento lista 1</li>", keyName: "li1" },
  { id: "l13", text: "          <li>Elemento lista 2</li>", keyName: "li2" },
  { id: "l14", text: "        </ul>", keyName: "ul" },
  { id: "l15", text: "      </div>", keyName: "sezione2" },
  { id: "l16", text: "    </div>", keyName: "pagina" },
  { id: "l17", text: "  </body>", keyName: "body" },
  { id: "l18", text: "</html>", keyName: "html" },
];

const step2HtmlLines = [
  "<!DOCTYPE html>",
  '<html lang="it">',
  "  <body>",
  '    <h1 id="titolo">Titolo iniziale</h1>',
  '    <p class="messaggio">Messaggio con classe</p>',
  "",
  '    <input type="text" name="email" value="studente1@example.com" />',
  '    <input type="text" name="email" value="studente2@example.com" />',
  '    <input type="text" name="email" value="studente3@example.com" />',
  "",
  '    <script src="script.js"></script>',
  "  </body>",
  "</html>",
];

const step2JsLines = [
  "// Selezione degli elementi",
  "",
  'const titolo = document.getElementById("titolo");',
  'const messaggi = document.getElementsByClassName("messaggio");',
  'const email = document.getElementsByName("email");',
  "",
  "// Modifica del contenuto",
  'titolo.innerHTML = "Titolo modificato con innerHTML";',
  "",
  "// Uso della collezione restituita da getElementsByName",
  'console.log("Numero di campi email:", email.length);',
  'console.log("Primo elemento:", email[0].value);',
  "",
  "for (let i = 0; i < email.length; i++) {",
  '  console.log("Elemento", i, "=", email[i].value);',
  "}",
  "",
  "// Finestra di messaggio",
  'alert("Questo è un esempio di alert.");',
];

const codeSnippets = {
  1: {
    explanation:
      "Clicca una riga del codice: nello step 1 si evidenzia l'elemento corrispondente nella pagina e nella lettura del DOM.",
  },

  2: {
    html: `<!DOCTYPE html>
<html lang="it">
  <body>
    <h1 id="titolo">Titolo iniziale</h1>
    <p class="messaggio">Messaggio con classe</p>

    <input type="text" name="email" value="studente1@example.com"/>
    <input type="text" name="email" value="studente2@example.com"/>
    <input type="text" name="email" value="studente3@example.com"/>

    <script src="script.js"></script>
  </body>
</html>`,

    js: `// Selezione degli elementi

const titolo = document.getElementById("titolo");
const messaggi = document.getElementsByClassName("messaggio");
const email = document.getElementsByName("email");

// Modifica del contenuto

titolo.innerHTML = "Titolo modificato con innerHTML";

// Uso della collezione restituita da getElementsByName

console.log("Numero di campi email:", email.length);
console.log("Primo elemento:", email[0].value);

// Scorrimento della collezione

for (let i = 0; i < email.length; i++) {
  console.log("Elemento", i, "=", email[i].value);
}

// Finestra di messaggio

alert("Questo è un esempio di alert.");`,

    explanation:
      "Qui vediamo una vera pagina web: l'HTML definisce gli elementi, mentre JavaScript li seleziona e li modifica. getElementById restituisce un solo elemento; getElementsByClassName e getElementsByName restituiscono una collezione di elementi.",
  },

  3: {
    html: `<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <title>Eventi sui campi input</title>
  </head>
  <body>
    <input id="nome" placeholder="Scrivi il tuo nome" />
    <button id="saluta">Saluta</button>
    <p id="output"></p>

    <!-- Includiamo all'interno della pagina uno script JavaScript -->
    <script src="script.js"></script>
  </body>
</html>`,

    js: `const inputNome = document.getElementById("nome");
const bottone = document.getElementById("saluta");
const output = document.getElementById("output");

inputNome.addEventListener("focus", function () {
  output.innerHTML = "Sei entrato nel campo";
});

inputNome.addEventListener("input", function () {
  output.innerHTML = "Stai scrivendo: " + inputNome.value;
});

inputNome.addEventListener("blur", function () {
  output.innerHTML = "Sei uscito dal campo";
});

bottone.addEventListener("click", function () {
  alert("Ciao " + inputNome.value);
});`,

    explanation:
      "In questo step HTML definisce gli elementi della pagina, mentre JavaScript collega eventi e comportamenti.",
  },

  4: {
    html: `<!-- Nessun nuovo HTML: qui trovi la traccia degli esercizi -->`,

    js: `1. Disegna l'albero DOM della pagina dello step 1.
2. Aggiungi un id a un paragrafo e modificalo con getElementById.
3. Crea due elementi con la stessa classe e selezionali.
4. Crea tre input con lo stesso name e leggili con indice e length.
5. Crea un input e un bottone che mostrino un alert.
6. Usa l'evento input per aggiornare un testo nella pagina.`,

    explanation:
      "Gli esercizi riprendono i concetti visti nei tre step precedenti e li trasformano in attività operative.",
  },

  5: {
    html: `<!-- Qui puoi scrivere il tuo HTML personalizzato nell'editor -->`,

    js: `// Esempi di selezione elementi nel tuo HTML:
//
// getElementById("id-elemento")
// getElementsByClassName("nome-classe")
// getElementsByName("nome-attributo")
//
// Prova a scrivere il tuo JavaScript qui!`,

    explanation:
      "In questo step puoi scrivere il tuo codice HTML e JavaScript personalizzato. Usa l'editor per creare pagine web interattive e sperimenta con il DOM!",
  },
};

function StaticCodeBlock({ title, code }) {
  const lines = code.split("\n");

  return (
    <div>
      <div className="code-section-title">{title}</div>
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

function EditableCodeStep5() {
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
      button:hover { background: #2563eb; }
    </style>
  </head>
  <body>
    <h1 id="titolo">Titolo della Pagina</h1>
    <p class="messaggio">Questo è un paragrafo con classe messaggio.</p>
    <input type="text" name="email" value="studente@example.com">
    <button id="bottone">Cliccami</button>
  </body>
</html>`);

  const [jsCode, setJsCode] = useState(`// Esempi di selezione elementi:
//
// getElementById("id-elemento")
// getElementsByClassName("nome-classe")
// getElementsByName("nome-attributo")
//
// Prova a scrivere il tuo JavaScript qui!`);

  const handleHtmlChange = (e) => {
    const newCode = e.target.value;
    setHtmlCode(newCode);
    window.dispatchEvent(new CustomEvent("step5-html-update", { detail: { html: newCode, js: jsCode } }));
  };

  const handleJsChange = (e) => {
    const newCode = e.target.value;
    setJsCode(newCode);
    window.dispatchEvent(new CustomEvent("step5-html-update", { detail: { html: htmlCode, js: newCode } }));
  };

  // Inizializza l'evento al mount
  React.useEffect(() => {
    window.dispatchEvent(new CustomEvent("step5-html-update", { detail: { html: htmlCode, js: jsCode } }));
  }, []);

  return (
    <>
      <div className="code-section-title" style={{ fontSize: "1.3em", fontWeight: "bold", marginBottom: "20px" }}>Step 5: Scrivi il tuo codice</div>

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
            minHeight: "200px"
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
            minHeight: "150px"
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
        <div className="code-section-title" style={{ fontSize: "1.3em", fontWeight: "bold", marginBottom: "10px" }}>HTML interattivo</div>
        <div className="interactive-code-block">
          <div className="interactive-code-content">
            {step1Lines.map((line, index) => (
              <button
                key={line.id}
                className={`interactive-code-line ${
                  line.keyName && selected === line.keyName
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

  const actionLines = {
    id: [3],
    class: [4],
    name: [5, 11, 12, 14, 15, 16],
    innerHTML: [8],
    alert: [19],
  };

  const htmlTargets = {
    id: [4],
    class: [5],
    name: [7, 8, 9],
    innerHTML: [4],
    alert: [],
  };

  const trigger = (action) => {
    setActiveAction(action);
    try {
      window.dispatchEvent(
        new CustomEvent("step2-highlight", {
          detail: { action },
        })
      );
    } catch (e) {
      console.log("Event dispatch failed:", e);
    }
  };

  return (
    <>
      <div className="code-section-title" style={{ fontSize: "1.3em", fontWeight: "bold", marginBottom: "20px" }}>Step 2: Selettori CSS</div>

      <div className="code-explanation">
        <strong>Spiegazione:</strong> {codeSnippets[2].explanation}
      </div>

      <div>
        <div className="code-section-title">HTML</div>
        <div className="interactive-code-block">
          <div className="interactive-code-content">
            {step2HtmlLines.map((line, index) => {
              const lineNumber = index + 1;
              const isActive = activeAction && htmlTargets[activeAction]?.includes(lineNumber);

              return (
                <div
                  key={index}
                  className={`interactive-code-line static-code-line ${
                    isActive ? "interactive-code-line-active" : ""
                  }`}
                >
                  <span className="interactive-code-number">{lineNumber}</span>
                  <span className="interactive-code-text">{line}</span>
                </div>
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
              const isActive = activeAction && actionLines[activeAction]?.includes(lineNumber);

              let action = null;
              if (lineNumber === 3) action = "id";
              else if (lineNumber === 4) action = "class";
              else if ([5, 11, 12, 14, 15, 16].includes(lineNumber)) action = "name";
              else if (lineNumber === 8) action = "innerHTML";
              else if (lineNumber === 19) action = "alert";

              return action ? (
                <button
                  key={index}
                  className={`interactive-code-line ${
                    isActive ? "interactive-code-line-active" : ""
                  }`}
                  onClick={() => trigger(action)}
                >
                  <span className="interactive-code-number">{lineNumber}</span>
                  <span className="interactive-code-text">{line}</span>
                </button>
              ) : (
                <div
                  key={index}
                  className={`interactive-code-line static-code-line ${
                    isActive ? "interactive-code-line-active" : ""
                  }`}
                >
                  <span className="interactive-code-number">{lineNumber}</span>
                  <span className="interactive-code-text">{line}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default function SidebarCode({ step }) {
  const current = useMemo(() => codeSnippets[step], [step]);

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

  if (step === 5) {
    return (
      <div className="panel">
        <div className="panel-body">
          <div className="code-columns">
            <EditableCodeStep5 />
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
            {step === 3 ? "Step 3: Eventi sui campi input" : step === 4 ? "Step 4: Esercizi" : "Step"}
          </div>

          <div className="code-explanation">
            <strong>Spiegazione:</strong> {current.explanation}
          </div>

          <StaticCodeBlock title="HTML" code={current.html} />

          <StaticCodeBlock
            title={step === 4 ? "Traccia" : "JavaScript: script.js"}
            code={current.js}
          />
        </div>
      </div>
    </div>
  );
}