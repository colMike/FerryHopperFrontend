import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRippleModule} from '@angular/material/core';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SharedModule} from 'app/shared/shared.module';
import {UsersComponent} from 'app/modules/app/users/inventory/users.component';
import {UserListComponent} from 'app/modules/app/users/inventory/list/userList.component';
import {userRoutes} from 'app/modules/app/users/portalUser.routing';
import {FuseAddUserService} from "../../../shared/addUser";

@NgModule({
    declarations: [
        UsersComponent,
        UserListComponent
    ],
    imports: [
        RouterModule.forChild(userRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        SharedModule
    ],
    providers: [FuseAddUserService]
})
export class PortalUsersModule {
}
