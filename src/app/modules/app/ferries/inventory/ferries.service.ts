import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import {
    InventoryPagination,
    FerryObject
} from 'app/modules/app/ferries/inventory/ferries.types';
import {environment} from '../../../../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class FerriesService
{
    // Private
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _ferry: BehaviorSubject<FerryObject | null> = new BehaviorSubject(null);
    private _ferries: BehaviorSubject<FerryObject[] | null> = new BehaviorSubject(null);
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<InventoryPagination>
    {
        return this._pagination.asObservable();
    }

    /**
     * Getter for product
     */
    get ferry$(): Observable<FerryObject>
    {
        return this._ferry.asObservable();
    }

    /**
     * Getter for products
     */
    get ferries$(): Observable<FerryObject[]>
    {
        return this._ferries.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get products
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getFerries(page: number = 0, size: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<any>
    {
        console.log('calling getFerries.....');

        const body = {
            'head': {
                'userId': '',
                'requestId': 'XXXXXXXXXXXXX',
                'status': '',
                'message': ''
            }
        };
        return this._httpClient.post<any>(environment.apiUrl + '/ferries', body
        // return this._httpClient.get<{ pagination: InventoryPagination; ferries: FerryObject[] }>('api/apps/ecommerce/inventory/products', {
        //     params: {
        //         page: '' + page,
        //         size: '' + size,
        //         sort,
        //         order,
        //         search
        //     }
        // }
        )
            .pipe(


            tap((response) => {
                console.log('response');
                console.log(response);
                this._pagination.next(response.pagination ? response.pagination : 5);
                this._ferries.next(response.body.ships);
            })
        );
    }

    /**
     * Get product by id
     */
    getProductById(id: string): Observable<FerryObject>
    {
        console.log('here is the id to check.');
        console.log(id);
        return this._ferries.pipe(
            take(1),
            map((products) => {

                // Find the product
                const product = products.find(item => item.shipId === id) || null;


                // Update the product
                this._ferry.next(product);

                // Return the product
                return product;
            }),
            switchMap((product) => {

                if ( !product )
                {
                    return throwError('Could not find Customer with id of ' + id + '!');
                }

                return of(product);
            })
        );
    }

    /**
     * Create product
     */
    createProduct(requestBody): Observable<FerryObject>
    {
        return this.ferries$.pipe(
            take(1),
            switchMap(products => this._httpClient.post<FerryObject>('api/apps/ecommerce/inventory/customer', requestBody).pipe(
                map((newProduct) => {

                    // Update the products with the new product
                    this._ferries.next([newProduct, ...products]);

                    // Return the new product
                    return newProduct;
                })
            ))
        );
    }

    /**
     * Update product
     *
     * @param id
     * @param product
     */
    updateProduct(id: string, product: FerryObject): Observable<FerryObject>
    {
        const body = {
            'head': {
                'requestId': 'XXXXXXXXXXXXX',
                'useId': '',
                'status': '',
                'message': ''
            },
            'body': {
                ship: product
            }
        };

        return this.ferries$.pipe(
            take(1),
            switchMap(products => this._httpClient.post<FerryObject>(environment.apiUrl + '/create-ferry', body
            // switchMap(products => this._httpClient.patch<FerryObject>('api/apps/ecommerce/inventory/customer', {
            //     id,
            //     product
            // }
            ).pipe(
                map((updatedProduct) => {

                    console.log('updatedProduct imerudi ikikaa hivi.');
                    console.log(updatedProduct);

                    // Find the index of the updated product
                    const index = products.findIndex(item => item.shipId === id);

                    // Update the product
                    products[index] = updatedProduct;

                    // Update the products
                    this._ferries.next(products);

                    // Return the updated product
                    return updatedProduct;
                }),
                switchMap(updatedProduct => this.ferry$.pipe(
                    take(1),
                    filter(item => item && item.shipId === id),
                    tap(() => {

                        // Update the product if it's selected
                        this._ferry.next(updatedProduct);

                        // Return the updated product
                        return updatedProduct;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the product
     *
     * @param id
     */
    deleteProduct(id: string): Observable<boolean>
    {
        return this.ferries$.pipe(
            take(1),
            switchMap(products => this._httpClient.delete('api/apps/ecommerce/inventory/customer', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted product
                    const index = products.findIndex(item => item.shipId === id);

                    // Delete the product
                    products.splice(index, 1);

                    // Update the products
                    this._ferries.next(products);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }
}
