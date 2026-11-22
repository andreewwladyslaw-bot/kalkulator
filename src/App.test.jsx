
/**
 * @vitest-environment jsdom
 */

import { afterEach, describe, expect, it } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import App from "./App";

afterEach(() => {
  cleanup();
});

// Symulacja kliknięć przycisków
function clickButtons(...keys) {
  keys.forEach((key) => {
    fireEvent.click(
      screen.getByRole("button", { name: key })
    );
  });
}

// Odczyt wartości wyświetlacza
function getDisplay() {
  return document.querySelector(".display-value").textContent;
}

describe("Testy kalkulatora React", () => {

  it("dodawanie 8 + 5 = 13", () => {
    render(<App />);

    clickButtons("8", "+", "5", "=");

    expect(getDisplay()).toBe("13");
  });

  it("odejmowanie 9 - 4 = 5", () => {
    render(<App />);

    clickButtons("9", "−", "4", "=");

    expect(getDisplay()).toBe("5");
  });

  it("mnożenie 7 × 6 = 42", () => {
    render(<App />);

    clickButtons("7", "×", "6", "=");

    expect(getDisplay()).toBe("42");
  });

  it("dzielenie 8 ÷ 2 = 4", () => {
    render(<App />);

    clickButtons("8", "÷", "2", "=");

    expect(getDisplay()).toBe("4");
  });

  it("dzielenie przez zero", () => {
    render(<App />);

    clickButtons("5", "÷", "0", "=");

    expect(getDisplay()).toBe("Błąd");
  });

  it("usuwanie ostatniej cyfry", () => {
    render(<App />);

    clickButtons("1", "2", "3", "⌫");

    expect(getDisplay()).toBe("12");
  });

  it("czyszczenie kalkulatora", () => {
    render(<App />);

    clickButtons("5", "6", "C");

    expect(getDisplay()).toBe("0");
  });

  it("zmiana znaku", () => {
    render(<App />);

    clickButtons("8", "±");

    expect(getDisplay()).toBe("-8");
  });

  it("obliczanie procentów", () => {
    render(<App />);

    clickButtons("2", "0", "0", "+", "1", "0", "%", "=");

    expect(getDisplay()).toBe("220");
  });

  it("obsługa klawiatury", () => {
    render(<App />);

    ["8", "+", "5", "Enter"].forEach((key) => {
      fireEvent.keyDown(window, { key });
    });

    expect(getDisplay()).toBe("13");
  });

});
