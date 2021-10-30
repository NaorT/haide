interface Thumbnails {
  url: string,
  width: number,
  height: number
}

export interface YoutubeResult {
  id: string;
  title: string;
  thumbnails: {
    default: Thumbnails | null
    medium: Thumbnails| null
    high: Thumbnails| null
  }
}

export function createYoutubeResult({ title, id, thumbnails }: Partial<YoutubeResult>) {
  return {
    title,
    id,
    thumbnails
  } as YoutubeResult;
}
