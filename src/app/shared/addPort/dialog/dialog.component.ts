import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmationConfig} from 'app/shared/addPort/addPort.types';
import {FormBuilder, NgForm} from '@angular/forms';

@Component({
    selector: 'fuse-confirmation-dialog',
    templateUrl: './dialog.component.html',
    styles: [
        /* language=SCSS */
            `
            .fuse-confirmation-dialog-panel {
                @screen md {
                    @apply w-128;
                }

                .mat-dialog-container {
                    padding: 0 !important;
                }
            }
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class FuseConfirmationDialogComponent implements OnInit {

    @ViewChild('name') name;
    @ViewChild('description') description;
    @ViewChild('geolocation') geolocation;
    @ViewChild('createdBy') createdBy;
    @ViewChild('status') status;

    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: FuseConfirmationConfig,
        public matDialogRef: MatDialogRef<FuseConfirmationDialogComponent>,
        private _formBuilder: FormBuilder,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    populatePortJson() {


        return {
            port: {
                'name': this.name ? this.name.control.value: '',
                'description': this.description ? this.description.control.value: '',
                'geolocation': this.geolocation ? this.geolocation.control.value: '',
                'createdBy': 1,
                'status': this.status ? this.status.control.value: ''
            }};
    }

}
