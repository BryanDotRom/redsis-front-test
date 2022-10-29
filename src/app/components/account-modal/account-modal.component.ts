import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Account,
  Company,
  Country,
  Currency,
  NewAccountInfo,
} from 'src/app/models/models';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.css'],
})
export class AccountModalComponent implements OnInit {
  constructor(private accountServices: AccountsService) {}

  @Input('selectedAccount') selectedAccount!: Account | null;

  @Output() hanldeClose = new EventEmitter<any>();
  @Output() UpdateAccountList = new EventEmitter<void>();

  @Input('companies') companies!: Company[];
  @Input('countries') countries!: Country[];
  @Input('currencies') currencies!: Currency[];

  newAccountInfo!: NewAccountInfo;

  errorMessage: string = '';

  closeModal() {
    this.hanldeClose.emit(false);
  }

  fieldsAreEmpty(): boolean {
    const emptyFields =
      this.newAccountInfo.newBankName == '' ||
      this.newAccountInfo.newAccount == '' ||
      this.newAccountInfo.newUserCreation == '';

    if (emptyFields) {
      this.errorMessage = 'Todos los campos deben ser llenados';
    }

    return emptyFields;
  }

  cleanFields() {
    this.newAccountInfo = {
      companyInfo: this.companies[0],
      countryInfo: this.countries[0],
      localCurrencyInfo: this.currencies[0],
      accountCurrencyInfo: this.currencies[0],
      newBankName: '',
      newAccount: '',
      newUserCreation: '',
    };

    this.selectedAccount = null;
  }

  saveChanges(_createNew?: boolean) {
    this.errorMessage = '';
    if (this.fieldsAreEmpty()) {
      return;
    }

    const accoutnUpdatedInfo: Account = {
      id: this.selectedAccount ? this.selectedAccount.id : 0,
      idCompany: this.newAccountInfo.companyInfo.id,
      company: this.newAccountInfo.companyInfo.name,
      idCountry: this.newAccountInfo.countryInfo.id,
      country: this.newAccountInfo.countryInfo.name,
      bank: this.newAccountInfo.newBankName,
      account: this.newAccountInfo.newAccount,
      idCurrencyLocal: this.newAccountInfo.localCurrencyInfo.id,
      currencyLocal: this.newAccountInfo.localCurrencyInfo.name,
      idCurrencyAccount: this.newAccountInfo.accountCurrencyInfo.id,
      currencyAccount: this.newAccountInfo.accountCurrencyInfo.name,
      idUserCreation: 0,
      userCreation: this.newAccountInfo.newUserCreation,
    };

    if (this.selectedAccount) {
      this.accountServices.updateAccount(accoutnUpdatedInfo).subscribe({
        error: (errorResponse) => {
          this.errorMessage = errorResponse.error.error;
        },
        next: (responseData) => {
          this.UpdateAccountList.emit();
          if (_createNew) {
            this.cleanFields();
          } else {
            this.closeModal();
          }
        },
      });
    } else {
      this.accountServices.createAccount(accoutnUpdatedInfo).subscribe({
        error: (errorResponse) => {
          this.errorMessage = errorResponse.error.error;
        },
        next: (responseData) => {
          this.UpdateAccountList.emit();
          if (_createNew) {
            this.cleanFields();
          } else {
            this.closeModal();
          }
        },
      });
    }
  }

  ngOnInit(): void {
    this.newAccountInfo = {
      companyInfo: this.selectedAccount? this.companies.filter(company => this.selectedAccount?.idCompany == company.id)[0] : this.companies[0] ,
      countryInfo: this.selectedAccount? this.countries.filter(country => this.selectedAccount?.idCountry == country.id)[0] : this.countries[0],
      localCurrencyInfo: this.selectedAccount? this.currencies.filter(currency => this.selectedAccount?.idCurrencyLocal == currency.id)[0] : this.currencies[0],
      accountCurrencyInfo: this.selectedAccount? this.currencies.filter(currency => this.selectedAccount?.idCurrencyAccount == currency.id)[0] : this.currencies[0],
      newBankName: this.selectedAccount? this.selectedAccount.bank : '',
      newAccount: this.selectedAccount? this.selectedAccount.account : '',
      newUserCreation: this.selectedAccount? this.selectedAccount.userCreation : '',
    }; 
  }
}
