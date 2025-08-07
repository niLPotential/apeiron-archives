import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import htmx from "htmx.org";
import Alpine from "alpinejs";
// @ts-ignore 7017
globalThis.htmx = htmx;
// @ts-ignore 7017
globalThis.Alpine = Alpine;
Alpine.start();
