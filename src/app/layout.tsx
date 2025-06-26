import type { PropsWithChildren } from "@hono/hono/jsx";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Domco</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
