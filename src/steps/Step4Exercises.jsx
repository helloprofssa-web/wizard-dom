import React from "react";
import "../App.css";

export default function Step4Exercises() {
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
      <div className="panel">
        <div className="panel-header">Esercizi per la classe</div>
        <div className="panel-body">
          <div className="exercise-list">
            {exercises.map((exercise, index) => (
              <div key={index} className="exercise-item">
                <span className="exercise-number">{index + 1}</span>
                <span>{exercise}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}