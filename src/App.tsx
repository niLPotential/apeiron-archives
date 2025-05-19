import { Circle, Monitor, Smartphone } from "lucide-react";
import { useState } from "react";
import { type SetURLSearchParams, useSearchParams } from "react-router";
import { Combobox, createListCollection } from "./components/ui/combobox.tsx";
import { ToggleGroup } from "./components/ui/toggle-group.tsx";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const size = searchParams.get("size") || "all";

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
      <div>
        <SizeToggleGroup setSearchParams={setSearchParams} />
        <p>{size}</p>
      </div>
      <div>
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
      </div>
    </>
  );
}

function SizeToggleGroup(
  { setSearchParams }: { setSearchParams: SetURLSearchParams },
) {
  return (
    <ToggleGroup.Root
      defaultValue={["all"]}
      deselectable={false}
      name="size"
      onValueChange={({ value }: { value: string }) =>
        setSearchParams({ size: value })}
    >
      <ToggleGroup.Item value="all" aria-label="Show all wallpapers">
        <Circle />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="deskop" aria-label="Show desktop wallpapers">
        <Monitor />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="mobile" aria-label="Show mobile wallpapers">
        <Smartphone />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}

export default App;
