import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FuseAddPortService } from 'app/shared/addPort/addPort.service';
import { FuseConfirmationDialogComponent } from 'app/shared/addPort/dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        FuseConfirmationDialogComponent
    ],
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatSelectModule,
        MatMenuModule,
        FormsModule,

        CommonModule
    ],
    providers   : [
        FuseAddPortService
    ]
})
export class FuseAddUserModule
{
    /**
     * Constructor
     */
    constructor(private _fuseConfirmationService: FuseAddPortService)
    {
    }
}
