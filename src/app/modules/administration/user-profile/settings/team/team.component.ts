import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'settings-team',
    templateUrl    : './team.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsTeamComponent implements OnInit
{
    members: any[];
    roles: any[];

    /**
     * Constructor
     */
    constructor()
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Setup the team members
        this.members = [
            {
                avatar: 'assets/images/avatars/male-05.jpg',
                name  : 'James Mwai',
                email : 'jamesmwai@mail.org',
                role  : 'write'
            },
            {
                avatar: 'assets/images/avatars/male-05.jpg',
                name  : 'Patrick Maina',
                email : 'patrickmaina@mail.me',
                role  : 'admin'
            },
            {
                avatar: 'assets/images/avatars/male-05.jpg',
                name  : 'Paul Davies',
                email : 'paul davies@mail.ca',
                role  : 'admin'
            },
            {
                avatar: 'assets/images/avatars/male-05.jpg',
                name  : 'Michael Mbugua',
                email : 'michaelmbugua@mail.us',
                role  : 'read'
            }
        ];

        // Setup the roles
        this.roles = [
            {
                label      : 'Read',
                value      : 'read',
                description: 'Can read. They cannot add other users or perform writes or deletes'
            },
            {
                label      : 'Write',
                value      : 'write',
                description: 'Can read and write. They cannot add other users or perform deletes'
            },
            {
                label      : 'Admin',
                value      : 'admin',
                description: 'Can read, write and delete. They can also add other users'
            }
        ];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
