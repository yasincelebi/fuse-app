import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { SampleComponent } from './sample.component';
import {CreateContactComponent} from "../create-contact/create-contact.component";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";

const routes = [
    {
        path     : 'sample',
        component: SampleComponent
    },
    {
        path: 'frequently',
        component: SampleComponent
    },
    {
        path: 'new',
        component: CreateContactComponent
    }
];

@NgModule({
    declarations: [
        SampleComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,
        MatTableModule,
        MatCheckboxModule,
        MatListModule,
        MatIconModule,
        MatMenuModule
    ],
    exports     : [
        SampleComponent
    ]
})

export class SampleModule
{
}
