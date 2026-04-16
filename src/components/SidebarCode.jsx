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

const codeSnippets = {
  1: {
    explanation:
      "Clicca una riga del codice: nello step 1 si evidenzia l'elemento corrispondente nella pagina e nella lettura del DOM.",
  },

  2: {
    html: `<h1 id="titolo">Titolo iniziale</h1>
<p class="messaggio">Messaggio con classe</p>

<input name="email" value="studente1@example.com" />
<input name="email" value="studente2@example.com" />
<input name="email" value="studente3@example.com" />`,
    js: `const titolo = document.getElementById("titolo");
const messaggi = document.getElementsByClassName("messaggio");
const campi = document.getElementsByName("email");

titolo.innerHTML = "Titolo modificato con JavaScript";

console.log(campi.length);
console.log(campi[0].value);

for (let i = 0; i < campi.length; i++) {
  console.log(campi[i].value);
}

alert("Il DOM è stato aggiornato!");`,
    explanation:
      "Qui confrontiamo selezione di un elemento singolo e selezione di una collezione. getElementsByName restituisce più elementi, quindi si può ragionare in modo simile a un vettore.",
  },

  3: {
    html: `<input id="nome" placeholder="Scrivi il tuo nome" />
<button id="saluta">Saluta</button>
<p id="output"></p>`,
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
};

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

function InteractiveStep1Code() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div>
        <div className="code-section-title">HTML interattivo</div>
        <div className="interactive-code-block">
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

      <div className="code-explanation">
        <strong>Spiegazione:</strong> {codeSnippets[1].explanation}
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

  return (
    <div className="panel">
      <div className="panel-header">
        {step === 4 ? "Traccia ed esempi" : "Codice spiegato"}
      </div>

      <div className="panel-body">
        <div className="code-columns">
          <div>
            <div className="code-section-title">HTML</div>
            <CodeBlock code={current.html} />
          </div>

          <div>
            <div className="code-section-title">
              {step === 4 ? "Traccia" : "JavaScript"}
            </div>
            <CodeBlock code={current.js} />
          </div>

          <div className="code-explanation">
            <strong>Spiegazione:</strong> {current.explanation}
          </div>
        </div>
      </div>
    </div>
  );
}