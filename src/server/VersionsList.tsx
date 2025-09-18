import { Versions } from "./db/versions.ts";

export default function VersionsList() {
  return (
    <div>
      <ol>
        {Versions.map((version) => <li key={version.id}>{version.kr}</li>)}
      </ol>
    </div>
  );
}
