import { useState } from "react";
import { useSearchParams } from "react-router";
import { Combobox, createListCollection } from "./ui/combobox.tsx";
import { versionNames, versions } from "../data/versions.ts";

const initialVersionCollection = createListCollection({
  "items": versions.map((version) => {
    return {
      "label": `${version}: ${versionNames[version]}`,
      "value": version,
    };
  }),
});

export function VersionCombobox() {
  const [_searchParams, setSearchParams] = useSearchParams();
  const [versions, setVersions] = useState(initialVersionCollection);

  function handleInputChange({ inputValue }: Combobox.InputValueChangeDetails) {
    const filtered = initialVersionCollection.items.filter((item) =>
      item.label.includes(inputValue) // TODO: better search method
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
      collection={versions}
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
