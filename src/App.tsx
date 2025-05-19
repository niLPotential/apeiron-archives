import { useState } from "react";
import { Button } from "./components/ui/button.tsx";
import { Combobox, createListCollection } from "./components/ui/combobox.tsx";
import { versionNames, versions } from "./data/versions.ts";
import { ListCollection } from "@ark-ui/react";

const versionsCollection = createListCollection({
  "items": versions.map((version) => {
    return {
      "label": `${version}: ${versionNames[version]}`,
      "value": version,
    };
  }),
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </Button>
      <Combobox.Root collection={versionsCollection}>
        <Combobox.Label>버전</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input placehoder="버전을 입력하세요" />
        </Combobox.Control>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.ItemGroup>
              {versionsCollection.items.map((item) => (
                <Combobox.Item key={item.value} item={item}>
                  <Combobox.ItemText>{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                </Combobox.Item>
              ))}
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Combobox.Root>
    </>
  );
}

export default App;
