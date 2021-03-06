import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { InventoryPagination, InventoryProduct, CustomerObject} from 'app/modules/app/customers/inventory/customers.types';
import { CustomersService } from 'app/modules/app/customers/inventory/customers.service';
import {useAnimation} from '@angular/animations';

@Component({
    selector       : 'inventory-list',
    templateUrl    : './customerList.component.html',
    styles         : [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 12.5% 12.5% 12.5%  12.5%  12.5%  12.5%  12.5%  12.5% 12.5%;

                @screen sm {
                    grid-template-columns: 12.5% 12.5% 12.5%  12.5%  12.5%  12.5%  12.5%  12.5% 12.5% ;
                }

                @screen md {
                    grid-template-columns: 12.5% 12.5% 12.5%  12.5%  12.5%  12.5%  12.5%  12.5% 12.5% ;
                }

                @screen lg {
                    grid-template-columns: 12.5% 12.5% 12.5%  12.5%  12.5%  12.5%  12.5%  12.5% 12.5% ;
                }
            }
        `
    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations
})
export class CustomerListComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    customers$: Observable<CustomerObject[]>;

    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: InventoryPagination;
    searchInputControl: FormControl = new FormControl();
    selectedProduct: InventoryProduct | null = null;
    selectedCustomerForm: FormGroup;
    tagsEditMode: boolean = false;
    documentType = 'idCard';
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _inventoryService: CustomersService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the selected product form
        this.selectedCustomerForm = this._formBuilder.group({
            custId:[''],
            firstName:[''],
            middleName:[''],
            surname:[''],
            gender:[''],
            id:[''],
            passport:[''],
            country:[''],
            city:[''],
            homePortId:[''],
            email:[''],
            phoneNumber:[''],
            password:[''],
            status:[''],
            createdBy:[''],
            dateOfBirth:[''],
            createdOn: [''],
            lastLogin: [''],
            accountConfirmed: [''],

            images : [[]],
            currentImageIndex: [0],
        });

        // Get the pagination
        this._inventoryService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: InventoryPagination) => {

                // Update the pagination
                this.pagination = pagination;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the customers
        this.customers$ = this._inventoryService.customers$;
        console.log('this.customers$ observable');
        console.log(this.customers$);
        this.customers$.subscribe((customer) => {
            console.log('customer');
            console.log(customer);
        });

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._inventoryService.getProducts(0, 10, 'name', 'asc', query);
                }),
                map(() => {
                    this.isLoading = false;
                })
            )
            .subscribe();
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
        if ( this._sort && this._paginator )
        {
            // Set the initial sort
            this._sort.sort({
                id          : 'firstName',
                start       : 'asc',
                disableClear: true
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();

            // If the user changes the sort order...
            this._sort.sortChange
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() => {
                    // Reset back to the first page
                    this._paginator.pageIndex = 0;

                    // Close the details
                    this.closeDetails();
                });

            // Get products if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._inventoryService.getProducts(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle product details
     *
     * @param productId
     */
    toggleDetails(productId: string): void
    {

        // If the product is already selected...
        if ( this.selectedProduct && this.selectedProduct.custId === parseInt(productId) )
        {
            // Close the details
            this.closeDetails();
            return;
        }

        // Get the product by id
        this._inventoryService.getProductById(productId)
            .subscribe((product) => {

                console.log('got this product');
                console.log(product);

                // Set the selected product
                this.selectedProduct = product;

                // Fill the form
                this.selectedCustomerForm.patchValue(product);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * Close the details
     */
    closeDetails(): void
    {
        this.selectedProduct = null;
    }

    /**
     * Cycle through images of selected product
     */
    cycleImages(forward: boolean = true): void
    {
        // Get the image count and current image index
        const count = this.selectedCustomerForm.get('images').value.length;
        const currentIndex = this.selectedCustomerForm.get('currentImageIndex').value;

        // Calculate the next and previous index
        const nextIndex = currentIndex + 1 === count ? 0 : currentIndex + 1;
        const prevIndex = currentIndex - 1 < 0 ? count - 1 : currentIndex - 1;

        // If cycling forward...
        if ( forward )
        {
            this.selectedCustomerForm.get('currentImageIndex').setValue(nextIndex);
        }
        // If cycling backwards...
        else
        {
            this.selectedCustomerForm.get('currentImageIndex').setValue(prevIndex);
        }
    }




    /**
     * Create product
     */
    createProduct(): void
    {
        // Create the product
        this._inventoryService.createProduct().subscribe((newProduct) => {

            // Go to new product
            this.selectedProduct = newProduct;

            // Fill the form
            this.selectedCustomerForm.patchValue(newProduct);

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * Update the selected product using the form data
     */
    updateSelectedProduct(): void
    {
        // Get the product object
        const product = this.selectedCustomerForm.getRawValue();

        // Remove the currentImageIndex field
        delete product.currentImageIndex;

        // Update the product on the server
        this._inventoryService.updateProduct(product.custId, product).subscribe(() => {

            // Show a success message
            this.showFlashMessage('success');
        });
    }

    /**
     * Delete the selected product using the form data
     */
    deleteSelectedProduct(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Disable Customer',
            message: 'Are you sure you want to disable this customer? This customer will need to be re-enabled for use later.',
            actions: {
                confirm: {
                    label: 'Disable'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if ( result === 'confirmed' )
            {

                // Get the product object
                const product = this.selectedCustomerForm.getRawValue();

                // Delete the product on the server
                this._inventoryService.deleteProduct(product.custId).subscribe(() => {

                    // Close the details
                    this.closeDetails();
                });
            }
        });
    }

    /**
     * Show flash message
     */
    showFlashMessage(type: 'success' | 'error'): void
    {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {

            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.custId || index;
    }

    documentTypeChanged(value: any): any {
        this.documentType = value;
    }
}
