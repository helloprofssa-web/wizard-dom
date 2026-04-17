import React, { useState, useRef, useEffect, useMemo } from "react";
import "../App.css";
import "../DomTree.css";

function formatNodeLabel(element) {
  const tagName = element.tagName.toLowerCase();
  const idPart = element.id ? `#${element.id}` : "";
  const classPart = element.className
    ? `.${String(element.className)
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .join(".")}`
    : "";

  return `${tagName}${idPart}${classPart}`;
}

function buildDomTree(element) {
  return {
    name: formatNodeLabel(element),
    children: Array.from(element.children)
      .filter((child) => child.tagName.toLowerCase() !== "script")
      .map(buildDomTree),
  };
}

function parseHtmlToTree(html) {
  const parser = new DOMParser();
  const parsedDoc = parser.parseFromString(html, "text/html");

  if (!parsedDoc.body) {
    throw new Error("DOM non generato");
  }

  return buildDomTree(parsedDoc.body);
}

function OrgChartNode({ node }) {
  return (
    <li>
      <div className="org-node">{node.name}</div>
      {node.children?.length ? (
        <ul>
          {node.children.map((child, index) => (
            <OrgChartNode key={`${child.name}-${index}`} node={child} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default function Step5DynamicHtml() {
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
   <div id="container">
    <h1 id="titolo">Titolo della Pagina</h1>
    <p class="messaggio">Questo è un paragrafo con classe messaggio.</p>
   </div>
   <div id="form">
    <input type="text" name="email" value="studente@example.com">
    <button id="bottone">Cliccami</button>
   </div>
  </body>
</html>`);

  const [jsCode, setJsCode] = useState(`// Esempi di selezione elementi:
//
// getElementById("id-elemento")
// getElementsByClassName("nome-classe")
// getElementsByName("nome-attributo")
//
// Prova a scrivere il tuo JavaScript qui!`);

  const [selectedElement, setSelectedElement] = useState("");
  const [showGeneratedTree, setShowGeneratedTree] = useState(true);
  const [treeError, setTreeError] = useState("");
  const iframeRef = useRef(null);

  // Ascolta gli aggiornamenti dal SidebarCode
  useEffect(() => {
    const handleUpdate = (event) => {
      const { html, js } = event.detail;
      setHtmlCode(html);
      setJsCode(js);
    };

    window.addEventListener("step6-html-update", handleUpdate);
    window.addEventListener("step5-html-update", handleUpdate);
    return () => {
      window.removeEventListener("step6-html-update", handleUpdate);
      window.removeEventListener("step5-html-update", handleUpdate);
    };
  }, []);

  useEffect(() => {
    if (!showGeneratedTree) return;

    try {
      const iframeDoc =
        iframeRef.current?.contentDocument ||
        iframeRef.current?.contentWindow?.document;

      if (iframeDoc?.documentElement) {
        setTreeError("");
        return;
      }

      setTreeError("");
    } catch (error) {
      console.log("Errore nell'aggiornamento automatico dell'albero DOM:", error);
      setTreeError("Non sono riuscito a generare il DOM dall'HTML corrente.");
    }
  }, [htmlCode, showGeneratedTree]);

  // Combina HTML e JS per l'iframe
  const fullHtmlCode = useMemo(() => {
    // Inserisci il JS nell'HTML prima del tag di chiusura </body>
    const jsScript = `<script>${jsCode}</script>`;
    return htmlCode.replace('</body>', jsScript + '</body>');
  }, [htmlCode, jsCode]);

  const getElementInfo = () => {
    try {
      if (!iframeRef.current || !selectedElement.trim()) return null;
      const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
      if (!doc) return null;

      const element = doc.getElementById(selectedElement) ||
                     doc.getElementsByClassName(selectedElement)[0] ||
                     Array.from(doc.getElementsByName(selectedElement))[0];

      if (!element) return null;

      return {
        tagName: element.tagName,
        id: element.id,
        className: element.className,
        innerHTML: element.innerHTML.substring(0, 100) + (element.innerHTML.length > 100 ? '...' : ''),
        textContent: element.textContent.substring(0, 100) + (element.textContent.length > 100 ? '...' : ''),
      };
    } catch (error) {
      console.log('Errore nell\'accesso al DOM dell\'iframe:', error);
      return null;
    }
  };

  const elementInfo = getElementInfo();

  const currentDomTree = useMemo(() => {
    if (!showGeneratedTree) return null;

    try {
      const iframeDoc =
        iframeRef.current?.contentDocument ||
        iframeRef.current?.contentWindow?.document;

      if (iframeDoc?.body) {
        return buildDomTree(iframeDoc.body);
      }

      return parseHtmlToTree(htmlCode);
    } catch (error) {
      console.log("Errore nella lettura dell'albero DOM:", error);
      return null;
    }
  }, [htmlCode, fullHtmlCode, showGeneratedTree]);

  const generateDomTree = () => {
    try {
      const iframeDoc =
        iframeRef.current?.contentDocument ||
        iframeRef.current?.contentWindow?.document;

      if (iframeDoc?.body) {
        buildDomTree(iframeDoc.body);
      } else {
        parseHtmlToTree(htmlCode);
      }

      setShowGeneratedTree(true);
      setTreeError("");
    } catch (error) {
      console.log("Errore nella generazione dell'albero DOM:", error);
      setShowGeneratedTree(false);
      setTreeError("Non sono riuscito a generare il DOM dall'HTML corrente.");
    }
  };

  return (
    <div className="page-content">
      <div className="panel">
        <div className="panel-header">Istruzioni</div>
        <div className="panel-body">
          <p>
            Modifica l'HTML e JavaScript nella sidebar a sinistra. Le modifiche si riflettono automaticamente qui nell'anteprima.
          </p>
          <p>
            L'albero DOM dell'HTML corrente viene mostrato subito e si aggiorna quando modifichi la struttura della pagina.
          </p>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Genera il DOM</div>
        <div className="panel-body">
          <div className="button-row sticky-action-row">
            {/* <button className="primary-btn" onClick={generateDomTree}>
              Genera albero DOM
            </button> */}
          </div>

          {currentDomTree ? (
            <div className="generated-dom-tree">
              <div className="resizable-dom-tree">
                <div className="dom-org-chart">
                  <div className="dom-org-chart-inner">
                    <ul>
                      <OrgChartNode node={currentDomTree} />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {treeError ? (
            <div
              className="demo-card"
              style={{ marginTop: "16px", background: "#fef2f2", borderColor: "#fca5a5" }}
            >
              <p>{treeError}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Anteprima della Pagina</div>
        <div className="panel-body">
          <div style={{
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            background: "white",
            height: "600px",
            overflow: "hidden",
            position: "relative"
          }}>
            <iframe
              ref={iframeRef}
              srcDoc={fullHtmlCode}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "12px"
              }}
              title="Anteprima HTML"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Ispeziona Elementi</div>
        <div className="panel-body">
          <div className="form-grid">
            <div>
              <label className="form-label">Seleziona elemento (id, classe o name):</label>
              <input
                type="text"
                className="input"
                value={selectedElement}
                onChange={(e) => setSelectedElement(e.target.value)}
                placeholder="Es: titolo, messaggio, email"
              />
            </div>
          </div>

          {elementInfo && (
            <div className="demo-card" style={{ marginTop: "16px" }}>
              <h3>Informazioni sull'elemento selezionato:</h3>
              <ul className="demo-list">
                <li><strong>Tag:</strong> {elementInfo.tagName}</li>
                <li><strong>ID:</strong> {elementInfo.id || "nessuno"}</li>
                <li><strong>Classe:</strong> {elementInfo.className || "nessuna"}</li>
                <li><strong>innerHTML:</strong> <code>{elementInfo.innerHTML}</code></li>
                <li><strong>textContent:</strong> <code>{elementInfo.textContent}</code></li>
              </ul>
            </div>
          )}

          {selectedElement.trim() && !elementInfo && (
            <div className="demo-card" style={{ marginTop: "16px", background: "#fef2f2", borderColor: "#fca5a5" }}>
              <p>Elemento "{selectedElement}" non trovato nell'HTML corrente.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
