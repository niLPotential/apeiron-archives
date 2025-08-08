import type { ArcanistData } from "../server/db.ts";
// import CharacterButton from "./CharacterButton.tsx";

export default function CharacterList({ list }: { list: ArcanistData[] }) {
  return (
    <div x-data="{query: ''}">
      <div class="relative">
        <input type="search" x-model="query" />
      </div>
      <ul class="flex flex-col overflow-auto gap-5">
        {list.map((character) => (
          <li
            key={character.id}
            x-show={`${character.id}toLowerCase().includes(query.toLowerCase())`}
          >
            <button
              type="button"
              hx-get={`/wallpapers/characters/${character.id}`}
              hx-target="main"
            >
              {character.kr}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
