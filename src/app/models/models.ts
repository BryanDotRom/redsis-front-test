export interface Currency {
  id: number,
  name: string
}

export interface Country {
  id: number,
  name: string
}

export interface Company {
  id: number,
  name: string,
  idCountry: number,
  country: string,
  idCurrencyLocal: number,
  currencyLocal: string
}

export interface Account {
  id: number, 
  idCompany: number, 
  company: string, 
  idCountry: number, 
  country: string, 
  bank: string, 
  account: string, 
  idCurrencyLocal: number, 
  currencyLocal: string, 
  idCurrencyAccount: number, 
  currencyAccount: string, 
  idUserCreation: number, 
  userCreation: string, 
}

export interface AccountDTO{
  hasItems: boolean,
  items: Account[]
}

export interface NewAccountInfo {
  companyInfo: Company,
  countryInfo: Country,
  localCurrencyInfo: Currency,
  accountCurrencyInfo: Currency,
  newBankName: string,
  newAccount: string,
  newUserCreation: string
}