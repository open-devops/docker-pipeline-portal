import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { Account } from '../data/account';
import { AccountService } from '../service/account.service';
import { ObjectService } from '../../common/service/object.service';
import { AcountDispPipe } from '../pipe/account.pipe';

@Component({
    moduleId: module.id,
    selector: 'account',
    templateUrl: '../template/account.component.html',
    styleUrls: ['../style/account.component.css', '../../share/css/global.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        AccountService,
        ObjectService,
        HTTP_PROVIDERS
    ],
    pipes: [AcountDispPipe]
})

export class AccountComponent implements OnInit {
    accounts: Account[];
    currAccount: Account;
    organizations: any[];
    filterOrgId: string;
    error: any;

    constructor(
        private accountService: AccountService,
        private objectService: ObjectService) { }

    ngOnInit() {
        this.organizations = [
            {'id': 'DDC_01', 'name': 'DDC_01'},
            {'id': 'DDC_02', 'name': 'DDC_02'},
            {'id': 'DDC_03', 'name': 'DDC_03'},
            {'id': 'DDC_04', 'name': 'DDC_04'}
        ];
        this.filterOrgId = "DDC_01";
        this.currAccount = new Account();
        this.getAccounts();
    }

    getAccounts() {
        this.accountService
            .getAccounts()
            .then(accounts => this.accounts = accounts)
            .catch(error => this.error = error);
    }

    newAccount() {
        this.currAccount = new Account();
        this.switchModalAccount(true);
    }

    modifyAccount(account: Account, event: any) {
        this.currAccount = this.objectService.deepClone(account);
        this.switchModalAccount(true);
    }

    saveAccount(account: Account) {
        this.accountService
            .saveAccount(this.accounts, account)
            .then(accounts => this.refreshData(this, accounts))
            .catch(error => this.error = error);
    }

    removeAccount(account: Account, event: any) {
        event.stopPropagation();
        this.accountService
            .removeAccount(this.accounts, account)
            .then(accounts => this.refreshData(this, accounts))
            .catch(error => this.error = error);
    }

    private refreshData(comp: any, accounts: Account[]) {
        comp.accounts = accounts;
        comp.switchModalAccount(false)
    }

    private switchModalAccount(show: boolean) {
        // if (show) {
        //     $('#modal_Account').modal('show');
        // } else {
        //     $('#modal_Account').modal('hide');
        // }
    }
}
