export interface InventoryProduct
{
    shipId?: string;
    shipName?: string;
    description?: string;
    status: number;
    passengerCapacity: number;
    cargoCapacity: number;
    createdBy?: number;
    createdOn?: string;
    updatedBy?: number;
    updatedOn?: string;
    fleetNumber?: string;
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

export interface FerryObject
{
    shipId?: string;
    shipName?: string;
    description?: string;
    status: number;
    passengerCapacity: number;
    cargoCapacity: number;
    createdBy?: number;
    createdOn?: string;
    updatedBy?: number;
    updatedOn?: string;
    fleetNumber?: string;
}
