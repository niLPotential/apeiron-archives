import { versionNames, versions } from "../../db/versions.ts";
import type { Arcanist } from "../../db/arcanists.ts";

export default function Home({ arcanists }: { arcanists: Arcanist[] }) {
  return (
    <>
      <ul>
        {versions.map((version) => (
          <li key={version}>
            <a href={`/wallpapers/versions/${version}`}>
              {`${version}: ${versionNames[version]}`}
            </a>
          </li>
        ))}
      </ul>
      <ul>
        {arcanists.map((arcanist) => (
          <li key={arcanist.name}>
            <a href={`/wallpapers/characters/${arcanist.name}`}>
              {arcanist.krName}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
