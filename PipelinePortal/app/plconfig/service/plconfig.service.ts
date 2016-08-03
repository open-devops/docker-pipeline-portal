import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';
import { Capability } from '../data/capability';
import { CapabilityTemplate } from '../data/capability-template';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CapabilityService {

    constructor(private http: Http) { }

    getCapabilities(): Promise<Capability[]> {
        return this.http.get('app/data/capabilities.json')
                        .toPromise()
                        .then(this.extractData)
                        .catch(this.handleError);
    }

    private extractData(res: Response) {
      let body = res.json();
      body = body || [];

      if (body) {
          body.forEach(function (element: any) {
              let template = CapabilityTemplate.find(template => template.id == element.id);
              element["role"] = template.role;
              element["img"] = template.img;
              element["dispGroup"] = template.dispGroup;
              element["dispIndex"] = template.dispIndex;
          });
      }

      return body;
    }
    
    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}