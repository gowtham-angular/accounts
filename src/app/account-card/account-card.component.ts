import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FirestoreService } from '../firestore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-card',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './account-card.component.html',
  styleUrl: './account-card.component.scss'
})
export class AccountCardComponent {
  bankAccounts: any[] = [];

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.firestoreService.getBankAccounts().subscribe(data => {
      this.bankAccounts = data;
    });
  }

  downloadImage(imagePath: string): void {
    const link = document.createElement('a');
    link.href = imagePath;
    link.download = 'image';
    link.click();
  }

  copyBankDetails(account: any): void {
    const details = `
      Name: ${account.name}\n
      Account No: ${account.accountNo}\n
      IFSC: ${account.ifscCode}\n
      Bank Name: ${account.bankName}\n
      Branch Name: ${account.branchName}\n
      UPI Ids: ${account.upiIds.map((upi: any) => upi.upiId).join(', ')}
    `;
    navigator.clipboard.writeText(details).then(() => {
      alert('Bank details copied to clipboard');
    });
  }
}
