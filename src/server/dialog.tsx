import { Hono } from "@hono/hono";

const app = new Hono();

app.get((c) =>
  c.html(
    <div x-data x-ref="dialog">
      <button type="button" x-on:click="$refs.dialog.remove()">Close</button>
    </div>,
  )
);

export default app;
