export interface InventoryProduct
{
    shipId?: string;
    shipName?: string;
    description?: string;
    status: number;
    passengerCapacity: number;
    cargoCapacity: number;
    createdBy: number;
    updatedBy: number;
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
    createdBy: number;
    updatedBy: number;
    fleetNumber?: string;
}
