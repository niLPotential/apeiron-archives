export const versions = [
  "1.0",
  "1.1",
  "1.2",
  "1.3",
  "1.4",
  "1.5",
  "1.6",
  "1.7",
  "1.8",
  "1.9",
] as const;

export type Version = typeof versions[number];

export const versionNames: Record<Version, string> = {
  "1.0": "빗속의 재연된 과거",
  "1.1": "쥘 리메 컵 도난 사건",
  "1.2": "그린 레이크의 악몽",
  "1.3": "모르판크로의 여행",
  "1.4": "동굴 속의 죄수",
  "1.5": "부활! 울루루 대회",
  "1.6": "삭일수기",
  "1.7": "별은 빛나건만",
  "1.8": "안녕, 라야시키",
  "1.9": "고독의 노래",
};
