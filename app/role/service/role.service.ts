import { Injectable } from '@angular/core';
import { Role } from '../model/role';
import { RestApiCfg } from '../../common/service/restapicfg.service';
import { RestApi } from '../../common/service/restapi.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RoleService {
    constructor(
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): Promise<any> {
        return this.restApiCfg.loadCfgData();
    }

    getRoles(orgId: string): Promise<Role[]> {
        let url = this.restApiCfg.getRestApiUrl('role.getAllByOrgId');
        let pathParams = [
            {
                key: 'organizationId',
                value: orgId
            }
        ];

        return this.restApi.get(url, pathParams, undefined, undefined);
    }

    saveRole(roles: Role[], role: Role): Promise<Role[]> {
        // let target: Role;
        // let newFlg: boolean;

        // roles.forEach(function (element:any) {
        //     if (element.id == role.id) {
        //         // target = element;
        //         newFlg = false;
        //     }
        // });

        // if (!target) {
        //     newFlg = true;
        //     target = new Role();
        // }

        // target.name = role.name;
        // target.organizationId = role.organizationId;
        // target.description = role.description;

        if (!role.id) {
            // Add
            let url = this.restApiCfg.getRestApiUrl('role.add');
            return this.restApi.post(url, undefined, undefined, role)
                               .then(ret => {
                                   return this.saveData(ret, roles);
                                });
        } else {
            // Update
            let url = this.restApiCfg.getRestApiUrl('role.put');
            return this.restApi.put(url, undefined, undefined, role)
                               .then(ret => {
                                   return this.saveData(ret, roles);
                                });
        }
    }

    removeRole(roles: Role[], role: Role): Promise<Role[]> {

        let url = this.restApiCfg.getRestApiUrl('role.remove');
        let pathParams = [
            {
                key: 'id',
                value: role.id
            }
        ];

        return this.restApi.delete(url, pathParams, undefined, undefined)
                           .then(ret => {
                               if (ret === undefined) {
                                    return undefined;
                                }
                               return this.remoteData(role.id, roles);
                            });
    }

    private saveData(role: any, roles: Role[]) {
        if (!role) {
            return undefined;
        }
        let isExits = false;

        roles.forEach(function(element: any, index: number) {
            if (element.id === role.id) {
                isExits = true;
                roles[index] = role;
            }
        });

        if (!isExits) {
            roles.push(role);
        }

        return roles;
    }

    private remoteData(id: string, roles: Role[]) {
        roles = roles.filter(function(element: any) {
            return element.id !== id;
        });

        return roles;
    }
}
