import { YoutubeResult } from '../../youtube/state/youtube.model';

export interface Playlist {
  id: string;
  createdAt: number;
  lastUpdate: number;
  createdBy: string;
  name: string;
  items: YoutubeResult[];
}

export function createPlaylist({ id, name, items, createdAt, createdBy, lastUpdate }: Partial<Playlist>) {
  return {
    id,
    items,
    name,
    lastUpdate,
    createdAt: new Date().getTime(),
    createdBy
  } as Playlist;
}
