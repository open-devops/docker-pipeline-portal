import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CBConfig } from '../data/cbconfig';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CBConfigService {
    constructor(private http: Http) { }

    getCBConfigs(): Promise<CBConfig[]> {
        return this.http.get('app/cbconfig/service/mockdata.json')
                        .toPromise()
                        .then(this.extractData)
                        .catch(this.handleError);
    }

    saveCBConfig(cbconfigs: CBConfig[], org: CBConfig): Promise<CBConfig[]> {
        let targetOrg: CBConfig;
        
        cbconfigs.forEach(function (element:any) {
            if (element.id == org.id) {
                targetOrg = element;
            }
        });

        if (!targetOrg) {
            targetOrg = new CBConfig();
            targetOrg.id = 'DDC_Permissiion_' + cbconfigs.length;
            cbconfigs.push(targetOrg);
        } 

        targetOrg.id = org.id;
        targetOrg.orgName = org.orgName
        targetOrg.prodName = org.prodName;
        targetOrg.plName = org.plName;

        return new Promise<CBConfig[]>(resole => resole(cbconfigs));

    }
    
    removeCBConfig(cbconfigs: CBConfig[], org: CBConfig): Promise<CBConfig[]> {
        
        cbconfigs = cbconfigs.filter(function (element:any) {
            return element.id != org.id;
        });

        return new Promise<CBConfig[]>(resole => resole(cbconfigs));
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