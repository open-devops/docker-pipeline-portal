import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Role } from '../data/role';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RoleService {
    constructor(private http: Http) { }

    getRoles(): Promise<Role[]> {
        return this.http.get('app/role/service/mockdata.json')
                        .toPromise()
                        .then(this.extractData)
                        .catch(this.handleError);
    }

    saveRole(roles: Role[], org: Role): Promise<Role[]> {
        let targetOrg: Role;
        
        roles.forEach(function (element:any) {
            if (element.id == org.id) {
                targetOrg = element;
            }
        });

        if (!targetOrg) {
            targetOrg = new Role();
            targetOrg.id = 'DDC_' + roles.length;
            roles.push(targetOrg);
        } 

        targetOrg.name = org.name;
        targetOrg.orgId = org.orgId;
        targetOrg.description = org.description;

        return new Promise<Role[]>(resole => resole(roles));

    }
    
    removeRole(roles: Role[], org: Role): Promise<Role[]> {
        
        roles = roles.filter(function (element:any) {
            return element.id != org.id;
        });

        return new Promise<Role[]>(resole => resole(roles));
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