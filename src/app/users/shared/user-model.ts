export interface UserModel {
    id: string;
    name: string;
    roles: UserRole;
}

export interface UserRole{
    admin?: boolean;
    hunter?: boolean;
}
