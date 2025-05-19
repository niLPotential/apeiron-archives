import { Circle, Monitor, Smartphone } from "lucide-react";
import { useSearchParams } from "react-router";
import type { ToggleGroupValueChangeDetails } from "@ark-ui/react";
import { ToggleGroup } from "./ui/toggle-group.tsx";


export function SizeToggleGroup() {
  const [_searchParams, setSearchParams] = useSearchParams();

  return (
    <ToggleGroup.Root
      defaultValue={["all"]}
      deselectable={false}
      onValueChange={({ value }: ToggleGroupValueChangeDetails ) =>
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
