export const inputEvents = [
  {
    name: "focus",
    description: "Si attiva quando l'utente clicca sull'input o ci naviga con Tab. È l'evento che segnala l'inizio dell'interazione con il campo.",
    example: "onFocus={() => console.log('Campo attivato per inserimento')}"
  },
  {
    name: "blur",
    description: "Si attiva quando l'utente esce dal campo (clicca altrove o preme Tab). Segnala la fine dell'interazione diretta con il campo.",
    example: "onBlur={() => console.log('Campo abbandonato')}"
  },
  {
    name: "input",
    description: "Si attiva ogni volta che il contenuto del campo cambia, inclusi caratteri aggiunti, rimossi o incollati. È l'evento più reattivo per monitorare l'input in tempo reale.",
    example: "onInput={(e) => setValue(e.target.value)}"
  },
  {
    name: "change",
    description: "Si attiva quando il valore cambia e l'utente abbandona il campo. È meno frequente dell'input ma più affidabile per validazioni finali.",
    example: "onChange={(e) => validateInput(e.target.value)}"
  },
  {
    name: "keydown",
    description: "Si attiva quando un tasto viene premuto mentre il campo è attivo. Utile per intercettare tasti speciali come Enter o frecce.",
    example: "onKeyDown={(e) => e.key === 'Enter' && submitForm()}"
  },
  {
    name: "keyup",
    description: "Si attiva quando un tasto viene rilasciato. Complementare a keydown per azioni al rilascio del tasto.",
    example: "onKeyUp={(e) => console.log('Tasto rilasciato:', e.key)}"
  },
  {
    name: "keypress",
    description: "Si attiva per tasti che producono caratteri (deprecato in favore di input/keydown). Meno affidabile per tasti speciali.",
    example: "onKeyPress={(e) => console.log('Carattere digitato')}"
  }
];

export const buttonEvents = [
  {
    name: "click",
    description: "Si attiva quando l'utente clicca sul bottone con mouse, touch o tasto Invio (se il bottone è attivo). È l'evento principale per i bottoni.",
    example: "onClick={() => console.log('Bottone cliccato')}"
  },
  {
    name: "mouseover",
    description: "Si attiva quando il mouse entra nell'area del bottone",
    example: "onMouseOver={() => console.log('Mouse sopra')}"
  },
  {
    name: "mouseout",
    description: "Si attiva quando il mouse esce dall'area del bottone",
    example: "onMouseOut={() => console.log('Mouse fuori')}"
  },
  {
    name: "focus",
    description: "Si attiva quando il bottone riceve il focus",
    example: "onFocus={() => console.log('Focus sul bottone')}"
  },
  {
    name: "blur",
    description: "Si attiva quando il bottone perde il focus",
    example: "onBlur={() => console.log('Blur sul bottone')}"
  }
];

export const radioEvents = [
  {
    name: "change",
    description: "Si attiva quando il radio button viene selezionato. È l'evento principale per i radio button poiché il cambio di selezione è gestito automaticamente dal browser.",
    example: "onChange={(e) => setSelectedValue(e.target.value)}"
  },
  {
    name: "click",
    description: "Si attiva quando il radio button viene cliccato, anche se era già selezionato. Utile per azioni aggiuntive oltre al cambio di selezione.",
    example: "onClick={() => trackRadioClick()}"
  }
];

export const checkboxEvents = [
  {
    name: "change",
    description: "Si attiva quando lo stato della checkbox cambia (da selezionata a deselezionata o viceversa). È l'evento principale per le checkbox.",
    example: "onChange={(e) => setChecked(e.target.checked)}"
  },
  {
    name: "click",
    description: "Si attiva quando la checkbox viene cliccata, anche se lo stato non cambia. Utile per tracking o azioni aggiuntive.",
    example: "onClick={() => trackCheckboxInteraction()}"
  }
];

export const selectEvents = [
  {
    name: "change",
    description: "Si attiva quando l'utente cambia la selezione nel menu a tendina. È l'evento principale per i select.",
    example: "onChange={(e) => setSelectedOption(e.target.value)}"
  },
  {
    name: "focus",
    description: "Si attiva quando il select riceve il focus (cliccato o tabbato).",
    example: "onFocus={() => setFocused(true)}"
  },
  {
    name: "blur",
    description: "Si attiva quando il select perde il focus (l'utente clicca altrove).",
    example: "onBlur={() => validateSelection()}"
  }
];