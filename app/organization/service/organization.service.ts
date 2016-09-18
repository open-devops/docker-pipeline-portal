import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Organization } from '../model/organization';
import { RestApiCfg } from '../../common/service/restapicfg.service';
import { RestApi } from '../../common/service/restapi.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrganizationService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): Promise<any> {
        return this.restApiCfg.loadCfgData();
    }

    getOrganizations(): Promise<Organization[]> {
        let url = this.restApiCfg.getRestApiUrl('organization.getAll');
        return this.restApi.get(url, undefined, undefined, undefined);
    }

    saveOrganization(organizations: Organization[], org: Organization): Promise<Organization[]> {
        // let target: Organization;
        // let newFlg: boolean;
        
        // organizations.forEach(function (element:any) {
        //     if (element.id == org.id) {
        //         target = element;
        //     }
        // });

        // if (!target) {
        //     newFlg = true;
        //     target = new Organization();
        // } 

        // target.name = org.name;
        // target.description = org.description;

        if (!org.id) {
            // Add
            let url = this.restApiCfg.getRestApiUrl('organization.add');
            return this.restApi.post(url, undefined, undefined, org)
                               .then(ret => {
                                   return this.saveData(ret, organizations)
                                });
        } else {
            // Update
            let url = this.restApiCfg.getRestApiUrl('organization.put');
            return this.restApi.put(url, undefined, undefined, org)
                               .then(ret => {
                                   return this.saveData(ret, organizations)
                                });
        }
    }
    
    removeOrganization(organizations: Organization[], org: Organization): Promise<Organization[]> {
        
        let url = this.restApiCfg.getRestApiUrl('organization.remove');
        let pathParams = [
            {
                key: 'id',
                value: org.id
            }
        ];

        return this.restApi.delete(url, pathParams, undefined, undefined)
                           .then(ret => {
                               if (ret == undefined) {
                                    return undefined;
                                }
                               return this.remoteData(org.id, organizations)
                            });
    }
    
    private saveData(org: any, organizations: Organization[]) {
        if (!org) {
            return undefined;
        }
        let isExits: boolean = false;
        
        organizations.forEach(function (element:any, index: number) {
            if (element.id == org.id) {
                isExits = true;
                organizations[index] = org;
            }
        });

        if (!isExits) {
            organizations.push(org);
        }

        return organizations;
    }

    private remoteData(id: string, organizations: Organization[]) {
        organizations = organizations.filter(function (element:any) {
            return element.id != id;
        });

        return organizations;
    }
}