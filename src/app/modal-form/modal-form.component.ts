import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { onlyLettersValidator } from '../validators/only-letters.directive';
import { phoneValidator } from '../validators/phone.directive';
import { zipValidator } from '../validators/zip.directive';
import { addRow } from '../table/table.actions';

import { AppState } from '../app.state';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.sass'],
})
export class ModalFormComponent {
  dataForm = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    firstName: new FormControl('', [
      Validators.required,
      onlyLettersValidator(),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      onlyLettersValidator(),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, phoneValidator()]),
    description: new FormControl(''),
    address: new FormGroup({
      streetAddress: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required, zipValidator()]),
    }),
  });

  onSubmit() {
    this.store.dispatch(addRow(this.dataForm.value));
    console.log(this.dataForm.value);
  }

  constructor(private modalService: NgbModal, private store: Store<AppState>) {}

  open(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    });
  }
}
