import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { Permission } from '../data/permission';
import { PermissionService } from '../service/permission.service';
import { ObjectService } from '../../common/service/object.service';
import { AcountDispPipe } from '../pipe/permission.pipe';

@Component({
    moduleId: module.id,
    selector: 'permission',
    templateUrl: '../template/permission.component.html',
    styleUrls: ['../style/permission.component.css', '../../share/css/global.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        PermissionService,
        ObjectService,
        HTTP_PROVIDERS
    ],
    pipes: [AcountDispPipe]
})

export class PermissionComponent implements OnInit {
    permissions: Permission[];
    currPermission: Permission;
    organizations: any[];
    products: any[];
    pipelines: any[];
    filterOrgName: string;
    filterProdName: string;
    filterPlName: string;
    error: any;

    constructor(
        private permissionService: PermissionService,
        private objectService: ObjectService) { }

    ngOnInit() {
        this.organizations = [
            {'id': 'DDC_01', 'name': 'DDC_01'},
            {'id': 'DDC_02', 'name': 'DDC_02'},
            {'id': 'DDC_03', 'name': 'DDC_03'},
            {'id': 'DDC_04', 'name': 'DDC_04'}
        ];
        this.filterOrgName = "DDC_01";
        this.products = [
            {'id': 'DDC_PROD_01', 'name': 'DDC_PROD_01'},
            {'id': 'DDC_PROD_02', 'name': 'DDC_PROD_02'},
            {'id': 'DDC_PROD_03', 'name': 'DDC_PROD_03'},
            {'id': 'DDC_PROD_04', 'name': 'DDC_PROD_04'}
        ];
        this.filterProdName = 'DDC_PROD_01';
        this.pipelines = [
            {'id': 'DDC_PL_01', 'name': 'DDC_PL_01'},
            {'id': 'DDC_PL_02', 'name': 'DDC_PL_02'},
            {'id': 'DDC_PL_03', 'name': 'DDC_PL_03'},
            {'id': 'DDC_PL_04', 'name': 'DDC_PL_04'}
        ];
        this.filterPlName ='DDC_PL_03';
        this.currPermission = new Permission();
        this.getPermissions();
    }

    getPermissions() {
        this.permissionService
            .getPermissions()
            .then(permissions => this.permissions = permissions)
            .catch(error => this.error = error);
    }

    newPermission() {
        this.currPermission = new Permission();
        this.switchModalPermission(true);
    }

    modifyPermission(permission: Permission, event: any) {
        this.currPermission = this.objectService.deepClone(permission);
        this.switchModalPermission(true);
    }

    savePermission(permission: Permission) {
        this.permissionService
            .savePermission(this.permissions, permission)
            .then(permissions => this.refreshData(this, permissions))
            .catch(error => this.error = error);
    }

    removePermission(permission: Permission, event: any) {
        event.stopPropagation();
        this.permissionService
            .removePermission(this.permissions, permission)
            .then(permissions => this.refreshData(this, permissions))
            .catch(error => this.error = error);
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
