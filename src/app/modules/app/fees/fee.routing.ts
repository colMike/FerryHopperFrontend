import {Route} from '@angular/router';
import {
    InventoryBrandsResolver,
    InventoryCategoriesResolver,
    InventoryProductsResolver,
    InventoryTagsResolver,
    InventoryVendorsResolver
} from 'app/modules/app/fees/inventory/fees.resolvers';
import {FeeListComponent} from './inventory/list/feeList.component';
import {FeesComponent} from './inventory/fees.component';

export const feeRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inventory'
    },
    {
        path: 'inventory',
        component: FeesComponent,
        children: [
            {
                path: '',
                component: FeeListComponent,
                resolve: {
                    brands: InventoryBrandsResolver,
                    categories: InventoryCategoriesResolver,
                    products: InventoryProductsResolver,
                    tags: InventoryTagsResolver,
                    vendors: InventoryVendorsResolver
                }
            }
        ]
    }
];
