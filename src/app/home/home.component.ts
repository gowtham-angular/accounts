import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, MaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  bankAccountForm: FormGroup;
  image1Url: string | null = null;
  image2Url: string | null = null;

  constructor(
    private fb: FormBuilder,
    private storage: Storage,
    private firestore: Firestore
  ) {
    this.bankAccountForm = this.fb.group({
      name: ['', Validators.required],
      accountNo: ['', Validators.required],
      bankName: ['', Validators.required],
      ifscCode: ['', Validators.required],
      branchName: ['', Validators.required],
      upiIds: this.fb.array([this.createUpiIdGroup()])
    });
  }

  createUpiIdGroup(): FormGroup {
    return this.fb.group({
      upiId: ['', Validators.required]
    });
  }

  get upiIds(): FormArray {
    return this.bankAccountForm.get('upiIds') as FormArray;
  }

  addUpiId(): void {
    this.upiIds.push(this.createUpiIdGroup());
  }

  removeUpiId(index: number): void {
    this.upiIds.removeAt(index);
  }

  onImageUpload(event: Event, imageSlot: 'image1' | 'image2'): void {
    const file = (event.target as HTMLInputElement).files![0];
    const filePath = `images/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    uploadBytes(storageRef, file).then(snapshot => {
      getDownloadURL(snapshot.ref).then(url => {
        if (imageSlot === 'image1') {
          this.image1Url = url;
        } else {
          this.image2Url = url;
        }
      });
    });
  }

  removeImage(imageSlot: 'image1' | 'image2'): void {
    if (imageSlot === 'image1') {
      this.image1Url = null;
    } else {
      this.image2Url = null;
    }
  }

  onSubmit(): void {
    if (this.bankAccountForm.valid) {
      const formValue = { ...this.bankAccountForm.value, image1Url: this.image1Url, image2Url: this.image2Url };
      addDoc(collection(this.firestore, 'bankAccounts'), formValue).then(() => {
        console.log('Form submitted successfully!');
        this.bankAccountForm.reset();
      }).catch(error => {
        console.error('Error submitting form: ', error);
      });
    }
  }
}
