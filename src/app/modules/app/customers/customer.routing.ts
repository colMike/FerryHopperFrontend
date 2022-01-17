import { Route } from '@angular/router';
import { CustomersComponent } from 'app/modules/app/customers/inventory/customers.component';
import { CustomerListComponent } from 'app/modules/app/customers/inventory/list/customerList.component';
import { InventoryBrandsResolver, InventoryCategoriesResolver, InventoryProductsResolver, InventoryTagsResolver, InventoryVendorsResolver } from 'app/modules/app/customers/inventory/customers.resolvers';

export const customerRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'inventory'
    },
    {
        path     : 'inventory',
        component: CustomersComponent,
        children : [
            {
                path     : '',
                component: CustomerListComponent,
                resolve  : {
                    brands    : InventoryBrandsResolver,
                    categories: InventoryCategoriesResolver,
                    products  : InventoryProductsResolver,
                    tags      : InventoryTagsResolver,
                    vendors   : InventoryVendorsResolver
                }
            }
        ]
    }
];
