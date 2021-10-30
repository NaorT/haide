export interface User {
  id: number | string;
  email: string;
  displayName: string;
  photoURL: string;
}

export function createUser({ id, email, displayName, photoURL }: User) {
  return {
    id,
    email,
    displayName,
    photoURL
  } as User;
}

