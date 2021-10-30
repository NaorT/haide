export interface PlaylistItem {
  id: number | string;
  name: string;
}
export interface Playlist {
  id: number | string;
  name: string;
  items: PlaylistItem[];
}

export function createPlaylist({ id, name, items }: Partial<Playlist>) {
  return {
    id,
    items,
    name
  } as Playlist;
}
