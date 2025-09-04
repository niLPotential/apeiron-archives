import "virtual:uno.css";
import htmx from "htmx.org";
import Alpine from "alpinejs";

// @ts-ignore htmx
globalThis.htmx = htmx;
// @ts-ignore alpine
globalThis.Alpine = Alpine;
Alpine.start();
