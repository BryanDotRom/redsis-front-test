import { Component } from '@angular/core';
import { AccountsService } from './services/accounts.service';
import {
  Account,
  AccountDTO,
  Company,
  Country,
  Currency,
} from './models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'redsis-front-test';

  constructor(private accountServices: AccountsService) {}

  isLoading: boolean = true;
  searchText: string = '';

  accountList: Account[] = [];

  currencyList: Currency[] = [];
  countryList: Country[] = [];
  companyList: Company[] = [];

  showModal: boolean = false;
  selectedAccount: Account | null = null;

  async getAccounts() {
    const accountsResponse = await this.accountServices.getAccounts();

    if (accountsResponse.hasItems) {
      this.accountList = accountsResponse.items;
    }
  }

  async ngOnInit() {
    const currencies = await this.accountServices.getCurrencies();
    this.currencyList = currencies;

    const countries = await this.accountServices.getCountries();
    this.countryList = countries;

    const companies = await this.accountServices.getCompanies();
    this.companyList = companies;

    await this.getAccounts();

    this.isLoading = false;
  }

  handleSearch(value: string) {
    this.searchText = value;
  }

  handleShowModal(show: boolean) {
    this.showModal = show;
    if (!show) {
      this.selectedAccount = null;
    }
  }

  handleSelectAccount(_account: Account) {
    this.selectedAccount = _account;
    this.handleShowModal(true);
  }

  handleDeleteAccount(_account: Account) {
    this.accountServices.deleteAccount(_account.id).subscribe({
      next: (responseData) => {
        if (!responseData.error) {
          this.getAccounts();
        }
      },
    });
  }
}
