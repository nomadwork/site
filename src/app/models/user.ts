export default class User {
    password?: string;
    email: string;
    birthdate?: Date;
    gender?: string;
    name: string;
    admin: boolean;
    establishmments: Array<any> = [];
}
