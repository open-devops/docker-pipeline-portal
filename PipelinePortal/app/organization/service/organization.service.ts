import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Organization } from '../data/organization';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrganizationService {
    constructor(private http: Http) { }

    getOrganizations(): Promise<Organization[]> {
        return this.http.get('app/organization/service/mockdata.json')
                        .toPromise()
                        .then(this.extractData)
                        .catch(this.handleError);
    }

    saveOrganization(organizations: Organization[], org: Organization): Promise<Organization[]> {
        let targetOrg: Organization;
        
        organizations.forEach(function (element:any) {
            if (element.id == org.id) {
                targetOrg = element;
            }
        });

        if (!targetOrg) {
            targetOrg = new Organization();
            targetOrg.id = 'DDC_' + organizations.length;
            organizations.push(targetOrg);
        } 

        targetOrg.name = org.name;
        targetOrg.description = org.description;

        return new Promise<Organization[]>(resole => resole(organizations));

    }
    
    removeOrganization(organizations: Organization[], org: Organization): Promise<Organization[]> {
        
        organizations = organizations.filter(function (element:any) {
            return element.id != org.id;
        });

        return new Promise<Organization[]>(resole => resole(organizations));
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