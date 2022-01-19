import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboard'
    {path: '', pathMatch : 'full', redirectTo: 'dashboard'},

    // Redirect signed in user to the '/dashboard'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboard'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },


    // Admin routes
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'dashboard', loadChildren: () => import('app/modules/dashboard/project.module').then(m => m.ProjectModule)},

            // Apps
            {path: 'apps', children: [

                    {path: 'customer', loadChildren: () => import('app/modules/app/customers/customer.module').then(m => m.CustomerModule)},
                    {path: 'portal-user', loadChildren: () => import('app/modules/app/users/portalUsers.module').then(m => m.PortalUsersModule)},
                    {path: 'ferries', loadChildren: () => import('app/modules/app/ferries/ferry.module').then(m => m.FerryModule)},
                    {path: 'ports', loadChildren: () => import('app/modules/app/ports/port.module').then(m => m.PortModule)},
                    {path: 'settings', loadChildren: () => import('app/modules/administration/user-profile/settings/settings.module').then(m => m.SettingsModule)},
                    {path: 'access-control', loadChildren: () => import('app/modules/administration/access-control/access-control.module').then(m => m.AccessControlModule)},
                ]},

            // Reports
            {path: 'reports', children: [
                    {path: 'payments', loadChildren: () => import('app/modules/app/reports/payments/payment_report.module').then(m => m.Payment_reportModule)},
                    {path: 'transactions', loadChildren: () => import('app/modules/app/users/portalUsers.module').then(m => m.PortalUsersModule)},
                    {path: 'trips', loadChildren: () => import('app/modules/app/ferries/ferry.module').then(m => m.FerryModule)},
                ]},

        ]
    }
];
