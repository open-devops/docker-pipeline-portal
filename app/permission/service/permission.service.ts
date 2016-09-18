import { Injectable } from '@angular/core';
import { Permission } from '../model/permission';
import { RestApiCfg } from '../../common/service/restapicfg.service';
import { RestApi } from '../../common/service/restapi.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PermissionService {
    constructor(
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): Promise<any> {
        return this.restApiCfg.loadCfgData();
    }

    getPermissions(plId: string): Promise<Permission[]> {
        let url = this.restApiCfg.getRestApiUrl('permission.getByPlById');
        let pathParams = [
            {
                key: 'pipelineId',
                value: plId
            }
        ];

        return this.restApi.get(url, pathParams, undefined, undefined);
    }

    savePermission(permissions: Permission[], permission: Permission): Promise<Permission[]> {
        // let targetOrg: Permission;

        // permissions.forEach(function (element:any) {
        //     if (element.id == org.id) {
        //         targetOrg = element;
        //     }
        // });

        // if (!targetOrg) {
        //     targetOrg = new Permission();
        //     targetOrg.id = 'DDC_Permissiion_' + permissions.length;
        //     permissions.push(targetOrg);
        // }

        // targetOrg.id = org.id;
        // targetOrg.orgName = org.orgName
        // targetOrg.prodName = org.prodName;
        // targetOrg.plName = org.plName;
        // targetOrg.permission = org.permission;

        if (!permission.id) {
            // Add
            let url = this.restApiCfg.getRestApiUrl('permission.add');
            return this.restApi.post(url, undefined, undefined, permission)
                               .then(ret => {
                                   return this.saveData(ret, permissions)
                                });
        } else {
            // Update
            let url = this.restApiCfg.getRestApiUrl('permission.put');
            return this.restApi.put(url, undefined, undefined, permission)
                               .then(ret => {
                                   return this.saveData(ret, permissions)
                                });
        }

    }

    removePermission(permissions: Permission[], permission: Permission): Promise<Permission[]> {

        let url = this.restApiCfg.getRestApiUrl('permission.remove');
        let pathParams = [
            {
                key: 'id',
                value: permission.id
            }
        ];

        return this.restApi.delete(url, pathParams, undefined, undefined)
                           .then(ret => {
                               if (ret == undefined) {
                                    return undefined;
                                }
                               return this.remoteData(permission.id, permissions)
                            });
    }

    private saveData(permission: any, permissions: Permission[]) {
        if (!permission) {
            return undefined;
        }
        let isExits: boolean = false;

        permissions.forEach(function (element:any, index: number) {
            if (element.id == permission.id) {
                isExits = true;
                permissions[index] = permission;
            }
        });

        if (!isExits) {
            permissions.push(permission);
        }

        return permissions;
    }

    private remoteData(id: string, permissions: Permission[]) {
        permissions = permissions.filter(function (element:any) {
            return element.id != id;
        });

        return permissions;
    }
}
