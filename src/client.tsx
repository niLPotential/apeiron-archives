import { hc } from "hono/client";
import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import type { ApiType } from "./index.ts";

const client = hc<ApiType>("/");

function App() {
  return (
    <>
      <h1>Hello hono/jsx/dom!</h1>
      <h2>Example of useState()</h2>
      <Counter />
      <h2>Example of API fetch()</h2>
      <ClockButton />
      <h2>Connecting to Deno KV</h2>
      <a href="/api/wallpapers/6">Link to api</a>
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      You clicked me {count} times
    </button>
  );
}

const ClockButton = () => {
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    handleClick();
  }, []);

  const handleClick = async () => {
    const response = await client.api.clock.$get();
    const data = await response.json();
    const headers = Array.from(Object.entries(response.headers)).reduce<
      Record<string, string>
    >((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
    const fullResponse = {
      url: response.url,
      status: response.status,
      headers,
      body: data,
    };
    setResponse(JSON.stringify(fullResponse, null, 2));
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Get Server Time
      </button>
      {response && <pre>{response}</pre>}
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
