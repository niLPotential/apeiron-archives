import * as combobox from "@zag-js/combobox";
import { VanillaMachine } from "../zag/index.ts";

const data = [
  { label: 1, code: "a" },
  { label: 2, code: "b" },
  { label: 3, code: "c" },
  { label: 4, code: "d" },
  { label: 5, code: "e" },
  { label: 6, code: "f" },
];

export default function Combobox() {
  const service = useMachine(combobox.machine, {});
  Alpine.data("combobox", () => ({
    api: combobox.connect(service, normalizeProps),
  }));
  return (
    <div x-data="combobox">
      <div x-bind="api.getRootProps()">
        <label x-bind="api.getLabelProps()">Select country</label>
        <div x-bind="api.getControlProps()">
          <input x-bind="api.getInputProps()" />
          <button x-bind="api.getTriggerProps()">▼</button>
        </div>
      </div>
      <div x-bind="api.getPositionerProps()">
        <ul x-bind="api.getContentProps()">
          <template x-for="item in items">
            <li
              x-bind:key="item.code"
              x-bind="api.getItemProps(item)"
              x-text="item.label"
            >
            </li>
          </template>
        </ul>
      </div>
    </div>
  );
}
