import { YoutubeResult } from '../../youtube/state/youtube.model';

export interface Playlist {
  id: string;
  createdAt: number;
  createdBy: string;
  name: string;
  items: YoutubeResult[];
}

export function createPlaylist({ id, name, items, createdAt, createdBy }: Partial<Playlist>) {
  return {
    id,
    items,
    name,
    createdAt: new Date().getTime(),
    createdBy
  } as Playlist;
}
