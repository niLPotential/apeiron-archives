import type { PropsWithChildren } from "@hono/hono/jsx";

import { tags } from "client:script";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {tags}
        <title>Domco</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
