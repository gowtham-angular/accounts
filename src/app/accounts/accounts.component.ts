import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountCardComponent } from '../account-card/account-card.component';
@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, RouterModule, AccountCardComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent {

}
