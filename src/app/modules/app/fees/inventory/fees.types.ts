export interface InventoryProduct
{
    feeId?: number;
    itemType?: number;
    description?: string;
    departurePort?: number;
    destinationPort?: number;
    cost?: number;
    status?: number;
    createdBy?: number;
    createdOn?: string;
    updatedBy?: string;
    updatedOn?: string;
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

export interface CustomerObject
{
    feeId?: number;
    itemType?: number;
    description?: string;
    departurePort?: number;
    destinationPort?: number;
    cost?: number;
    status?: number;
    createdBy?: number;
    createdOn?: string;
    updatedBy?: string;
    updatedOn?: string;
    thumbnail: string;
    images: string[];
    active: boolean;
}
