import React, { useMemo, useState } from "react";
import "./App.css";

const stepMeta = [
  { title: "Il DOM" },
  { title: "ID, classi e selezione" },
  { title: "Form ed eventi" },
  { title: "Esercizi" },
];

const codeSnippets = {
  step1: {
    html: `<!DOCTYPE html>
<html>
  <body>
    <div id="pagina">
      <h1>Titolo</h1>

      <div>
        <p>Primo paragrafo</p>
        <button>Pulsante</button>
      </div>

      <div>
        <ul>
          <li>Elemento 1</li>
          <li>Elemento 2</li>
        </ul>
      </div>
    </div>
  </body>
</html>`,
    js: `// In questo step osserviamo la struttura HTML.
// Il browser la trasforma in un albero DOM.`,
    explanation:
      "In questo primo passaggio ci interessa soprattutto capire che la pagina HTML diventa una struttura ad albero di nodi.",
  },

  step2: {
    html: `<!DOCTYPE html>
<html>
  <body>
    <h1 id="titolo">Titolo iniziale</h1>
    <p class="messaggio">Messaggio con classe</p>

    <input name="email" value="studente1@example.com" />
    <input name="email" value="studente2@example.com" />
    <input name="email" value="studente3@example.com" />

    <script src="script.js"></script>
  </body>
</html>`,
    js: `const titolo = document.getElementById("titolo");
const messaggi = document.getElementsByClassName("messaggio");
const campi = document.getElementsByName("email");

// elemento singolo
titolo.innerHTML = "Titolo modificato con JavaScript";

// collezione con stesso name
console.log(campi.length);
console.log(campi[0].value);

for (let i = 0; i < campi.length; i++) {
  console.log(campi[i].value);
}

alert("Il DOM è stato aggiornato!");`,
    explanation:
      "Qui confrontiamo selezione di un elemento singolo e selezione di una collezione. getElementsByName restituisce più elementi, quindi si può ragionare in modo simile a un vettore: length, indice, ciclo.",
  },

  step3: {
    html: `<!DOCTYPE html>
<html>
  <body>
    <input id="nome" placeholder="Scrivi il tuo nome" />
    <button id="saluta">Saluta</button>
    <p id="output"></p>

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

  step4: {
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
};

function Panel({ title, children }) {
  return (
    <div className="panel">
      <div className="panel-header">{title}</div>
      <div className="panel-body">{children}</div>
    </div>
  );
}

function CodeBlock({ code }) {
  const lines = code.split("\n");

  return (
    <div className="code-block">
      {lines.map((line, index) => (
        <div key={index} className="code-line">
          <span className="code-number">{index + 1}</span>
          <span className="code-text">{line}</span>
        </div>
      ))}
    </div>
  );
}

function Sidebar({ step }) {
  const current = useMemo(() => {
    if (step === 0) return codeSnippets.step1;
    if (step === 1) return codeSnippets.step2;
    if (step === 2) return codeSnippets.step3;
    return codeSnippets.step4;
  }, [step]);

  return (
    <Panel title={step === 3 ? "Traccia ed esempi" : "Codice spiegato"}>
      <div className="code-columns">
        <div>
          <div className="code-section-title">HTML</div>
          <CodeBlock code={current.html} />
        </div>

        <div>
          <div className="code-section-title">
            {step === 3 ? "Traccia" : "JavaScript"}
          </div>
          <CodeBlock code={current.js} />
        </div>

        <div className="code-explanation">
          <strong>Spiegazione:</strong> {current.explanation}
        </div>
      </div>
    </Panel>
  );
}

function DomTreeDemo() {
  return (
    <div className="two-columns">
      <CodeBlock code={codeSnippets.step1.html} />

      <div className="right-column">
        <Panel title="Rappresentazione della pagina">
          <div className="demo-page">
            <div className="demo-box demo-box-blue">
              <div className="demo-box demo-box-violet">
                <h1>Titolo della pagina</h1>
                <p>Questo è un paragrafo dentro il primo div.</p>
              </div>

              <div className="demo-box demo-box-green">
                <button className="demo-button">Pulsante</button>
                <ul>
                  <li>Elemento lista 1</li>
                  <li>Elemento lista 2</li>
                </ul>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Idea chiave">
          <p>Il DOM rappresenta la pagina HTML come un albero di nodi.</p>
          <p>Ogni tag HTML diventa un elemento che può contenere altri elementi.</p>
          <p>
            JavaScript entra nello script e usa <code>document</code> per leggere o
            modificare la pagina.
          </p>
        </Panel>
      </div>
    </div>
  );
}

function SelectorsDemo() {
  const [highlight, setHighlight] = useState("id");
  const [titleText, setTitleText] = useState("Titolo iniziale");
  const [emails, setEmails] = useState([
    "studente1@example.com",
    "studente2@example.com",
    "studente3@example.com",
  ]);

  return (
    <div className="page-content">
      <Panel title="Pagina di esempio">
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

          <button className="small-btn" onClick={() => setHighlight("class")}>
            getElementsByClassName
          </button>

          <button className="small-btn" onClick={() => setHighlight("name")}>
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
          <h2 className={highlight === "id" || highlight === "innerHTML" ? "hl-blue" : ""}>
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
      </Panel>

      <Panel title="Spiegazione">
        {highlight === "id" && (
          <p>
            <strong>getElementById</strong> seleziona un solo elemento tramite il suo id.
          </p>
        )}

        {highlight === "class" && (
          <p>
            <strong>getElementsByClassName</strong> seleziona tutti gli elementi con
            una certa classe.
          </p>
        )}

        {highlight === "name" && (
          <p>
            <strong>getElementsByName</strong> seleziona tutti gli elementi che
            condividono lo stesso attributo <code>name</code>. Il risultato è una
            collezione: possiamo usare <code>length</code>, accedere con un indice
            come <code>[0]</code> e scorrere gli elementi con un ciclo.
          </p>
        )}

        {highlight === "innerHTML" && (
          <p>
            <strong>innerHTML</strong> cambia il contenuto interno di un elemento.
          </p>
        )}

        {highlight === "alert" && (
          <p>
            <strong>alert</strong> mostra una finestra di messaggio immediata.
          </p>
        )}
      </Panel>
    </div>
  );
}

function EventsDemo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    "Compila il form per vedere gli eventi in azione."
  );

  return (
    <div className="page-content">
      <Panel title="Form di esempio">
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
      </Panel>

      <Panel title="Output evento">
        <p>{message}</p>
      </Panel>
    </div>
  );
}

function ExercisesStep() {
  const exercises = [
    "Disegna la struttura ad albero della pagina mostrata nello step 1.",
    "Assegna un id a un titolo e scrivi l'istruzione con getElementById per modificarlo.",
    "Crea due paragrafi con la stessa classe e spiega come selezionarli.",
    "Crea tre input con lo stesso name e spiega perché il risultato si comporta come una collezione.",
    "Crea un input e un bottone che mostrino un alert con il nome digitato.",
    "Usa l'evento input per aggiornare in tempo reale un paragrafo nella pagina.",
  ];

  return (
    <div className="page-content">
      <Panel title="Esercizi per la classe">
        <div className="exercise-list">
          {exercises.map((exercise, index) => (
            <div key={index} className="exercise-item">
              <span className="exercise-number">{index + 1}</span>
              <span>{exercise}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const progress = ((step + 1) / stepMeta.length) * 100;

  return (
    <div className="app-shell">
      <div className="top-panel">
        <div>
          <h1>JavaScript e DOM</h1>
          <p>
            Un percorso guidato in 4 step per mostrare come JavaScript lavora dentro
            una pagina HTML: DOM, selezione degli elementi, script ed eventi.
          </p>
        </div>
        <div className="step-badge">
          Step {step + 1} di {stepMeta.length}
        </div>
      </div>

      <div className="progress-wrap">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="step-grid">
        {stepMeta.map((item, index) => (
          <button
            key={item.title}
            className={`step-card ${index === step ? "active" : ""}`}
            onClick={() => setStep(index)}
          >
            <div className="step-title">{item.title}</div>
            <div className="step-subtitle">Passaggio {index + 1}</div>
          </button>
        ))}
      </div>

      <div className={step === 0 ? "main-layout full" : "main-layout"}>
        {step !== 0 && <Sidebar step={step} />}

        <div>
          {step === 0 && <DomTreeDemo />}
          {step === 1 && <SelectorsDemo />}
          {step === 2 && <EventsDemo />}
          {step === 3 && <ExercisesStep />}
        </div>
      </div>

      <div className="nav-row">
        <button
          className="secondary-btn"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Indietro
        </button>

        <button
          className="primary-btn"
          onClick={() => setStep((s) => Math.min(stepMeta.length - 1, s + 1))}
          disabled={step === stepMeta.length - 1}
        >
          Avanti
        </button>
      </div>
    </div>
  );
}