interface Thumbnails {
  url: string,
  width: number,
  height: number
}

export interface YoutubeResult {
  playlistId?: string;
  addedBy?: string;
  id: string;
  title: string;
  thumbnails: {
    default: Thumbnails | null
    medium: Thumbnails| null
    high: Thumbnails| null
  }
}

export function createYoutubeResult({ title, id, thumbnails, addedBy, playlistId }: Partial<YoutubeResult>) {
  return {
    playlistId,
    title,
    id,
    thumbnails,
    addedBy
  } as YoutubeResult;
}
