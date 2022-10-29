import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Account, AccountDTO, Company, Country, Currency } from "../models/models";

import {config} from "../config";
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  async getAccounts() {
    const response = await lastValueFrom(this.http.get<AccountDTO>(`${config.api_url}/Accounts`));
    return response;
  }

  async getCountries() {
    const response = await lastValueFrom(this.http.get<Country[]>(`${config.api_url}/Countries`));
    return response;
  }

  async getCurrencies() {
    const response = await lastValueFrom(this.http.get<Currency[]>(`${config.api_url}/Currencies`));
    return response;
  }

  async getCompanies() {
    const response = await lastValueFrom(this.http.get<Company[]>(`${config.api_url}/Companies`));
    return response;
  }

  createAccount(accountInfo: Account): Observable<any>{
    return this.http.post(`${config.api_url}/Accounts`, accountInfo);
  }

  updateAccount(accountInfo: Account): Observable<any>{
    return this.http.put(`${config.api_url}/Accounts/${accountInfo.id}`, accountInfo);
  }

  deleteAccount(accountId: number): Observable<any>{
    return this.http.delete(`${config.api_url}/Accounts/${accountId}`);
  }


  
}
