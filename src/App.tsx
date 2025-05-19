import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "./components/ui/button.tsx";
import { Combobox, createListCollection } from "./components/ui/combobox.tsx";
import { IconButton } from "./components/ui/icon-button.tsx";
import { TagsInput } from "./components/ui/tags-input.tsx";
import {
  // isVersion,
  // isVersionName,
  versionNames,
  versions as versionsList,
} from "./data/versions.ts";
// import { isSize } from "./data/wallpapers.ts";

interface Item {
  label: string;
  value: string;
  type: string;
}

const initialCollection = createListCollection<Item>({
  "items": versionsList.map((version) => {
    return {
      label: `${version}: ${versionNames[version]}`,
      value: version,
      type: "version",
    };
  }),
  "groupBy": (item) => item.type,
});

function App() {
  const [collection, setCollection] = useState(initialCollection);

  function handleInputChange({ inputValue }: Combobox.InputValueChangeDetails) {
    const filtered = initialCollection.items.filter((item) =>
      item.label.includes(inputValue) // TODO: better search method
    );
    setCollection(createListCollection({ items: filtered }));
  }

  return (
    <>
      <TagsInput.Root editable={false}>
        <TagsInput.Context>
          {(context) => (
            <>
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
              </TagsInput.Control>
              <Combobox.Root
                collection={collection}
                inputBehavior="autohighlight"
                onInputValueChange={handleInputChange}
                onSelect={({ itemValue }: { itemValue: string }) => {
                  context.addValue(itemValue);
                }}
              >
                <Combobox.Control>
                  <Combobox.Input />
                </Combobox.Control>
                <Combobox.Positioner>
                  <Combobox.Content>
                    {collection.group().map(([type, group]) => (
                      <Combobox.ItemGroup key={type}>
                        <Combobox.ItemGroupLabel>
                          {type}
                        </Combobox.ItemGroupLabel>
                        {group.map((item) => (
                          <Combobox.Item key={item.value} item={item}>
                            <Combobox.ItemText>{item.label}</Combobox.ItemText>
                          </Combobox.Item>
                        ))}
                      </Combobox.ItemGroup>
                    ))}
                  </Combobox.Content>
                </Combobox.Positioner>
              </Combobox.Root>
              <TagsInput.ClearTrigger asChild>
                <Button variant="outline">Clear</Button>
              </TagsInput.ClearTrigger>
            </>
          )}
        </TagsInput.Context>
      </TagsInput.Root>
    </>
  );
}

export default App;
