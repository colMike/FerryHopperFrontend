export interface InventoryProduct
{
    portId?: number;
    name?: string;
    description?: string;
    geolocation?: string;
    createdBy?: number;
    createdOn?: string;
    status?: number;
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
    portId?: number;
    name?: string;
    description?: string;
    geolocation?: string;
    createdBy?: number;
    createdOn?: string;
    status?: number;
    thumbnail: string;
    images: string[];
    active: boolean;
}
