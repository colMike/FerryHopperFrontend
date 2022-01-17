import { Route } from '@angular/router';
import { ProjectComponent } from 'app/modules/dashboard/project.component';
import { ProjectResolver } from 'app/modules/dashboard/project.resolvers';

export const projectRoutes: Route[] = [
    {
        path     : '',
        component: ProjectComponent,
        resolve  : {
            data: ProjectResolver
        }
    }
];
