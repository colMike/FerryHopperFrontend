import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmationConfig} from 'app/shared/addFerry/addFerry.types';
import {FormBuilder, NgForm} from '@angular/forms';

@Component({
    selector: 'fuse-confirmation-dialog',
    templateUrl: './dialog.component.html',
    styles: [
        /* language=SCSS */
            `
            .fuse-confirmation-dialog-panel {
                @screen md {
                    @apply w-256;
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

    @ViewChild('firstName') firstName;
    @ViewChild('middleName') middleName;
    @ViewChild('surname') surname;
    @ViewChild('email') email;
    @ViewChild('documentKind') documentKind;
    @ViewChild('idNumber') idNumber;
    @ViewChild('passport') passport;

    // selectedUserForm = this._formBuilder.group({
    //     userId: [''],
    //     loginId: [''],
    //     roleId: [''],
    //     status: [''],
    //     password: [''],
    //     isConfirmed: [''],
    //     firstName: [''],
    //     middleName: [''],
    //     surname: [''],
    //     idNumber: [''],
    //     email: [''],
    //     passportNumber: [''],
    //     lastLoginDate: [''],
    //     isLoggedIn: [''],
    //     images: [''],
    //     currentImageIndex: [0],
    // });

    jsonBody: any;

    documentType = 'idCard';

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
    documentTypeChanged(value: any): any {
        this.documentType = value;
    }

    populateUserJson() {


        return {
            user: {
                'loginId': this.randomString(6),
                'roleId': 1,
                'status': 0,
                'password': 'ttyyyy',
                'isConfirmed': true,
                'firstName': this.firstName ? this.firstName.control.value: '',
                'middleName': this.middleName ? this.middleName.control.value: '',
                'surname': this.surname ? this.surname.control.value: '',
                'idNumber': this.idNumber ? this.idNumber.control.value: '',
                'email': this.email ? this.email.control.value: '',
                'passportNumber': this.passport ? this.passport.control.value: '',
                'lastLoginDate': '',
                'isLoggedIn': true
            }};
    }

    randomString(length): string {
        let result = '';
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = length; i > 0; --i) {result += chars[Math.floor(Math.random() * chars.length)];}
        return result;
    }

}
