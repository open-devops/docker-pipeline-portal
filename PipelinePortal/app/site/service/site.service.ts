import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SiteMenu } from '../data/sitemenu';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SiteService {
    constructor(private http: Http) { }

    getSiteMenus(): Promise<SiteMenu[]> {
        return this.http.get('app/site/service/mockdata.json')
                        .toPromise()
                        .then(this.extractData)
                        .catch(this.handleError);
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