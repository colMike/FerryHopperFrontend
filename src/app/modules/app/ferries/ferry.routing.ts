import {Route} from '@angular/router';
import {
    InventoryBrandsResolver,
    InventoryCategoriesResolver,
    InventoryProductsResolver,
    InventoryTagsResolver,
    InventoryVendorsResolver
} from 'app/modules/app/ferries/inventory/ferries.resolvers';
import {FerryListComponent} from './inventory/list/ferryList.component';
import {FerriesComponent} from './inventory/ferries.component';

export const ferryRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inventory'
    },
    {
        path: 'inventory',
        component: FerriesComponent,
        children: [
            {
                path: '',
                component: FerryListComponent,
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
