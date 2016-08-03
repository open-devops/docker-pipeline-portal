import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Dashboard } from '../data/dashboard';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DashboardService {
    constructor(private http: Http) { }

    getDashboards(): Promise<Dashboard[]> {
        return this.http.get('app/dashboard/service/mockdata.json')
                        .toPromise()
                        .then(this.extractData)
                        .catch(this.handleError);
    }

    saveDashboard(dashboards: Dashboard[], org: Dashboard): Promise<Dashboard[]> {
        let targetOrg: Dashboard;
        
        dashboards.forEach(function (element:any) {
            if (element.id == org.id) {
                targetOrg = element;
            }
        });

        if (!targetOrg) {
            targetOrg = new Dashboard();
            targetOrg.id = 'DDC_' + dashboards.length;
            dashboards.push(targetOrg);
        } 

        targetOrg.name = org.name;
        targetOrg.orgId = org.orgId;
        targetOrg.description = org.description;

        return new Promise<Dashboard[]>(resole => resole(dashboards));

    }
    
    removeDashboard(dashboards: Dashboard[], org: Dashboard): Promise<Dashboard[]> {
        
        dashboards = dashboards.filter(function (element:any) {
            return element.id != org.id;
        });

        return new Promise<Dashboard[]>(resole => resole(dashboards));
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