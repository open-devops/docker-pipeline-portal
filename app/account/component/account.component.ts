import { Component, OnInit } from '@angular/core';
import { HttpModule, Jsonp } from '@angular/http';
import { Organization } from '../../organization/model/organization';
import { OrganizationService } from '../../organization/service/organization.service';
import { Role } from '../../role/model/role';
import { RoleService } from '../../role/service/role.service';
import { Account } from '../model/account';
import { AccountService } from '../service/account.service';
import { ObjectService } from '../../common/service/object.service';
import { RestApiCfg } from '../../common/service/restapicfg.service';
import { RestApi } from '../../common/service/restapi.service';
import { MessageService } from '../../common/service/message.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'account',
    templateUrl: '../template/account.component.html',
    styleUrls: ['../style/account.component.css', '../../share/css/global.css'],
    providers: [
        OrganizationService,
        RoleService,
        AccountService,
        ObjectService,
        RestApiCfg,
        RestApi,
        MessageService,
        ToastsManager,
        HttpModule,
        Jsonp
    ]
})

export class AccountComponent implements OnInit {
    accounts: Account[];
    currAccount: Account;
    organizations: Organization[];
    roles: Role[];
    filterOrgId: string;
    error: any;

    constructor(
        private organizationService: OrganizationService,
        private roleService: RoleService,
        private accountService: AccountService,
        private objectService: ObjectService,
        private msgService: MessageService
    ) { }

    ngOnInit() {
        this.currAccount = new Account();
        this.filterOrgId = "";
        this.msgService.loadCfgData('app/account/config/message.json');
        this.organizationService.init()
                                 .then(res =>
                                 {
                                     this.getOrganizations();
                                 });
        this.roleService.init();
        this.accountService.init();
    }

    getOrganizations() {
        this.organizationService
            .getOrganizations()
            .then(organizations => {
                if (!organizations) {
                    this.msgService.error('acc-001');
                    this.organizations = [];
                } else {
                    this.organizations = organizations;
                    if (this.organizations.length > 0) {
                        this.filterOrgId = this.organizations[0].id;
                        this.accChange(null);
                    }
                }

            })
            .catch(error => {
                this.error = error;
                this.msgService.error('acc-001');
            });
    }

    accChange($event: any) {
        this.accounts = [];
        this.getRoles(this.filterOrgId);
        this.getAccounts(this.filterOrgId);
    }

    roleChange($event: any) {
        // this.currAccount.roleId = this.filterOrgId;
    }

    getRoles(id: string) {
        this.roleService
            .getRoles(id)
            .then(roles => {
                if (!roles) {
                    this.msgService.error('acc-002');
                    this.roles = new Array<Role>();
                } else {
                    this.roles = roles;
                }

            })
            .catch(error => {
                this.error = error;
                this.msgService.error('acc-002');
            });
    }

    getAccounts(id: string) {
        this.accountService
            .getAccounts(id)
            .then(accounts => {
                if (!accounts) {
                    this.msgService.error('acc-003');
                    this.accounts = new Array<Account>();
                } else {
                    this.accounts = accounts;
                }

            })
            .catch(error => {
                this.error = error;
                this.msgService.error('acc-003');
            });
    }

    newAccount() {
        this.currAccount = new Account();
        this.currAccount.organizationId = this.filterOrgId;
        this.currAccount.accessToken = '123456';
        this.switchModalAccount(true);
    }

    modifyAccount(account: Account, event: any) {
        this.currAccount = this.objectService.deepClone(account);
        this.switchModalAccount(true);
    }

    saveAccount(account: Account) {
        this.accountService
            .saveAccount(this.accounts, account)
            .then(accounts => {
                if (!accounts) {
                    this.msgService.error('acc-004');
                } else {
                    this.refreshData(this, accounts)
                }
            })
            .catch(error => {
                this.error = error;
                this.msgService.error('acc-004');
            });
    }

    confirmRemoveAccount(account: Account) {
        this.currAccount = account;
        this.switchModalAccount(true);
    }

    removeAccount(account: Account) {
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
