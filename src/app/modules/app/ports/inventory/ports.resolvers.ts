import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomersService } from 'app/modules/app/customers/inventory/customers.service';
import {
    CustomerObject,
    InventoryPagination,
    InventoryProduct
} from 'app/modules/app/customers/inventory/customers.types';

@Injectable({
    providedIn: 'root'
})
export class InventoryBrandsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _inventoryService: CustomersService)
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return undefined;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */

}

@Injectable({
    providedIn: 'root'
})
export class InventoryCategoriesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _inventoryService: CustomersService)
    {
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return null;
    }



}

@Injectable({
    providedIn: 'root'
})
export class InventoryProductResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _inventoryService: CustomersService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InventoryProduct>
    {
        return this._inventoryService.getProductById(route.paramMap.get('id'))
                   .pipe(
                       // Error here means the requested product is not available
                       catchError((error) => {

                           // Log the error
                           console.error(error);

                           // Get the parent url
                           const parentUrl = state.url.split('/').slice(0, -1).join('/');

                           // Navigate to there
                           this._router.navigateByUrl(parentUrl);

                           // Throw an error
                           return throwError(error);
                       })
                   );
    }
}

@Injectable({
    providedIn: 'root'
})
export class InventoryProductsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _inventoryService: CustomersService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: InventoryPagination; customers: CustomerObject[] }>
    {
        return this._inventoryService.getProducts();
    }
}

@Injectable({
    providedIn: 'root'
})
export class InventoryTagsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _inventoryService: CustomersService)
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return undefined;
    }

}

@Injectable({
    providedIn: 'root'
})
export class InventoryVendorsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _inventoryService: CustomersService)
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return undefined;
    }

}
