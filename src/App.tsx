import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "./components/ui/button.tsx";
import { Combobox, createListCollection } from "./components/ui/combobox.tsx";
import { IconButton } from "./components/ui/icon-button.tsx";
import { TagsInput } from "./components/ui/tags-input.tsx";
import {
  isVersion,
  isVersionName,
  versionNames,
  versions as versionsList,
} from "./data/versions.ts";
import { isSize } from "./data/wallpapers.ts";

const initialVersionCollection = createListCollection({
  "items": versionsList.map((version) => {
    return {
      "label": `${version}: ${versionNames[version]}`,
      "value": version,
    };
  }),
});

function App() {
  const [versions, setVersions] = useState(initialVersionCollection);

  function handleInputChange({ inputValue }: Combobox.InputValueChangeDetails) {
    const filtered = initialVersionCollection.items.filter((item) =>
      item.label.includes(inputValue) // TODO: better search method
    );
    setVersions(createListCollection({ items: filtered }));
  }

  return (
    <>
      <p>{versions.toString()}</p>
      <Combobox.Root
        collection={initialVersionCollection}
        onInputValueChange={handleInputChange}
      >
        <Combobox.Label>검색</Combobox.Label>
        <Combobox.Control>
          <TagsInput.Root
            validate={({ inputValue }: { inputValue: string }) =>
              isVersion(inputValue) || isSize(inputValue) ||
              isVersionName(inputValue)}
          >
            <TagsInput.Context>
              {(context) => (
                <>
                  <TagsInput.Label>검색</TagsInput.Label>
                  <TagsInput.Control>
                    {context.value.map((value, index) => (
                      <TagsInput.Item key={index} index={index} value={value}>
                        <TagsInput.ItemPreview>
                          <TagsInput.ItemText>{value}</TagsInput.ItemText>
                          <TagsInput.ItemDeleteTrigger asChild>
                            <IconButton variant="link" size="xs">
                              <X />
                            </IconButton>
                          </TagsInput.ItemDeleteTrigger>
                        </TagsInput.ItemPreview>
                      </TagsInput.Item>
                    ))}
                    <TagsInput.Input placeholder="Add Framework" />
                  </TagsInput.Control>
                  <TagsInput.ClearTrigger asChild>
                    <Button variant="outline">Clear</Button>
                  </TagsInput.ClearTrigger>
                </>
              )}
            </TagsInput.Context>
          </TagsInput.Root>
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
    </>
  );
}

export default App;
