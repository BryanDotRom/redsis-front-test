import { Pipe, PipeTransform } from '@angular/core';
import { Account } from "../models/models"; 

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(accounts: Account[], accountNumber: string): Account[] {
    if (accountNumber.length === 0) {return accounts}

    const filter = accounts.filter(acc => acc.account.toLocaleLowerCase().includes(accountNumber.toLocaleLowerCase()));

    return filter;
  }

}
