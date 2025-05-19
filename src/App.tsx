import { Circle, Monitor, Smartphone } from "lucide-react";
import { useSearchParams } from "react-router";
import { ToggleGroup } from "./components/ui/toggle-group.tsx";
import { VersionCombobox } from "./components/version-combobox.tsx";

function App() {
  const [searchParams] = useSearchParams();
  const size = searchParams.get("size") || "all";
  const version = searchParams.get("version") || null;

  return (
    <>
      <div>
        <SizeToggleGroup />
        <p>{size}</p>
      </div>
      <div>
        <p>{version}</p>
        <VersionCombobox />
      </div>
    </>
  );
}

function SizeToggleGroup() {
  const [_searchParams, setSearchParams] = useSearchParams();

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
