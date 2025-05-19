import { useState } from "react";
import { Button } from "./components/ui/button.tsx";
import { Combobox, createListCollection } from "./components/ui/combobox.tsx";
import { type Version, versionNames, versions } from "./data/versions.ts";

const initialVersionCollection = createListCollection({
  "items": versions.map((version) => {
    return {
      "label": `${version}: ${versionNames[version]}`,
      "value": version,
    };
  }),
});

function App() {
  const [count, setCount] = useState(0);

  const [versionCollection, setVersionCollection] = useState(
    initialVersionCollection,
  );
  function handleInputChange({ inputValue }: Combobox.InputValueChangeDetails) {
    const filtered = initialVersionCollection.items.filter((item) =>
      item.label.includes(inputValue)
    );
    setVersionCollection(createListCollection({ items: filtered }));
  }

  const [version, setVersion] = useState<Version | null>(null);
  function handleValueChange({ value }: Combobox.ValueChangeDetails) {
    setVersion(value[0] as Version ?? null);
  }

  return (
    <>
      <Button
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </Button>
      <p>{version}</p>
      <Combobox.Root
        openOnClick
        name="version"
        collection={versionCollection}
        onInputValueChange={handleInputChange}
        onValueChange={handleValueChange}
      >
        <Combobox.Label>버전</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input placehoder="버전을 입력하세요" />
        </Combobox.Control>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.ItemGroup>
              {initialVersionCollection.items.map((item) => (
                <Combobox.Item key={item.value} item={item}>
                  <Combobox.ItemText>{item.label}</Combobox.ItemText>
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
