import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  getBankAccounts(): Observable<any[]> {
    const bankAccountsCollection = collection(this.firestore, 'bankAccounts');
    return collectionData(bankAccountsCollection, { idField: 'id' });
  }
}
