import { Component, OnInit } from '@angular/core';
import { Organization } from '../../organization/model/organization';
import { OrganizationService } from '../../organization/service/organization.service';
import { Role } from '../model/role';
import { RoleService } from '../service/role.service';
import { ObjectService } from '../../common/service/object.service';
import { RestApiCfg } from '../../common/service/restapicfg.service';
import { RestApi } from '../../common/service/restapi.service';
import { MessageService } from '../../common/service/message.service';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'role',
    templateUrl: '../template/role.component.html',
    styleUrls: ['../style/role.component.css', '../../share/css/global.css'],
    providers: [
        OrganizationService,
        RoleService,
        ObjectService,
        RestApiCfg,
        RestApi,
        MessageService,
        ToastsManager
    ]
})

export class RoleComponent implements OnInit {
    roles: Role[];
    currRole: Role;
    organizations: any[];
    filterOrgId: string;
    error: any;

    constructor(
        private organizationService: OrganizationService,
        private roleService: RoleService,
        private objectService: ObjectService,
        private msgService: MessageService
    ) { }

    ngOnInit() {
        this.currRole = new Role();
        this.filterOrgId = "";
        this.msgService.loadCfgData('app/role/config/message.json');
        this.organizationService.init()
                                 .then(res =>
                                 {
                                     this.getOrganizations();
                                 });
        this.roleService.init();
    }

    getOrganizations() {
        this.organizationService
            .getOrganizations()
            .then(organizations => {
                if (!organizations) {
                    this.msgService.error('role-001');
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
                this.msgService.error('role-001');
            });
    }

    orgChange($event: any) {
        this.roles = [];
        this.getRoles(this.filterOrgId);
    }

    getRoles(id: string) {
        this.roleService
            .getRoles(id)
            .then(roles => {
                if (!roles) {
                    this.msgService.error('role-002');
                    this.roles = [];
                } else {
                    this.roles = roles;
                }

            })
            .catch(error => {
                this.error = error;
                this.msgService.error('role-002');
            });
    }

    newRole() {
        this.currRole = new Role();
        this.currRole.organizationId = this.filterOrgId;
        this.switchModalRole(true);
    }

    modifyRole(role: Role, event: any) {
        this.currRole = this.objectService.deepClone(role);
        this.switchModalRole(true);
    }

    saveRole(role: Role) {
        this.roleService
            .saveRole(this.roles, role)
            .then(roles => {
                if (!roles) {
                    this.msgService.error('role-003');
                } else {
                    this.refreshData(this, roles)
                }
            })
            .catch(error => {
                this.error = error;
                this.msgService.error('role-003');
            });
    }

    confirmRemoveRole(role: Role) {
        this.currRole = role;
        this.switchModalRole(true);
    }

    removeRole(role: Role) {
        this.roleService
            .removeRole(this.roles, role)
            .then(roles => {
                if (!roles) {
                    this.msgService.error('role-004');
                } else {
                    this.refreshData(this, roles)
                }
            })
            .catch(error => {
                this.error = error;
                this.msgService.error('role-004');
            });
    }

    private refreshData(comp: any, roles: Role[]) {
        comp.roles = roles;
        comp.switchModalRole(false)
    }

    private switchModalRole(show: boolean) {
        // if (show) {
        //     $('#modal_Role').modal('show');
        // } else {
        //     $('#modal_Role').modal('hide');
        // }
    }
}
