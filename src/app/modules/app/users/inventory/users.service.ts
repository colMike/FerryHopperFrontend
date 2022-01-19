import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import {
    InventoryPagination,
    UserObject
} from 'app/modules/app/users/inventory/users.types';
import { environment } from 'environments/environment.prod';


@Injectable({
    providedIn: 'root'
})
export class UsersService
{
    // Private
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _customer: BehaviorSubject<UserObject | null> = new BehaviorSubject(null);
    private _customers: BehaviorSubject<UserObject[] | null> = new BehaviorSubject(null);
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
    get customer$(): Observable<UserObject>
    {
        return this._customer.asObservable();
    }

    /**
     * Getter for products
     */
    get customers$(): Observable<UserObject[]>
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
        Observable<{ pagination: InventoryPagination; customers: UserObject[] }>
    {

        const body = {
            'head': {
                'userId': 'PDD001',
                'requestId': 'XXXXXXXXXXXXX',
                'status': '',
                'message': ''
            }
        };

        console.log('In Get products function');
        return this._httpClient.post<any>(environment.apiUrl + '/users', body
        // return this._httpClient.get<{ pagination: InventoryPagination; customers: UserObject[] }>('api/apps/ecommerce/inventory/customers', {
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
                console.log('response');
                console.log(response);
                this._pagination.next(response.pagination ? response.pagination : 5);
                this._customers.next(response.body.users);
            })
        );
    }

    /**
     * Get product by id
     */
    getProductById(id: string): Observable<UserObject>
    {
        return this._customers.pipe(
            take(1),
            map((products) => {

                // Find the product
                const product = products.find(item => item.userId === parseInt(id, 10)) || null;

                // Update the product
                this._customer.next(product);

                // Return the product
                return product;
            }),
            switchMap((product) => {

                if ( !product )
                {
                    return throwError('Could not find User with id of ' + id + '!');
                }

                return of(product);
            })
        );
    }

    /**
     * Create product
     */
    createProduct(): Observable<UserObject>
    {
        const body = {
            'head': {
                'userId': 'PDD001',
                'requestId': 'XXXXXXXXXXXXX',
                'status': '',
                'message': ''
            },
            'body': {
                'user': {
                    'loginId': '',
                    'roleId': 0,
                    'status': 0,
                    'password': '',
                    'isConfirmed': false,
                    'firstName': '',
                    'middleName': '',
                    'surname': '',
                    'idNumber': '',
                    'email': '',
                    'passportNumber': '',
                    'lastLoginDate': '',
                    'isLoggedIn': false
                }
            }
        };
        return this.customers$.pipe(
            take(1),
            switchMap(products => this._httpClient.post<UserObject>(environment.apiUrl + '/create-user', body).pipe(
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
    updateProduct(id: string, product: UserObject): Observable<UserObject>
    {
        const body = {
            'head': {
                'userId': 'PDD001',
                'requestId': 'XXXXXXXXXXXXX',
                'status': '',
                'message': ''
            },
            'body': {
                'user': {
                    'userId': 0,
                    'loginId': 'PDD002',
                    'roleId': 1,
                    'status': 0,
                    'password': 'ttyyyy',
                    'isConfirmed': true,
                    'firstName': 'Jonah',
                    'middleName': 'Kimani',
                    'surname': 'Njore',
                    'idNumber': '1234546789',
                    'email': 'davydd@gmail.com',
                    'passportNumber': '489649IEUI',
                    'lastLoginDate': '',
                    'isLoggedIn': true
                }
            }
        };

        return this.customers$.pipe(
            take(1),

            switchMap(products => this._httpClient.post<UserObject>(environment.apiUrl + '/create-user', body

                // switchMap(products => this._httpClient.patch<UserObject>('api/apps/ecommerce/inventory/customer', {
            //     id,
            //     product
            // }
            ).pipe(
                map((updatedProduct) => {

                    // Find the index of the updated product
                    const index = products.findIndex(item => item.userId === parseInt(id, 10));

                    // Update the product
                    products[index] = updatedProduct;

                    // Update the products
                    this._customers.next(products);

                    // Return the updated product
                    return updatedProduct;
                }),
                switchMap(updatedProduct => this.customer$.pipe(
                    take(1),
                    filter(item => item && item.userId === parseInt(id, 10)),
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
                    const index = products.findIndex(item => item.userId === parseInt(id, 10));

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
