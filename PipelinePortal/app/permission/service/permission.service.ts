import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Permission } from '../data/permission';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PermissionService {
    constructor(private http: Http) { }

    getPermissions(): Promise<Permission[]> {
        return this.http.get('app/permission/service/mockdata.json')
                        .toPromise()
                        .then(this.extractData)
                        .catch(this.handleError);
    }

    savePermission(permissions: Permission[], org: Permission): Promise<Permission[]> {
        let targetOrg: Permission;
        
        permissions.forEach(function (element:any) {
            if (element.id == org.id) {
                targetOrg = element;
            }
        });

        if (!targetOrg) {
            targetOrg = new Permission();
            targetOrg.id = 'DDC_Permissiion_' + permissions.length;
            permissions.push(targetOrg);
        } 

        targetOrg.id = org.id;
        targetOrg.orgName = org.orgName
        targetOrg.prodName = org.prodName;
        targetOrg.plName = org.plName;
        targetOrg.permission = org.permission;

        return new Promise<Permission[]>(resole => resole(permissions));

    }
    
    removePermission(permissions: Permission[], org: Permission): Promise<Permission[]> {
        
        permissions = permissions.filter(function (element:any) {
            return element.id != org.id;
        });

        return new Promise<Permission[]>(resole => resole(permissions));
    }

    private extractData(res: Response) {
      let body = res.json();
      body = body || [];

      if (body) {
        //   body.forEach(function (element: any) {
        //   });
      }

      return body;
    }
    
    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}