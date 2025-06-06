import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

Object.assign(globalThis, {
  TextEncoder,
  TextDecoder,
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

Object.defineProperty(window, "getComputedStyle", {
  value: (elt: Element, pseudoElt?: string | null): CSSStyleDeclaration => {
    return {
      getPropertyValue: (prop: string) => "",
      ...new Proxy(
        {},
        {
          get: () => () => {},
        }
      ),
    } as CSSStyleDeclaration;
  },
});
