export const step1Lines = [
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

export const step2HtmlLines = [
  "<!DOCTYPE html>",
  '<html lang="it">',
  "  <body>",
  '    <h1 id="titolo"><span>Primo</span> Titolo Della nostra pagina</h1>',
  '    <p class="messaggio">Messaggio con classe</p>',
  "",
  '    <input type="email" name="email" value="studente1@example.com" />',
  '    <input type="email" name="email" value="studente2@example.com" />',
  '    <input type="email" name="email" value="studente3@example.com" />',
  "",
  '    <script src="script.js"></script>',
  "  </body>",
  "</html>",
];

export const step2JsLines = [
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

export const step3JsLines = [
  'const inputNome = document.getElementById("nome");',
  'const bottone = document.getElementById("saluta");',
  'const output = document.getElementById("output");',
  'const radioMaschio = document.getElementById("maschio");',
  'const checkboxNewsletter = document.getElementById("newsletter");',
  'const selectPaese = document.getElementById("paese");',
  "",
  'inputNome.addEventListener("focus", function () {',
  '  output.innerHTML = "Sei entrato nel campo";',
  "});",
  "",
  'inputNome.addEventListener("input", function () {',
  '  output.innerHTML = "Stai scrivendo: " + inputNome.value;',
  "});",
  "",
  'inputNome.addEventListener("blur", function () {',
  '  output.innerHTML = "Sei uscito dal campo";',
  "});",
  "",
  'radioMaschio.addEventListener("change", function () {',
  '  output.innerHTML = "Hai selezionato: " + radioMaschio.value;',
  "});",
  "",
  'checkboxNewsletter.addEventListener("change", function () {',
  '  output.innerHTML = "Checkbox " + ',
  '     (checkboxNewsletter.checked ? "selezionata" : "deselezionata");',
  "});",
  "",
  'selectPaese.addEventListener("change", function () {',
  '  output.innerHTML = "Paese selezionato: " + selectPaese.value;',
  "});",
  "",
  'bottone.addEventListener("click", function () {',
  '  alert("Ciao " + inputNome.value);',
  "});",
];

export const step4HtmlLines = [
  "<!DOCTYPE html>",
  '<html lang="it">',
  "  <body>",
  '    <h1 id="titolo">',
  '      <strong>Primo</strong> Titolo Della nostra pagina',
  '    </h1>',
  '    <p id="testo">Questo paragrafo può essere modificato con style.</p>',
  '    <input id="campo" type="text" placeholder="Scrivi qualcosa" />',
  '    <div id="box" class="demo-card">Box di esempio</div>',
  '    <script src="script.js"></script>',
  "  </body>",
  "</html>",
];

export const step4JsLines = [
  'const titolo = document.getElementById("titolo");',
  'const testo = document.getElementById("testo");',
  'const campo = document.getElementById("campo");',
  'const box = document.getElementById("box");',
  "",
  "// innerHTML interpreta eventuale HTML",
  'titolo.innerHTML contiene anche tag HTML interpretati dal browser;',
  "",
  "// textContent mostra solo testo",
  'titolo.textContent contiene solo testo semplice;',
  "",
  "// setAttribute modifica un attributo",
  'campo.setAttribute("placeholder", "Nuovo placeholder!");',
  "",
  "// classList.add aggiunge una classe CSS",
  'box.classList.add("evidenziato");',
  "",
  "// style modifica una proprietà CSS",
  'testo.style.color = "crimson";',
];

export const codeSnippets = {
  1: {
    explanation:
      "Clicca una riga del codice: nello step 1 si evidenzia l'elemento corrispondente nella pagina e nella lettura del DOM.",
  },

  2: {
    html: `<!DOCTYPE html>
<html lang="it">
  <body>
    <h1 id="titolo">
      <strong>Primo</strong> Titolo Della nostra pagina
    </h1>
    <p class="messaggio">Messaggio con classe</p>

    <input type="email" name="email" value="studente1@example.com"/>
    <input type="email" name="email" value="studente2@example.com"/>
    <input type="email" name="email" value="studente3@example.com"/>

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
      "In questo step esploriamo i principali metodi di selezione degli elementi. Vediamo anche come modificare il contenuto con innerHTML e come mostrare un messaggio con alert.",
  },

  3: {
    html: `<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <title>Eventi sui campi input</title>
  </head>
  <body>
    <input id="nome" type="text" placeholder="Scrivi il tuo nome"/>
    <br><br>
    <input type="radio" name="genere" value="maschio" id="maschio"/> 
    <label for="maschio">Maschio</label>
    <input type="radio" name="genere" value="femmina" id="femmina"/> 
    <label for="femmina">Femmina</label>
    <br><br>
    <input type="checkbox" id="newsletter" /> 
    <label for="newsletter">Iscriviti alla newsletter</label>
    <br><br>
    <select id="paese">
      <option value="">Seleziona paese</option>
      <option value="it">Italia</option>
      <option value="fr">Francia</option>
    </select>
    <br><br>
    <button id="saluta">Saluta</button>
    <p id="output"></p>

    <script src="script.js"></script>
  </body>
</html>`,
    js: step3JsLines.join("\n"),
    explanation:
      "In questo step esploriamo gli eventi per diversi tipi di elementi input: text, radio, checkbox e select.",
  },

  4: {
    explanation:
       "In questo step vediamo come JavaScript può modificare contenuto, attributi, classi CSS e stile degli elementi. Usiamo innerHTML, textContent, setAttribute, classList.add e style.",
  },

  5: {
    html: `<!DOCTYPE html>
<html lang="it">
  <body>
    <h1 id="titolo">Esercizi DOM</h1>
    <p id="descrizione">Questo paragrafo può essere modificato con JavaScript.</p>

    <p class="nota">Prima nota</p>
    <p class="nota">Seconda nota</p>

    <input type="text" name="studente" value="Anna" />
    <input type="text" name="studente" value="Luca" />
    <input type="text" name="studente" value="Marta" />

    <hr />

    <input id="nome" type="text" placeholder="Scrivi il tuo nome" />
    <button id="saluta">Mostra alert</button>

    <p id="output">Qui comparirà il testo digitato.</p>

    <script src="script.js"></script>
  </body>
</html>`,
    js: `// 1. Modifica un elemento con getElementById
const descrizione = document.getElementById("descrizione");
descrizione.textContent = "Paragrafo modificato con getElementById.";

// 2. Seleziona due paragrafi con la stessa classe
const note = document.getElementsByClassName("nota");
console.log("Numero di paragrafi con classe nota:", note.length);

// 3. Leggi una collezione di input con lo stesso name
const studenti = document.getElementsByName("studente");
for (let i = 0; i < studenti.length; i++) {
  console.log("Studente", i + 1, "=", studenti[i].value);
}

// 4. Alert con input e bottone
const inputNome = document.getElementById("nome");
const bottone = document.getElementById("saluta");
const output = document.getElementById("output");

bottone.addEventListener("click", function () {
  alert("Ciao " + inputNome.value);
});

// 5. Aggiornamento in tempo reale con evento input
inputNome.addEventListener("input", function () {
  output.textContent = "Stai scrivendo: " + inputNome.value;
});`,
    explanation:
      "Questo codice-base raccoglie gli stessi concetti degli esercizi: selezione con id, class e name, alert su click ed evento input in tempo reale.",
  },

  6: {
    html: `<!-- Qui puoi scrivere il tuo HTML personalizzato nell'editor -->`,
    js: `const elemento = document.getElementById("titolo");

if (elemento) {
  console.log("Tag:", elemento.tagName.toLowerCase());
  console.log("Testo:", elemento.textContent);
}`,
    explanation:
      "In questo step puoi scrivere il tuo codice HTML e JavaScript personalizzato.",
  },
};
