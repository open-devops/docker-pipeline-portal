import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { Role } from '../data/role';
import { RoleService } from '../service/role.service';
import { ObjectService } from '../../common/service/object.service';
import { AcountDispPipe } from '../pipe/role.pipe';

@Component({
    moduleId: module.id,
    selector: 'role',
    templateUrl: '../template/role.component.html',
    styleUrls: ['../style/role.component.css', '../../share/css/global.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        RoleService,
        ObjectService,
        HTTP_PROVIDERS
    ],
    pipes: [AcountDispPipe]
})

export class RoleComponent implements OnInit {
    roles: Role[];
    currRole: Role;
    organizations: any[];
    filterOrgId: string;
    error: any;

    constructor(
        private roleService: RoleService,
        private objectService: ObjectService) { }

    ngOnInit() {
        this.organizations = [
            {'id': 'DDC_01', 'name': 'DDC_01'},
            {'id': 'DDC_02', 'name': 'DDC_02'},
            {'id': 'DDC_03', 'name': 'DDC_03'},
            {'id': 'DDC_04', 'name': 'DDC_04'}
        ];
        this.filterOrgId = "DDC_01";
        this.currRole = new Role();
        this.getRoles();
    }

    getRoles() {
        this.roleService
            .getRoles()
            .then(roles => this.roles = roles)
            .catch(error => this.error = error);
    }

    newRole() {
        this.currRole = new Role();
        this.switchModalRole(true);
    }

    modifyRole(role: Role, event: any) {
        this.currRole = this.objectService.deepClone(role);
        this.switchModalRole(true);
    }

    saveRole(role: Role) {
        this.roleService
            .saveRole(this.roles, role)
            .then(roles => this.refreshData(this, roles))
            .catch(error => this.error = error);
    }

    removeRole(role: Role, event: any) {
        event.stopPropagation();
        this.roleService
            .removeRole(this.roles, role)
            .then(roles => this.refreshData(this, roles))
            .catch(error => this.error = error);
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
