import { Injectable } from '@angular/core';
import { Account } from '../model/account';
import { RestApiCfg } from '../../common/service/restapicfg.service';
import { RestApi } from '../../common/service/restapi.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccountService {
    constructor(
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): Promise<any> {
        return this.restApiCfg.loadCfgData();
    }

    getAccounts(orgId: string): Promise<Account[]> {
        let url = this.restApiCfg.getRestApiUrl('account.getAllByOrgId');
        let pathParams = [
            {
                key: 'organizationId',
                value: orgId
            }
        ];

        return this.restApi.get(url, pathParams, undefined, undefined);
    }

    saveAccount(accounts: Account[], acc: Account): Promise<Account[]> {
        // let targetOrg: Account;

        // accounts.forEach(function (element:any) {
        //     if (element.id == org.id) {
        //         targetOrg = element;
        //     }
        // });

        // if (!targetOrg) {
        //     targetOrg = new Account();
        //     targetOrg.id = 'DDC_' + accounts.length;
        //     accounts.push(targetOrg);
        // }

        // targetOrg.name = org.name;
        // targetOrg.organizationId = org.organizationId;
        // targetOrg.mail = org.mail;
        // targetOrg.accessToken = org.accessToken;
        // targetOrg.roleId = org.roleId;

        if (!acc.id) {
            // Add
            let url = this.restApiCfg.getRestApiUrl('account.add');
            return this.restApi.post(url, undefined, undefined, acc)
                               .then(ret => {
                                   return this.saveData(ret, accounts)
                                });
        } else {
            // Update
            let url = this.restApiCfg.getRestApiUrl('account.put');
            return this.restApi.put(url, undefined, undefined, acc)
                               .then(ret => {
                                   return this.saveData(ret, accounts)
                                });
        }

    }

    removeAccount(accounts: Account[], acc: Account): Promise<Account[]> {

        let url = this.restApiCfg.getRestApiUrl('account.remove');
        let pathParams = [
            {
                key: 'id',
                value: acc.id
            }
        ];

        return this.restApi.delete(url, pathParams, undefined, undefined)
                           .then(ret => {
                               if (ret == undefined) {
                                    return undefined;
                                }
                               return this.remoteData(acc.id, accounts)
                            });
    }

    private saveData(acc: any, accounts: Account[]) {
        if (!acc) {
            return undefined;
        }
        let isExits: boolean = false;

        accounts.forEach(function (element:any, index: number) {
            if (element.id == acc.id) {
                isExits = true;
                accounts[index] = acc;
            }
        });

        if (!isExits) {
            accounts.push(acc);
        }

        return accounts;
    }

    private remoteData(id: string, accounts: Account[]) {
        accounts = accounts.filter(function (element:any) {
            return element.id != id;
        });

        return accounts;
    }
}
