import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {Subject} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';
import {CreateLabelComponent} from '../create-label/create-label.component';
import {MatDialog} from '@angular/material/dialog';
import {LabelService} from '../services/label.service';
import {uniqueId} from 'lodash';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Label} from "../interfaces";


@Component({
    selector: 'app-create-contact',
    templateUrl: './create-contact.component.html',
    styleUrls: ['./create-contact.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateContactComponent implements OnInit, OnDestroy, AfterViewInit {
    items = [1, 2, 3];
    @ViewChild('btn') btn;
    @ViewChild('profilePhoto') profilePhoto;
    currentUser: any;
    currentLabels: any;
    personalTitle: any;
    isEdit = 'true'


    checkoutForm = this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        company: [''],
        jobTitle: [''],
        email: ['', [Validators.email]],
        phone: ['', [Validators.pattern(/^\+[0-9]{6,15}$/)]],
        notes: [''],
        profilePhoto: [''],
        labels: [[]]
    });

    initialValue = this.checkoutForm.value;


    private _unsubscribeAll: Subject<any>;


    constructor(private formBuilder: FormBuilder,
                private location: Location,
                private dialog: MatDialog,
                public labelService: LabelService,
                public userService: UserService,
                private router: Router,
                private route: ActivatedRoute,
    ) {
        this._unsubscribeAll = new Subject();
    }


    goBack(): void {
        this.location.back();
    }

    createLabel(): any {
        this.dialog.open(CreateLabelComponent, {
            data: {},
            minWidth: '300px',
        }).afterClosed().subscribe(result => {
            if (result) {
                // todo replace it with an algorithm that can generate more unique id
                this.labelService.addLabel({id: uniqueId(new Date().getTime().toString()), name: result});
                const usersCurrentLabels = this.checkoutForm.value.labels;
                usersCurrentLabels.push(result);
                this.checkoutForm.patchValue({labels: usersCurrentLabels});
                this.userService.updateUser({...this.checkoutForm.value, id: this.currentUser}, this.currentUser);
            }
        });
    }

    selectLabel(label: Label): void {
        const usersCurrentLabels = this.checkoutForm.value.labels;
        const index = usersCurrentLabels.indexOf(label);
        if (index > -1) {
            usersCurrentLabels.splice(index, 1);
        } else {
            usersCurrentLabels.push(label);
        }
        this.checkoutForm.patchValue({labels: usersCurrentLabels});
        this.currentLabels = usersCurrentLabels;
    }

    selectPhoto(file): Promise<string | ArrayBuffer> {

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    handlePhotoEvent(event): void {
        this.selectPhoto(event.target.files[0]).then(data => {
            if (data) {
                this.profilePhoto.nativeElement.src = data;
                this.checkoutForm.get('profilePhoto').setValue(data);
            }
        });
    }


    ngAfterViewInit()
        : void {
        this.btn.nativeElement.disabled = true;
        if (this.checkoutForm) {
            this.checkoutForm.valueChanges
                .pipe(
                    filter(data => this.checkoutForm.valid),
                    takeUntil(this._unsubscribeAll)
                ).subscribe(((e) => {
                // deepEqual is deprecated
                if (JSON.stringify(this.initialValue) !== JSON.stringify(this.checkoutForm.value) && this.checkoutForm.valid) {
                    this.btn.nativeElement.classList.add('active');
                } else {
                    this.btn.nativeElement.classList.remove('active');
                }
            }));

        }

        this.route.queryParams.subscribe(params => {
            if (params.user) {
                this.userService.getUser(params.user).subscribe(user => {
                    this.isEdit = params.edit || 'false'

                    this.checkoutForm.patchValue(user);
                    this.currentUser = params.user;
                    this.currentLabels = user.labels
                    if (user.profilePhoto) {
                        this.profilePhoto.nativeElement.src = user.profilePhoto;
                    }
                    const inputs = Object.values(user)
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < inputs.length; i++) {
                        if (inputs[i] && typeof inputs[i] === 'string') {
                            this.personalTitle = inputs[i];
                            break;
                        }
                    }
                });
            }
        });


    }

    //



    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if(params.edit){
                this.isEdit = params.edit
            }
        }
        )
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    submit(e): void {
        e.preventDefault();

        if (this.currentUser) {
            this.userService.updateUser({
                ...this.checkoutForm.value,
                id: this.currentUser,

            }, this.currentUser).subscribe((e) => {
                console.log(e);
                this.router.navigate(['/contacts']);
            });
        } else {
            if (this.checkoutForm.valid) {
                // tslint:disable-next-line:max-line-length
                this.userService.addUser({
                    ...this.checkoutForm.value,

                    notes: [this.checkoutForm.value.notes],
                    id: new Date().getTime().toString()
                }).subscribe(() => {
                    this.router.navigate(['/sample']);
                });
            }
        }
    }

    openEdit(): void {
        this.isEdit = 'true';
    }


}
