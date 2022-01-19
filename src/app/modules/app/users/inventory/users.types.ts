export interface InventoryProduct
{
    userId?: number;
    loginId?: string;
    roleId?: number;
    status?: number;
    password?: boolean;
    isConfirmed?: string;
    firstName?: string;
    middleName?: string;
    surname?: string;
    idNumber?: string;
    email?: string;
    passportNumber?: string;
    lastLoginDate?: string;
    isLoggedIn?: boolean;

    thumbnail: string;
    images: string[];
    active: boolean;
}

export interface InventoryPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}

export interface UserObject
{
    userId?: number;
    loginId?: string;
    roleId?: number;
    status?: number;
    password?: boolean;
    isConfirmed?: string;
    firstName?: string;
    middleName?: string;
    surname?: string;
    idNumber?: string;
    email?: string;
    passportNumber?: string;
    lastLoginDate?: string;
    isLoggedIn?: boolean;

    thumbnail: string;
    images: string[];
    active: boolean;
}
