import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {FuseTranslationLoaderService} from '@fuse/services/translation-loader.service';

import {locale as english} from './i18n/en';
import {locale as turkish} from './i18n/tr';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {Label, User} from "../interfaces";
import {UserService} from "../services/user.service";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {LabelService} from "../services/label.service";





@Component({
    selector: 'sample',
    templateUrl: './sample.component.html',
    styleUrls: ['./sample.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SampleComponent implements OnInit {
    users: User[] = [];
    displayedColumns: string[] = ['select', 'firstName', 'lastName', 'email', 'phone', 'company', 'jobTitle', 'actions'];

    dataSource
    selection = new SelectionModel<User>(true, []);
    defaultProfileImage = '//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png'

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {UserService} userService
     * @param {Router} router
     * @param {LabelService} labelService
     */



    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        public userService: UserService,
        private router: Router,
        public labelService: LabelService,
        private route: ActivatedRoute
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

    }

    prepareUserData(): void {
        this.userService.users.subscribe(
            (data: User[]) => {
                this.users = data;
                this.dataSource = new MatTableDataSource<User>(this.users);
                console.log(this.dataSource);
            }
        );
    }

    ngOnInit(): void {
        this.prepareUserData()

        if(this.router.url.includes('/frequently')) {
            const filteredFavoriteUsers = this.users.filter(user => user.favorite);
            this.dataSource = new MatTableDataSource<User>(filteredFavoriteUsers);
        }
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.dataSource.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: User): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

    editUser(userID: string) {
        console.log(userID)
        const navigationExtras: NavigationExtras = {
            queryParams: {
                'user': userID,
                'edit': true
            }
        };

        this.router.navigate(['new'],  navigationExtras);
    }

    favUser(user: User): void {

        this.userService.updateUser({...user, favorite: !user.favorite}, user.id).subscribe(
            (data: User) => {
                console.log(data)
            }
        );










    }

    toggleLabel(user: User, label: Label): void {

        // tslint:disable-next-line:max-line-length
        this.userService.updateUser({...user, labels: user.labels.find((l)=> l.id === label.id) ? user.labels.filter(l => l.id !== label.id) : [...user.labels, label]}, user.id).subscribe(
            (data: User) => {
                console.log(data)
            }
        );
    }
    isSelectedlabel(user: User, label: Label): boolean {
        return !!user.labels.find((l) => l.id === label.id);
    }

    clickRow(user: User) {

        const navigationExtras: NavigationExtras = {
            queryParams: {
                'user': user.id,
                'edit': false
            }
        };

        this.router.navigate(['new'],  navigationExtras);
    }
}
