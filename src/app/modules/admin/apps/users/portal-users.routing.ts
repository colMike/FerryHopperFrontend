import { Route } from '@angular/router';
import { InventoryComponent } from 'app/modules/admin/apps/users/inventory/inventory.component';
import { InventoryListComponent } from 'app/modules/admin/apps/users/inventory/list/inventory.component';
import { InventoryBrandsResolver, InventoryCategoriesResolver, InventoryProductsResolver, InventoryTagsResolver, InventoryVendorsResolver } from 'app/modules/admin/apps/users/inventory/inventory.resolvers';

export const portalUserRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'inventory'
    },
    {
        path     : 'inventory',
        component: InventoryComponent,
        children : [
            {
                path     : '',
                component: InventoryListComponent,
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
