import React, { useState, useRef, useEffect, useMemo } from "react";
import "../App.css";

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

  const [selectedElement, setSelectedElement] = useState("");
  const iframeRef = useRef(null);

  // Ascolta gli aggiornamenti dal SidebarCode
  useEffect(() => {
    const handleUpdate = (event) => {
      const { html, js } = event.detail;
      setHtmlCode(html);
      setJsCode(js);
    };

    window.addEventListener("step5-html-update", handleUpdate);
    return () => window.removeEventListener("step5-html-update", handleUpdate);
  }, []);

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

  return (
    <div className="page-content">
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
                <li><strong>Contenuto HTML:</strong> <code>{elementInfo.innerHTML}</code></li>
                <li><strong>Testo:</strong> {elementInfo.textContent}</li>
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

      <div className="panel">
        <div className="panel-header">Istruzioni</div>
        <div className="panel-body">
          <p>
            Modifica l'HTML e JavaScript nella sidebar a sinistra. Le modifiche si riflettono automaticamente qui nell'anteprima.
          </p>
          <p>
            Usa lo strumento di ispezione per esplorare gli elementi del DOM della tua pagina personalizzata.
          </p>
        </div>
      </div>
    </div>
  );
}