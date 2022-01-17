import { Route } from '@angular/router';
import { SettingsComponent } from 'app/modules/administration/user-profile/settings/settings.component';

export const settingsRoutes: Route[] = [
    {
        path     : '',
        component: SettingsComponent
    }
];
