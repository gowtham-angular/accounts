import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-account-card',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './account-card.component.html',
  styleUrl: './account-card.component.scss'
})
export class AccountCardComponent {
  bankDetails = {
    name: 'John Doe',
    accountNo: '123456789',
    ifsc: 'ABCD0123456',
    bankName: 'Bank Name',
    branchCode: '001122',
    upiId: 'john.doe@upi'
  };

  downloadImage(imagePath: string) {
    const link = document.createElement('a');
    link.href = imagePath;
    link.download = imagePath.substring(imagePath.lastIndexOf('/') + 1);
    link.click();
  }

  copyBankDetails() {
    const details = `
      Name: ${this.bankDetails.name}
      Account No: ${this.bankDetails.accountNo}
      IFSC: ${this.bankDetails.ifsc}
      Bank Name: ${this.bankDetails.bankName}
      Branch Code: ${this.bankDetails.branchCode}
      UPI ID: ${this.bankDetails.upiId}
    `;
    navigator.clipboard.writeText(details).then(() => {
      alert('Bank details copied to clipboard');
    });
  }
}
