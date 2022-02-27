import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
    selector: 'app-create-label',
    templateUrl: './create-label.component.html',
    styleUrls: ['./create-label.component.scss']
})
export class CreateLabelComponent implements OnInit {

    labelForm: FormGroup
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CreateLabelComponent>, private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.createForm();
    }

    createForm():void {
        this.labelForm = this.fb.group({
            label: ['', Validators.required ]
        });
    }

    close(): void {
        this.dialogRef.close();
    }

    save(): void {
        this.labelForm.controls['label'].markAsTouched();
        if(this.labelForm.valid) {
            this.dialogRef.close(this.labelForm.get('label').value);
        }

    }

}
