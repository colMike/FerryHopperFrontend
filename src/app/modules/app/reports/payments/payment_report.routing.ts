import { Route } from '@angular/router';
import { Payment_reportComponent } from 'app/modules/app/reports/payments/inventory/payment_report.component';
import { Payment_report_listComponent } from 'app/modules/app/reports/payments/inventory/list/payment_report_list.component';
import { InventoryBrandsResolver, InventoryCategoriesResolver, InventoryProductsResolver, InventoryTagsResolver, InventoryVendorsResolver } from 'app/modules/app/reports/payments/inventory/payment_report.resolvers';

export const paymentsRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'inventory'
    },
    {
        path     : 'inventory',
        component: Payment_reportComponent,
        children : [
            {
                path     : '',
                component: Payment_report_listComponent,
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
