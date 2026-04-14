import React, { useEffect, useState } from "react";
import "../App.css";

function isActive(target, current) {
  if (!current) return false;
  if (target === current) return true;

  const groups = {
    sezione1: ["sezione1", "h1", "p"],
    sezione2: ["sezione2", "button", "ul", "li1", "li2"],
    ul: ["ul", "li1", "li2"],
    pagina: ["pagina", "sezione1", "sezione2", "h1", "p", "button", "ul", "li1", "li2"],
    body: ["body", "pagina", "sezione1", "sezione2", "h1", "p", "button", "ul", "li1", "li2"],
    html: ["html", "body", "pagina", "sezione1", "sezione2", "h1", "p", "button", "ul", "li1", "li2"],
  };

  return groups[current]?.includes(target) || false;
}

function treeClass(keyName, selected) {
  return isActive(keyName, selected) ? "tree-node-active" : "";
}

export default function Step1Dom() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      setSelected(event.detail.selected);
    };

    window.addEventListener("step1-highlight", handler);
    return () => window.removeEventListener("step1-highlight", handler);
  }, []);

  return (
    <div className="page-content">
      <div className="panel">
        <div className="panel-header">Pagina di esempio</div>
        <div className="panel-body">
          <div className={`demo-box demo-box-blue ${isActive("pagina", selected) ? "dom-highlight" : ""}`}>
            <div className={`demo-box demo-box-violet ${isActive("sezione1", selected) ? "dom-highlight" : ""}`}>
              <h1 className={`demo-title ${isActive("h1", selected) ? "dom-highlight-text" : ""}`}>
                Titolo della pagina
              </h1>
              <p className={`demo-text ${isActive("p", selected) ? "dom-highlight-text" : ""}`}>
                Questo è un paragrafo dentro il primo div.
              </p>
            </div>

            <div className={`demo-box demo-box-green ${isActive("sezione2", selected) ? "dom-highlight" : ""}`}>
              <button className={`demo-button ${isActive("button", selected) ? "dom-highlight-button" : ""}`}>
                Pulsante
              </button>
              <ul className={`demo-list ${isActive("ul", selected) ? "dom-highlight-list" : ""}`}>
                <li className={isActive("li1", selected) ? "dom-highlight-text" : ""}>Elemento lista 1</li>
                <li className={isActive("li2", selected) ? "dom-highlight-text" : ""}>Elemento lista 2</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Lettura come albero DOM</div>
        <div className="panel-body">
          <pre className="tree-block">{String.raw`html
└─ body
   └─ div#pagina
      ├─ div.sezione
      │  ├─ h1
      │  └─ p
      └─ div.sezione
         ├─ button
         └─ ul
            ├─ li
            └─ li`}</pre>

          
        </div>
      </div>
    </div>
  );
}