import { Injectable } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';

import { RestApiModel } from '../model/rest';
import { SystemConfig } from '../config/systemconfig';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RestApiCfg {
    protected baseIp = SystemConfig.apiBaseIp;
    protected basePort = SystemConfig.apiBasePort;
    protected restApiList: RestApiModel[];

    constructor(private http: Http) {
        this.loadCfgData();
    }

    loadCfgData(): Promise<any> {
        return this.http.get('app/common/config/restapi.json')
                         .toPromise()
                         .then(res => 
                         {
                             this.restApiList = res.json()
                         })
                         .catch(this.handleError);
    }
    
    getRestApiUrl(apiId: string, port?: string): string {
        let url = '';
        port = port || this.basePort;
        for (let restItem of this.restApiList) {
            if (restItem.id.toLowerCase() === apiId.toLowerCase()) {
                url = `http://${this.baseIp}:${port}/${restItem.url}`;
                break;
            }
        }
        return url;
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}