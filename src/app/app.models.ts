export interface User {
    email: string;
    password: string;
    id: string;
    photoUrl: string;
    displayName: string;
}

export interface LoginDetails {
    email: string;
    password: string;
}