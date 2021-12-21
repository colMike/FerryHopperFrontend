import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {LocalDataSource} from '../../../../../node_modules/ng2-smart-table';
import {AdministrationService} from '../../services/administration.service';
import {ToastrService} from '../../../../../node_modules/ngx-toastr';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {DOCUMENT} from '@angular/common';
import {Right} from '../../models/Right';

@Component({
    selector: 'app-access-control',
    templateUrl: './access-control.component.html',
    styleUrls: ['./access-control.component.css']
})
export class AccessControlComponent implements OnInit, OnDestroy {
    groups: any;
    types: any;
    res: any;
    userGroups: any = [];
    rights: any = [];
    initRights: any = [];
    userGroup: any = {};
    asignedRights = [];
    response: any = null;
    is_edit: any = false;
    editMode = false;
    rightView = false;
    rightAdd = false;
    rightEdit = false;
    rightDelete = false;
    title: string;
    button: string;
    rightId: any;
    otc: any = {};
    source: LocalDataSource;

    update = false;
    updatedRights: Right[] = [];
    originalGroupRights: Right[] = [];
    originalGroupRightsString = '';

    rightDisabled = false;
    enrollerRightNames: string[] = ['Customer Details', 'Enroll Summary'];

    // tslint:disable-next-line:max-line-length
    transactionRights: string[] = ['URA', 'Cash Deposit', 'Transaction Inquiry', 'UMEME', 'Cash Withdrawal', 'NWSC', 'GOTV', 'Funds Transfer', 'School Fees', 'Batch Account Balance Inquiry', 'Account Inquiry', 'Azam TV', 'Startimes', 'Balance Inquiry', 'Mini Statement'];

    @BlockUI() blockUI: NgBlockUI;
    settings = settings;

    constructor(private apiService: AdministrationService, private toastr: ToastrService, @Inject(DOCUMENT) private document: any) {
        this.userGroup.id = 0;
        this.userGroup.groupName = '';
        this.userGroup.groupCode = '';
        this.userGroup.createdBy = '';
        this.userGroup.active = true;
        this.source = new LocalDataSource(this.userGroups); // create the source

    }

    ngOnInit() {
        this.getGroupsAndUserRights();
        this.initUserRights();
        this.otc = JSON.parse(localStorage.getItem('otc'));
        this.rightId = this.otc.rightId;
        // console.log('right id', this.rightId);
        // this.initUserRights();
    }

    // log(userId, activity) {
    //     const log = {
    //         'userId': userId,
    //         'activity': activity
    //     };
    //     this.logs.log(log).subscribe((data) => {
    //         console.log('logged');
    //     }, error => {
    //         this.blockUI.stop();
    //         return this.toastr.error('Error logging.', 'Error!', { timeOut: 4000 });
    //     });
    // }
    initAddGroup() {
        this.initUserRights();
        this.userGroup.id = 0;
        this.userGroup.groupName = '';
        this.userGroup.groupCode = '';
        this.userGroup.active = true;
        this.editMode = true;
        this.is_edit = false;
        this.rights = this.initRights;
        this.title = 'Add user group';
        this.button = 'Add group';
    }

    initEditGroup($event) {
        // console.log('Michael Mbugua Mbugua');
        this.editMode = true;
        this.update = true;
        this.userGroup = $event.data;
        this.is_edit = true;
        // console.log('event####', $event);
        this.title = 'Edit user group';
        this.button = 'Update user group';

        this.rights = this.userGroup.rights.slice();

        this.originalGroupRights = this.rights.slice();

        // console.log('Here are the rights on edit: this.rights');
        // console.log(JSON.stringify(this.rights));
        this.originalGroupRightsString = JSON.stringify(this.rights);

        setTimeout(() => {
            this.disableTransaction('', $event);
        }, 1000);
    }

    getGroupsAndUserRights() {
        this.blockUI.start('Loading group data...');
        this.apiService.getUserGroupsAndRights().subscribe(data => {
            this.groups = data;
            // console.log(this.groups);
            this.blockUI.stop();
            if (this.groups.status === true) {
                this.userGroups = this.groups.collection;
                this.source = new LocalDataSource(this.userGroups);
            } else {
                return this.toastr.warning(this.groups.respMessage, 'Warning!', {timeOut: 4000});
            }
        }, error => {
            this.blockUI.stop();
            return this.toastr.error('Error in loading group data.', 'Error!', {timeOut: 4000});
        });
    }

    initUserRights() {
        this.apiService.getUserGroupRights().subscribe(res => {
            this.res = res;
            if (this.res.status === true) {
                this.initRights = this.res.collection;
                // console.log('this.res.collection');
                // console.log(this.res.collection);
                // console.log(JSON.stringify(this.res.collection));
            } else {
                return this.toastr.warning('No rights to assign.', 'Warning!', {timeOut: 4000});
            }
        }, error => {
            this.blockUI.stop();
            return this.toastr.error('Error in loading data.', 'Error!', {timeOut: 4000});
        });
    }

    changeGroup() {
        if (this.update) {
            this.editGroup();
        } else {
            this.addGroup();
        }
    }

    editGroup() {
        // console.log('Editing');
        this.filterModifiedRights();
    }

    addGroup() {
        if (this.userGroup.groupCode === '') {
            return this.toastr.warning('Please specify the group code', 'Alert!', {timeOut: 4000});
        } else if (this.userGroup.groupName === '') {
            return this.toastr.warning('Please specify the group name', 'Alert!', {timeOut: 4000});
        } else {
            // console.log('rights ##############################', this.rights);
            // console.log('rights ##############################', this.rights.length);
            // this.userGroup.rights = this.rights;
            for (let l = 0; l < this.rights.length; l++) {
                if (this.rights[l].allowView === true || this.rights[l].allowEdit === true
                    || this.rights[l].allowAdd === true || this.rights[l].allowDelete === true) {
                    this.asignedRights.push(this.rights[l]);
                    // console.log('assigned rights', this.asignedRights);
                }
            }
            this.userGroup.rights = this.asignedRights;
            this.userGroup.createdBy = this.rightId;
            // console.log('Right ID: ' + this.rightId);
            // console.log(this.userGroup);
            // console.log(JSON.stringify(this.userGroup));
            this.blockUI.start('Updating user group details...');
            this.apiService.addUserGroup(this.userGroup).subscribe(res => {
                this.res = res;
                if (this.res.status === false) {
                    // this.log(this.rightId, this.res.respMessage);
                    this.blockUI.stop();
                    return this.toastr.warning(this.res.respMessage, 'Alert!', {timeOut: 4000});
                }
                if (this.res.status === true) {
                    // if (this.userGroup.id === 0) {
                    //     this.log(this.rightId, 'added group ' + this.userGroup.groupName);
                    // } else {
                    //     this.log(this.rightId, 'modified group ' + this.userGroup.id);
                    // }
                    this.editMode = false;
                    this.asignedRights = [];
                    this.rights = [];
                    this.userGroup = {};
                    this.getGroupsAndUserRights();
                    this.blockUI.stop();
                    return this.toastr.success(this.res.respMessage, 'Success!', {timeOut: 4000});
                }
            }, error => {
                // this.log(this.rightId, 'server error updating user group ');
                this.blockUI.stop();
                return this.toastr.error('Error in loading data.', 'Error!', {timeOut: 4000});
            });
        }
    }

    cancel() {
        this.userGroup = {};
        this.editMode = false;
        this.rights = [];
        this.rightDisabled = false;
    }

    selectAllViewRights() {
        for (let i = 0; i < this.rights.length; i++) {
            this.rights[i].allowView = this.rightView;
        }
    }

    selectAllAddRights() {
        for (let i = 0; i < this.rights.length; i++) {
            this.rights[i].allowAdd = this.rightAdd;
        }
    }

    selectAllEditRights() {
        for (let i = 0; i < this.rights.length; i++) {
            this.rights[i].allowEdit = this.rightEdit;
        }
    }

    ngOnDestroy() {
        //
        this.userGroups = [];
        this.rights = [];
        this.initRights = [];
        this.userGroup = {};
        this.asignedRights = [];
        this.response = null;
    }

    disableTransaction(right, event) {
        // console.log('#####################CONTENT@##############');
        // console.log(right);
        // console.log(event);
        // console.log(event.target);
        // console.log(event.target.id);

        if (event.target === undefined) {

            // this.originalGroupRights = event.data['rights'];
            // console.log('JSON.stringify(this.originalGroupRights)');
            // console.log(JSON.stringify(this.originalGroupRights));
        }

        if (event.target && event.target.checked) {

            // console.log('checked');

            if (this.update) {
                const modifiedRight: Right = this.updatedRights.find(ur => right.rightName === ur.rightName);
                if (!modifiedRight) {
                    // console.log('Hakuna Modified right');
                    const addedRight: Right = new Right();
                    addedRight.rightName = right['rightName'];
                    addedRight.rightId = right['rightId'];

                    if (event.target.id.includes('view')) {
                        addedRight.allowView = true;
                    } else if (event.target.id.includes('edit')) {
                        addedRight.allowAdd = true;
                    } else if (event.target.id.includes('delete')) {
                        addedRight.allowEdit = true;
                    }


                    this.updatedRights.push(addedRight);
                    // console.log('ii ndio imeongezwa' + JSON.stringify(this.updatedRights));

                } else {
                    // console.log(modifiedRight);

                    if (event.target.id.includes('view')) {
                        modifiedRight.allowView = true;
                    } else if (event.target.id.includes('edit')) {
                        modifiedRight.allowAdd = true;
                    } else if (event.target.id.includes('delete')) {
                        modifiedRight.allowEdit = true;
                    }
                }

                // console.log(this.updatedRights);

            }
            // console.log(event.target.checked);
            // console.log(this.enrollerRightNames);
            // console.log(right.rightName)
            if (this.enrollerRightNames.includes(right.rightName)) {
                this.rightDisabled = true;
                // console.log(this.rightDisabled);
            }
        } else if (event.target && !event.target.checked) {
            // console.log('unchecked');

            if (this.update) {
                const modifiedRight: Right = this.updatedRights.find(ur => right.rightName === ur.rightName);
                if (!modifiedRight) {
                    // console.log('No Modified right');
                    const addedRight: Right = new Right();
                    addedRight.rightName = right['rightName'];
                    addedRight.rightId = right['rightId'];

                    if (event.target.id.includes('view')) {
                        addedRight.allowView = false;
                    } else if (event.target.id.includes('edit')) {
                        addedRight.allowAdd = false;
                    } else if (event.target.id.includes('delete')) {
                        addedRight.allowEdit = false;
                    }


                    this.updatedRights.push(addedRight);

                    // console.log('Added Right' + JSON.stringify(this.updatedRights));

                } else {
                    // console.log('modifiedRight..1');
                    // console.log(modifiedRight);

                    if (event.target.id.includes('view')) {
                        modifiedRight.allowView = false;
                    } else if (event.target.id.includes('edit')) {
                        modifiedRight.allowAdd = false;
                    } else if (event.target.id.includes('delete')) {
                        modifiedRight.allowEdit = false;
                    }
                }

                // console.log('this.updatedRights..1');
                // console.log(this.updatedRights);
            }

        } else {
            // console.log(event.target.checked);
            const checkBockses: any[] = [
                this.document.getElementById('5view'),
                this.document.getElementById('5edit'),
                this.document.getElementById('5delete'),
                this.document.getElementById('7view'),
                this.document.getElementById('7edit'),
                this.document.getElementById('7delete'),
            ];
            // tslint:disable-next-line:no-shadowed-variable
            const checkBox = checkBockses.find(checkBox => checkBox.checked);
            if (checkBox && checkBox.checked) {
                this.rightDisabled = true;
            } else {
                this.rightDisabled = false;
            }
        }
    }

    filterModifiedRights() {

        // Can be returned for debugging
        // console.log('this.updatedRights');
        // console.log(this.updatedRights);
        //
        // console.log('this.originalGroupRights');
        // console.log(this.originalGroupRightsString);

        for (const updatedRight of this.updatedRights) {

            const pastRights = JSON.parse(this.originalGroupRightsString);
            const currentRight = pastRights.find(r => r.rightName === updatedRight.rightName);

            // Can be returned for debugging
            // console.log('Rights Original Before any Change');
            // console.log(currentRight);
            // console.log('UpdatedRights to crosscheck with.');
            // console.log(updatedRight);


            if (updatedRight.allowAdd === currentRight.allowAdd) {
                // console.log(`${updatedRight.allowAdd} === ${currentRight.allowAdd}`);
                updatedRight.allowAdd = null;
            }
            if (updatedRight.allowEdit === currentRight.allowEdit) {
                // console.log(`${updatedRight.allowEdit} === ${currentRight.allowEdit}`);
                updatedRight.allowEdit = null;
            }
            if (updatedRight.allowView === currentRight.allowView) {
                // console.log(`${updatedRight.allowView} === ${currentRight.allowView}`);
                updatedRight.allowView = null;
            }
        }

        // tslint:disable-next-line:max-line-length
        const cleanedUpdatedRights = this.updatedRights.filter(ur => ur.allowAdd !== null && ur.allowEdit !== null && ur.allowView !== null);

        // console.log('updatedRights after cleanup.....');
        // console.log(cleanedUpdatedRights);

        const userGroupWhileEditing = this.userGroup;
        // console.log(userGroupWhileEditing);

        userGroupWhileEditing.rights = cleanedUpdatedRights;

        if (cleanedUpdatedRights.length !== 0) {
            this.blockUI.start('Updating user group details...');
            this.apiService.editUserGroup(userGroupWhileEditing).subscribe(res => {
                this.res = res;
                if (this.res.status === false) {
                    this.blockUI.stop();
                    return this.toastr.warning(this.res.respMessage, 'Alert!', {timeOut: 4000});
                }
                if (this.res.status === true) {

                    this.editMode = false;
                    this.asignedRights = [];
                    this.rights = [];
                    this.userGroup = {};

                    this.updatedRights = [];
                    this.update = false;

                    this.getGroupsAndUserRights();
                    this.blockUI.stop();
                    return this.toastr.success('Your changes will be reflected once they have been approved', 'Success!', {timeOut: 4000});
                }
            }, error => {
                // this.log(this.rightId, 'server error updating user group ');
                this.blockUI.stop();
                return this.toastr.error('Error in loading data.', 'Error!', {timeOut: 4000});
            });
        } else {
            return this.toastr.error('You have not made any changes on Roles.', 'Warning', {timeOut: 4000});
        }

    }
}

export let settings = {
    mode: 'external',
    actions: {
        delete: false,
        position: 'right',
    },
    columns: {
        id: {
            title: '#',
            filter: false
        },
        groupCode: {
            title: 'Code',
            filter: true
        },
        groupName: {
            title: 'Name',
            filter: true
        }
    },
    edit: {
        // tslint:disable-next-line:max-line-length
        editButtonContent: '<a class="btn btn-block btn-outline-success m-r-10" (click)="update=true"> <i class="fas fa-check-circle text-info-custom"></i></a>',
        saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
        cancelButtonContent: '<i class="ti-close text-danger"></i>'
    },
    add: {
        // tslint:disable-next-line:max-line-length
        addButtonContent: '<a class="btn btn-block btn-outline-info m-r-10"> <i class="fas fa-plus-circle"></i></a>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
    },
};
