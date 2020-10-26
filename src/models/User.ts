export interface User {
    uid: string;
    name: string;
    email: string;
    description: string;
    image: string;
    createdAt: string;
}

export const INITIAL_USER: User = {
    uid: "",
    name : "",
    email: "",
    description: "",
    image: "",
    createdAt: ""
}