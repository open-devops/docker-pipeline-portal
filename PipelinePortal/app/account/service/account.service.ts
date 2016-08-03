import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Account } from '../data/account';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccountService {
    constructor(private http: Http) { }

    getAccounts(): Promise<Account[]> {
        return this.http.get('app/account/service/mockdata.json')
                        .toPromise()
                        .then(this.extractData)
                        .catch(this.handleError);
    }

    saveAccount(accounts: Account[], org: Account): Promise<Account[]> {
        let targetOrg: Account;
        
        accounts.forEach(function (element:any) {
            if (element.id == org.id) {
                targetOrg = element;
            }
        });

        if (!targetOrg) {
            targetOrg = new Account();
            targetOrg.id = 'DDC_' + accounts.length;
            accounts.push(targetOrg);
        } 

        targetOrg.name = org.name;
        targetOrg.orgId = org.orgId;
        targetOrg.email = org.email;
        targetOrg.token = org.token;
        targetOrg.role = org.role;

        return new Promise<Account[]>(resole => resole(accounts));

    }
    
    removeAccount(accounts: Account[], org: Account): Promise<Account[]> {
        
        accounts = accounts.filter(function (element:any) {
            return element.id != org.id;
        });

        return new Promise<Account[]>(resole => resole(accounts));
    }

    private extractData(res: Response) {
      let body = res.json();
      body = body || [];

      if (body) {
        //   body.forEach(function (element: any) {
        //   });
      }

      return body;
    }
    
    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}