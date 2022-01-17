import {Route} from '@angular/router';
import {
    InventoryBrandsResolver,
    InventoryCategoriesResolver,
    InventoryProductsResolver,
    InventoryTagsResolver,
    InventoryVendorsResolver
} from 'app/modules/app/ferries/inventory/ferries.resolvers';
import {PortListComponent} from './inventory/list/portList.component';
import {PortsComponent} from './inventory/ports.component';

export const portRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inventory'
    },
    {
        path: 'inventory',
        component: PortsComponent,
        children: [
            {
                path: '',
                component: PortListComponent,
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
