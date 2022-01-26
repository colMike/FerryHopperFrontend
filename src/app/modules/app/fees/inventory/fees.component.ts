import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'inventory',
    templateUrl    : './fees.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeesComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
