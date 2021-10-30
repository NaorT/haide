// export interface YoutubeItem {
//   id: number | string;
//   name: string;
// }

export interface YoutubeResult {
  id: number | string;
  name: string;
}

export function createYoutubeResult({ name, id }: Partial<YoutubeResult>) {
  return {
    name,
    id
  } as YoutubeResult;
}
