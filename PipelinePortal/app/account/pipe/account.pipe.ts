import { Pipe, PipeTransform } from '@angular/core';
import { Account } from '../model/account';

@Pipe({name: 'acountDispPipe', pure: false})
export class AcountDispPipe implements PipeTransform {
    transform(accounts: Account[], orgId: string) {
        if (accounts) {
            return accounts.filter(account => account.organizationId == orgId);
        }
  }
}