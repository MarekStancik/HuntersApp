export interface UserModel {
    id: string;
    email: string;
    name: string;
    roles: UserRole;
}

export interface UserRole{
    admin?: boolean;
    hunter?: boolean;
}
