import { Component, OnInit } from '@angular/core';
import { Organization } from '../../organization/model/organization';
import { OrganizationService } from '../../organization/service/organization.service';
import { ProductService } from '../../product/service/product.service';
import { Role } from '../../role/model/role';
import { RoleService } from '../../role/service/role.service';
import { Account } from '../../account/model/account';
import { AccountService } from '../../account/service/account.service';
import { Permission } from '../model/permission';
import { PermissionService } from '../service/permission.service';
import { ObjectService } from '../../common/service/object.service';
import { RestApiCfg } from '../../common/service/restapicfg.service';
import { RestApi } from '../../common/service/restapi.service';
import { MessageService } from '../../common/service/message.service';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'permission',
    templateUrl: '../template/permission.component.html',
    styleUrls: ['../style/permission.component.css', '../../share/css/global.css'],
    providers: [
        OrganizationService,
        ProductService,
        RoleService,
        AccountService,
        PermissionService,
        ObjectService,
        RestApiCfg,
        RestApi,
        MessageService,
        ToastsManager
    ]
})

export class PermissionComponent implements OnInit {
    organizations: any[];
    prodAndPL: any[];
    products: string[];
    pipelines: any[];
    accounts: Account[];
    roles: Role[];
    permissions: Permission[];
    currPermission: Permission;
    filterOrgId: string;
    filterProdName: string;
    filterPlId: string;
    error: any;

    constructor(
        private organizationService: OrganizationService,
        private productService: ProductService,
        private roleService: RoleService,
        private accountService: AccountService,
        private permissionService: PermissionService,
        private objectService: ObjectService,
        private msgService: MessageService) { }

    ngOnInit() {
        this.currPermission = new Permission();
        this.filterOrgId = "";
        this.filterProdName = '';
        this.filterPlId ='';

        this.msgService.loadCfgData('app/permission/config/message.json');
        this.organizationService.init()
                                 .then(res =>
                                 {
                                     this.getOrganizations();
                                 });
        this.productService.init();
        this.roleService.init();
        this.accountService.init();
        this.permissionService.init();
    }

    getOrganizations() {
        this.organizationService
            .getOrganizations()
            .then(organizations => {
                if (!organizations) {
                    this.msgService.error('per-001');
                    this.organizations = [];
                } else {
                    this.organizations = organizations;
                    if (this.organizations.length > 0) {
                        this.filterOrgId = this.organizations[0].id;
                        this.orgChange(null);
                    }
                }

            })
            .catch(error => {
                this.error = error;
                this.msgService.error('per-001');
            });
    }

    orgChange($event: any) {
        this.permissions = [];
        this.products = [];
        this.pipelines = [];

        this.getProdAndPL(this.filterOrgId);
        this.getRoles(this.filterOrgId);
        this.getAccounts(this.filterOrgId);
    }

    prodChange($event: any) {
        this.pipelines = this.prodAndPL[this.filterProdName];

        if (this.pipelines.length > 0) {
            this.filterPlId = this.pipelines[0].id;
            this.plChange(null);
        }
    }

    plChange($event: any) {
        this.getPermissions(this.filterPlId);
    }

    getProdAndPL(id: string) {
        this.productService
            .getProducts(id)
            .then(prodAndPL => {
                if (!prodAndPL) {
                    this.msgService.error('per-004');
                    this.products = [];
                } else {
                    this.prodAndPL = prodAndPL;
                    this.products = Object.keys(prodAndPL);

                    if (this.products.length > 0) {
                        this.filterProdName = this.products[0];
                        this.prodChange(null);
                    }
                }

            })
            .catch(error => {
                this.error = error;
                this.msgService.error('per-004');
            });
    }

    getRoles(id: string) {
        this.roleService
            .getRoles(id)
            .then(roles => {
                if (!roles) {
                    this.msgService.error('per-002');
                    this.roles = [];
                } else {
                    this.roles = roles;
                }

            })
            .catch(error => {
                this.error = error;
                this.msgService.error('per-002');
            });
    }

    getAccounts(id: string) {
        this.accountService
            .getAccounts(id)
            .then(accounts => {
                if (!accounts) {
                    this.msgService.error('per-003');
                    this.accounts = [];
                } else {
                    this.accounts = accounts;
                }

            })
            .catch(error => {
                this.error = error;
                this.msgService.error('per-003');
            });
    }

    getPermissions(id: string) {
        this.permissionService
            .getPermissions(id)
            .then(permissions => {
                if (!permissions) {
                    this.msgService.error('prod-005');
                    this.permissions = [];
                } else {
                    this.permissions = permissions;
                }

            })
            .catch(error => {
                this.error = error;
                this.msgService.error('prod-005');
            });
    }

    newPermission() {
        this.currPermission = new Permission();
        this.currPermission.organizationId = this.filterOrgId;
        this.currPermission.pipelineId = this.filterPlId;
        this.switchModalPermission(true);
    }

    modifyPermission(permission: Permission, event: any) {
        this.currPermission = this.objectService.deepClone(permission);
        this.switchModalPermission(true);
    }

    savePermission(permission: Permission) {
        this.permissionService
            .savePermission(this.permissions, permission)
            .then(permissions => {
                if (!permissions) {
                    this.msgService.error('prod-006');
                } else {
                    this.refreshData(this, permissions)
                }
            })
            .catch(error => {
                this.error = error;
                this.msgService.error('prod-006');
            });
    }

    confirmRemovePermission(permission: Permission) {
        this.currPermission = permission;
        this.switchModalPermission(true);
    }

    removePermission(permission: Permission) {
        this.permissionService
            .removePermission(this.permissions, permission)
            .then(permissions => {
                if (!permissions) {
                    this.msgService.error('prod-007');
                } else {
                    this.refreshData(this, permissions)
                }
            })
            .catch(error => {
                this.error = error;
                this.msgService.error('prod-007');
            });
    }

    private refreshData(comp: any, permissions: Permission[]) {
        comp.permissions = permissions;
        comp.switchModalPermission(false)
    }

    private switchModalPermission(show: boolean) {
        // if (show) {
        //     $('#modal_Permission').modal('show');
        // } else {
        //     $('#modal_Permission').modal('hide');
        // }
    }
}
