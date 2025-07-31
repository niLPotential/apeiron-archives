import type { ArcanistData } from "../server/db.ts";
import CharacterButton from "./CharacterButton.tsx";

export default function CharacterList({ list }: { list: ArcanistData[] }) {
  return (
    <div>
      <ul>
        {list.map((character) => (
          <li>
            <CharacterButton id={character.id} name={character.kr} />
          </li>
        ))}
      </ul>
    </div>
  );
}
