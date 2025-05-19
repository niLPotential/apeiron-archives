import { X } from "lucide-react";
import { Button } from "./components/ui/button.tsx";
import { IconButton } from "./components/ui/icon-button.tsx";
import { TagsInput } from "./components/ui/tags-input.tsx";

function App() {
  return (
    <TagsInput.Root>
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
  );
}

export default App;
