import { X } from "lucide-react";
import { useState } from "react";
import { useLoaderData } from "react-router";
import { Button } from "./ui/button.tsx";
import { Combobox, createListCollection } from "./ui/combobox.tsx";
import { IconButton } from "./ui/icon-button.tsx";
import { TagsInput } from "./ui/tags-input.tsx";
// import { versionNames } from "../data/versions.ts";
// import { getAllArcanists } from "../data/arcanists.ts";
// import { kv } from "../data/db.ts";

const initialCollection = createListCollection({
  "items": [...versions, ...arcanists],
  "itemToString": (item) => {
    switch (item.type) {
      case "version":
        return `${item.version}: ${
          (item as typeof versions[number]).versionName
        }`;
      case "arcanist":
        return (item as typeof arcanists[number]).krName;
      default:
        return "unknown type";
    }
  },
  "itemToValue": (item) => {
    switch (item.type) {
      case "version":
        return item.version;
      case "arcanist":
        return (item as typeof arcanists[number]).name;
      default:
        return "unknown type";
    }
  },
  "groupBy": (item) => item.type,
  "groupSort": ["version", "arcanist"],
});

export function WallpaperSearch() {
  const data = useLoaderData();
  const [collection, setCollection] = useState(initialCollection);

  function handleInputChange({ inputValue }: Combobox.InputValueChangeDetails) {
    const filtered = initialCollection.items.filter((item) =>
      item.toString().includes(inputValue) // TODO: better search method
    );
    setCollection(createListCollection({ items: filtered }));
  }

  return (
    <>
      <TagsInput.Root
        editable={false}
      >
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
                onSelect={({ itemValue }) => {
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
                          <Combobox.Item key={item.toValue()} item={item}>
                            <Combobox.ItemText>
                              {item.toString()}
                            </Combobox.ItemText>
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
