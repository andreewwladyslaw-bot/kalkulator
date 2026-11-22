
import { useState, useEffect } from "react";
import "./App.css";

const buttons = [
  "C", "⌫", "%", "÷",
  "7", "8", "9", "×",
  "4", "5", "6", "−",
  "1", "2", "3", "+",
  "±", "0", ".", "="
];

const initialState = {
  display: "0",
  previous: null,
  operator: null,
  startNew: false
};

function calculate(a, b, operator) {
  switch (operator) {
    case "+": return a + b;
    case "−": return a - b;
    case "×": return a * b;
    case "÷": return b === 0 ? NaN : a / b;
    default: return b;
  }
}

function formatResult(number) {
  if (!Number.isFinite(number)) return "Błąd";
  return String(Number(number.toPrecision(12)));
}

function updateCalculator(state, button) {
  const { display, previous, operator, startNew } = state;

  // 1. Czyszczenie
  if (button === "C") {
    return { ...initialState };
  }

  // 2. Usuwanie ostatniej cyfry
  if (button === "⌫") {
    if (display === "Błąd") return { ...initialState };

    if (startNew) {
      return { ...state, display: "0", startNew: false };
    }

    const result = display.slice(0, -1);

    return {
      ...state,
      display: result === "" || result === "-" ? "0" : result
    };
  }

  // 3. Wpisywanie cyfr
  if (/^[0-9]$/.test(button)) {
    let value;

    if (startNew || display === "Błąd" || display === "0") {
      value = button;
    } else if (display === "-0") {
      value = button === "0" ? "-0" : "-" + button;
    } else {
      value = display + button;
    }

    return {
      ...state,
      display: value,
      startNew: false
    };
  }

  if (display === "Błąd") return state;

  // 4. Kropka
  if (button === ".") {
    if (startNew) {
      return { ...state, display: "0.", startNew: false };
    }

    if (display.includes(".")) return state;

    return { ...state, display: display + "." };
  }

  // 5. Zmiana znaku
  if (button === "±") {
    const value = startNew && operator
      ? "-0"
      : display.startsWith("-")
        ? display.slice(1)
        : "-" + display;

    return { ...state, display: value, startNew: false };
  }

  // 6. Procenty
  if (button === "%") {
    const number = startNew && operator ? 0 : Number(display);

    const result =
      previous !== null &&
      (operator === "+" || operator === "−") &&
      !startNew
        ? previous * number / 100
        : number / 100;

    return {
      ...state,
      display: formatResult(result),
      startNew: false
    };
  }

  // 7. Dodawanie, odejmowanie, mnożenie, dzielenie
  if (["+", "−", "×", "÷"].includes(button)) {
    if (previous !== null && operator && !startNew) {
      const result = calculate(
        previous,
        Number(display),
        operator
      );

      if (!Number.isFinite(result)) {
        return { ...initialState, display: "Błąd" };
      }

      return {
        display: formatResult(result),
        previous: result,
        operator: button,
        startNew: true
      };
    }

    return {
      ...state,
      previous: previous !== null && startNew
        ? previous
        : Number(display),
      operator: button,
      startNew: true
    };
  }

  // 8. Obliczanie wyniku
  if (button === "=") {
    if (previous === null || !operator || startNew) {
      return state;
    }

    const result = calculate(
      previous,
      Number(display),
      operator
    );

    return {
      display: formatResult(result),
      previous: null,
      operator: null,
      startNew: true
    };
  }

  return state;
}

function getButtonClass(button) {
  if (button === "=") return "equals";

  if (["+", "−", "×", "÷"].includes(button)) {
    return "operator";
  }

  if (["C", "⌫", "%", "±"].includes(button)) {
    return "utility";
  }

  return "number";
}

function App() {
  const [state, setState] = useState(initialState);

  function handleClick(button) {
    setState(current => updateCalculator(current, button));
  }

  // Obsługa klawiatury
  useEffect(() => {
    const keyboardMap = {
      "*": "×",
      "/": "÷",
      "-": "−",
      "Enter": "=",
      "Backspace": "⌫",
      "Escape": "C",
      "Delete": "C",
      ",": "."
    };

    function handleKeyDown(event) {
      if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
      }

      const button = keyboardMap[event.key] ?? event.key;

      if (!buttons.includes(button)) return;

      event.preventDefault();

      setState(current => updateCalculator(current, button));
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="calculator">
      <h1>Kalkulator React</h1>

      <div className="display" aria-live="polite">
        <span className="display-label">
          {state.operator && state.previous !== null
            ? `${state.previous} ${state.operator}`
            : "Wynik"}
        </span>

        <span className="display-value">
          {state.display}
        </span>
      </div>

      <div className="buttons">
        {buttons.map(button => (
          <button
            key={button}
            type="button"
            className={
              getButtonClass(button) +
              (state.operator === button && state.startNew
                ? " selected"
                : "")
            }
            onClick={() => handleClick(button)}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
