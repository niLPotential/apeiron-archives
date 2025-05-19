import { Circle, Monitor, Smartphone } from "lucide-react";
import { useState } from "react";
import { type SetURLSearchParams, useSearchParams } from "react-router";
import { Combobox, createListCollection } from "./components/ui/combobox.tsx";
import { ToggleGroup } from "./components/ui/toggle-group.tsx";
import { type Version, versionNames, versions } from "./data/versions.ts";
import type { ListCollection } from "@ark-ui/react";

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
  const version = searchParams.get("version") || null;

  return (
    <>
      <div>
        <SizeToggleGroup setSearchParams={setSearchParams} />
        <p>{size}</p>
      </div>
      <div>
        <p>{version}</p>
        <VersionCombobox
          versionCollection={initialVersionCollection}
          setSearchParams={setSearchParams}
        />
      </div>
    </>
  );
}

function VersionCombobox(
  { versionCollection, setSearchParams }: {
    versionCollection: ListCollection<{ label: string; value: Version }>;
    setSearchParams: SetURLSearchParams;
  },
) {
  const [versions, setVersions] = useState(versionCollection);

  function handleInputChange({ inputValue }: Combobox.InputValueChangeDetails) {
    const filtered = versionCollection.items.filter((item) =>
      item.label.includes(inputValue)
    );
    setVersions(createListCollection({ items: filtered }));
  }

  function handleValueChange({ value }: Combobox.ValueChangeDetails) {
    setSearchParams({ "version": value });
  }

  return (
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
            {versions.items.map((item) => (
              <Combobox.Item key={item.value} item={item}>
                <Combobox.ItemText>{item.label}</Combobox.ItemText>
              </Combobox.Item>
            ))}
          </Combobox.ItemGroup>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
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
