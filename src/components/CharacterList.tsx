import type { ArcanistData } from "../server/db.ts";
// import CharacterButton from "./CharacterButton.tsx";

export default function CharacterList({ list }: { list: ArcanistData[] }) {
  return (
    <div
      x-data={`{
        query: '',
        allOptions: ${JSON.stringify(list)},
        get options() {
          return this.allOptions.filter((option) => 
            option.id.toLowerCase().includes(this.query.toLowerCase())
          )
        }
      }`}
    >
      <div class="relative">
        <input type="search" x-model="query" />
      </div>
      <ul class="flex flex-col overflow-auto">
        <template x-for="item in options" x-bind:key="item.id">
          <li>
            <a
              x-bind:href="'/wallpapers/characters/' + item.id.toString()"
              class="border rounded-full p-5"
            >
              <span x-text="item.kr"></span>
            </a>
          </li>
        </template>
      </ul>
    </div>
  );
}
