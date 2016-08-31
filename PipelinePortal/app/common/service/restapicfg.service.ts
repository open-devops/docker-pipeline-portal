import { Injectable } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';

import { RestApiModel } from '../model/rest';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RestApiCfg {
    protected basePath = 'http://16.187.145.11:8600/api';
    // protected basePath = 'http://16.187.145.11:8086';
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
    
    getRestApiUrl(apiId: string) {
        let url = '';
        for (let restItem of this.restApiList) {
            if (restItem.id.toLowerCase() === apiId.toLowerCase()) {
                url = `${this.basePath}/${restItem.url}`;
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