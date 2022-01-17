import { Route } from '@angular/router';
import { InventoryBrandsResolver, InventoryCategoriesResolver, InventoryProductsResolver, InventoryTagsResolver, InventoryVendorsResolver } from 'app/modules/app/customers/inventory/customers.resolvers';
import {UsersComponent} from './inventory/users.component';
import {UserListComponent} from './inventory/list/userList.component';

export const userRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'inventory'
    },
    {
        path     : 'inventory',
        component: UsersComponent,
        children : [
            {
                path     : '',
                component: UserListComponent,
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
