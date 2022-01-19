export interface InventoryProduct
{
    custId?: number;
    firstName?: string;
    middleName?: string;
    surname?: string;
    gender?: string;
    id?: string;
    passport?: string;
    country?: string;
    city?: string;
    homePortId?: number;
    email?: string;
    phoneNumber?: string;
    password?: string;
    status?: number;
    createdBy?: number;
    accountConfirmed?: boolean;
    dateOfBirth?: string;
    createdOn?: string;
    lastLogin?: string;
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

export interface CustomerObject
{
    custId?: number;
    firstName?: string;
    middleName?: string;
    surname?: string;
    gender?: string;
    id?: string;
    passport?: string;
    country?: string;
    city?: string;
    homePortId?: number;
    email?: string;
    phoneNumber?: string;
    password?: string;
    status?: number;
    createdBy?: number;
    accountConfirmed?: boolean;
    dateOfBirth?: string;
    createdOn?: string;
    lastLogin?: string;
}
