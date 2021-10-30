import { YoutubeResult } from '../../youtube/state/youtube.model';

export interface Playlist {
  id: number | string;
  name: string;
  items: YoutubeResult[];
}

export function createPlaylist({ id, name, items }: Partial<Playlist>) {
  return {
    id,
    items,
    name
  } as Playlist;
}
