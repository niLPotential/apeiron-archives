import type { PropsWithChildren } from "@hono/hono/jsx";

import { src } from "client:script";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {src.module.map((v) => <script key={v} type="module" src={v} />)}
        {src.style.map((v) => <link key={v} rel="stylesheet" href={v} />)}
        <title>Domco</title>
      </head>
      <body hx-boost>
        {children}
      </body>
    </html>
  );
}
