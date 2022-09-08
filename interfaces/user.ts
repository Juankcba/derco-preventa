export interface IUser {
    _id: string;
    name: string;
    email: string;
    password?: string;
    role: string;
    image?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IPUser {
    name: string;
    email: string;
    rut: string;
    lastname: string;
    phone: string;

}