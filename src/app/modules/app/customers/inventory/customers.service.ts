import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import {
    InventoryPagination,
    CustomerObject
} from 'app/modules/app/customers/inventory/customers.types';
import { environment } from 'environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class CustomersService
{
    // Private
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _customer: BehaviorSubject<CustomerObject | null> = new BehaviorSubject(null);
    private _customers: BehaviorSubject<CustomerObject[] | null> = new BehaviorSubject(null);
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
     * Getter for customer
     */
    get customer$(): Observable<CustomerObject>
    {
        return this._customer.asObservable();
    }

    /**
     * Getter for customers
     */
    get customers$(): Observable<CustomerObject[]>
    {
        return this._customers.asObservable();
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
    getProducts(page: number = 0, size: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<any>
    {

        const body = {
            'head': {
                'userId': 'PDD001',
                'requestId': 'XXXXXXXXXXXXX',
                'status': '',
                'message': ''
            }
        };

        return this._httpClient.post<any>(environment.apiUrl + '/customers', body
        //     return this._httpClient.get<{ pagination: InventoryPagination; customers: CustomerObject[] }>('api/apps/ecommerce/inventory/customers', {
        //     params: {
        //         page: '' + page,
        //         size: '' + size,
        //         sort,
        //         order,
        //         search
        //     }
        // }
        ).pipe(
            tap((response) => {
                this._pagination.next(response.pagination ? response.pagination : 5);
                this._customers.next(response.body.customers);
            })
        );
    }

    /**
     * Get product by id
     */
    getProductById(id: string): Observable<CustomerObject>
    {
        return this._customers.pipe(
            take(1),
            map((products) => {

                console.log('products');
                console.log(products);

                // Find the product
                const product = products.find(item => item.custId === parseInt(id, 10)) || null;

                // Update the product
                this._customer.next(product);

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
    createProduct(): Observable<CustomerObject>
    {

        const body = {
            'head': {
                'requestId': 'XXXXXXXXXXXXX',
                'useId': '',
                'status': '',
                'message': ''
            },
            'body': {
                customer: ''
            }
        };

        return this.customers$.pipe(
            take(1),
            switchMap(products => this._httpClient.post<CustomerObject>(environment.apiUrl + '/create-customer', body
            ).pipe(
                map((newProduct) => {

                    // Update the products with the new product
                    this._customers.next([newProduct, ...products]);

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
    updateProduct(id: string, product: CustomerObject): Observable<CustomerObject>
    {
        const body = {
            'head': {
                'requestId': 'XXXXXXXXXXXXX',
                'useId': '',
                'status': '',
                'message': ''
            },
            'body': {
                customer: product
            }
        };

        return this.customers$.pipe(
            take(1),
            switchMap(products => this._httpClient.post<CustomerObject>(environment.apiUrl + '/create-customer', body
            ).pipe(
                map((updatedProduct) => {

                    console.log('Here is the body');
                    console.log(body);
                    console.log('Here is the updated product');
                    console.log(products);
                    console.log(updatedProduct);
                    // Find the index of the updated product
                    const index = products.findIndex(item => item.custId === parseInt(id, 10));

                    // Update the product
                    products[index] = updatedProduct;

                    // Update the products
                    this._customers.next(products);

                    // Return the updated product
                    return updatedProduct;
                }),
                switchMap(updatedProduct => this.customer$.pipe(
                    take(1),
                    filter(item => item && item.custId === parseInt(id)),
                    tap(() => {

                        // Update the product if it's selected
                        this._customer.next(updatedProduct);

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
        return this.customers$.pipe(
            take(1),
            switchMap(products => this._httpClient.delete('api/apps/ecommerce/inventory/customer', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted product
                    const index = products.findIndex(item => item.custId === parseInt(id));

                    // Delete the product
                    products.splice(index, 1);


                    // Update the products
                    this._customers.next(products);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }
}
