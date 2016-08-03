import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Product } from '../data/product';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {
    constructor(private http: Http) { }

    getProducts(): Promise<Product[]> {
        return this.http.get('app/product/service/mockdata.json')
                        .toPromise()
                        .then(this.extractData)
                        .catch(this.handleError);
    }

    saveProduct(products: Product[], org: Product): Promise<Product[]> {
        let targetOrg: Product;
        
        products.forEach(function (element:any) {
            if (element.id == org.id) {
                targetOrg = element;
            }
        });

        if (!targetOrg) {
            targetOrg = new Product();
            targetOrg.id = 'DDC_' + products.length;
            products.push(targetOrg);
        } 

        targetOrg.name = org.name;
        targetOrg.orgId = org.orgId;
        targetOrg.description = org.description;
        targetOrg.plName = org.plName;
        targetOrg.plDescription = org.plDescription;

        return new Promise<Product[]>(resole => resole(products));

    }
    
    removeProduct(products: Product[], org: Product): Promise<Product[]> {
        
        products = products.filter(function (element:any) {
            return element.id != org.id;
        });

        return new Promise<Product[]>(resole => resole(products));
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