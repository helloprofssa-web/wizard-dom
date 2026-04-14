import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  TreePine,
  MousePointerClick,
  FormInput,
  PencilRuler,
} from "lucide-react";
import "./App.css";

import SidebarCode from "./components/SidebarCode";
import Step1Dom from "./steps/Step1Dom";
import Step2Selectors from "./steps/Step2Selectors";
import Step3Events from "./steps/Step3Events";
import Step4Exercises from "./steps/Step4Exercises";

const stepMeta = [
  {
    id: 1,
    short: "DOM",
    title: "Il DOM",
    subtitle: "Passaggio 1",
    description:
      "La pagina HTML viene rappresentata dal browser come un albero di nodi.",
    icon: TreePine,
  },
  {
    id: 2,
    short: "Selettori",
    title: "ID, classi e selezione",
    subtitle: "Passaggio 2",
    description:
      "Selezioniamo gli elementi con id, class e name, e mostriamo innerHTML e alert.",
    icon: MousePointerClick,
  },
  {
    id: 3,
    short: "Eventi",
    title: "Form ed eventi",
    subtitle: "Passaggio 3",
    description:
      "Colleghiamo gli eventi agli input e mostriamo il ruolo di value.",
    icon: FormInput,
  },
  {
    id: 4,
    short: "Esercizi",
    title: "Esercizi",
    subtitle: "Passaggio 4",
    description:
      "Attività finali da svolgere con gli alunni in laboratorio.",
    icon: PencilRuler,
  },
];

function StepBadge({ active, children }) {
  return (
    <div className={`step-badge ${active ? "step-badge-active" : ""}`}>
      {children}
    </div>
  );
}

function TopPanel({ step }) {
  const current = stepMeta[step - 1];

  return (
    <div className="top-panel">
      <div>
        <h1>JavaScript e DOM</h1>
        <p>
          Un percorso guidato in 4 step per mostrare come JavaScript lavora
          dentro una pagina HTML: DOM, selezione degli elementi, script ed
          eventi.
        </p>
      </div>

      <div className="step-badge">
        Step {current.id} di {stepMeta.length}
      </div>
    </div>
  );
}

function StepHeader({ step }) {
  const current = stepMeta[step - 1];
  const Icon = current.icon;

  return (
    <div className="panel">
      <div className="panel-body">
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "16px",
              padding: "12px",
              display: "inline-flex",
            }}
          >
            <Icon size={24} color="#1d4ed8" />
          </div>

          <div>
            <p
              style={{
                margin: 0,
                color: "#1d4ed8",
                fontWeight: 700,
                fontSize: "0.95rem",
              }}
            >
              Step {current.id}
            </p>

            <h2 style={{ margin: "8px 0 8px" }}>{current.title}</h2>

            <p style={{ margin: 0, color: "#475569", lineHeight: 1.6 }}>
              {current.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderStep(step) {
  if (step === 1) return <Step1Dom />;
  if (step === 2) return <Step2Selectors />;
  if (step === 3) return <Step3Events />;
  return <Step4Exercises />;
}

export default function App() {
  const [step, setStep] = useState(1);
  const progress = (step / stepMeta.length) * 100;

  return (
    <div className="app-shell">
      <TopPanel step={step} />

      <div className="progress-wrap">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="step-grid">
        {stepMeta.map((item) => (
          <button
            key={item.id}
            className={`step-card ${item.id === step ? "active" : ""}`}
            onClick={() => setStep(item.id)}
          >
            <div className="step-title">{item.title}</div>
            <div className="step-subtitle">{item.subtitle}</div>
          </button>
        ))}
      </div>

      <div className="main-layout">
        <SidebarCode step={step} />

        <div className="page-content">
          <StepHeader step={step} />
          {renderStep(step)}
        </div>
      </div>

      <div className="nav-row">
        <button
          className="secondary-btn"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
        >
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <ChevronLeft size={16} />
            Indietro
          </span>
        </button>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {stepMeta.map((item) => (
            <div
              key={item.id}
              style={{
                width: "40px",
                height: "8px",
                borderRadius: "999px",
                background: step >= item.id ? "#0f172a" : "#cbd5e1",
              }}
            />
          ))}
        </div>

        <button
          className="primary-btn"
          onClick={() => setStep((s) => Math.min(stepMeta.length, s + 1))}
          disabled={step === stepMeta.length}
        >
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            Avanti
            <ChevronRight size={16} />
          </span>
        </button>
      </div>
    </div>
  );
}