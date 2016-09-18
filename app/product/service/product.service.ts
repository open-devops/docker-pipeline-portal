import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { RestApiCfg } from '../../common/service/restapicfg.service';
import { RestApi } from '../../common/service/restapi.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {
    constructor(
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): Promise<any> {
        return this.restApiCfg.loadCfgData();
    }

    getProducts(orgId: string): Promise<any[]> {
        let url = this.restApiCfg.getRestApiUrl('prod.getAllByOrgId');
        let pathParams = [
            {
                key: 'organizationId',
                value: orgId
            }
        ];

        return this.restApi.get(url, pathParams, undefined, undefined);
    }

    saveProduct(products: Product[], prod: Product): Promise<Product[]> {
        // let targetOrg: Product;

        // products.forEach(function (element:any) {
        //     if (element.id == org.id) {
        //         targetOrg = element;
        //     }
        // });

        // if (!targetOrg) {
        //     targetOrg = new Product();
        //     targetOrg.id = 'DDC_' + products.length;
        //     products.push(targetOrg);
        // }

        // targetOrg.name = org.name;
        // targetOrg.orgId = org.orgId;
        // targetOrg.description = org.description;
        // targetOrg.plName = org.plName;
        // targetOrg.plDescription = org.plDescription;

        if (!prod.id) {
            // Add
            let url = this.restApiCfg.getRestApiUrl('prod.add');
            return this.restApi.post(url, undefined, undefined, prod)
                               .then(ret => {
                                   return this.saveData(ret, products);
                                });
        } else {
            // Update
            let url = this.restApiCfg.getRestApiUrl('prod.put');
            return this.restApi.put(url, undefined, undefined, prod)
                               .then(ret => {
                                   return this.saveData(ret, products);
                                });
        }

    }

    removeProduct(products: Product[], prod: Product): Promise<Product[]> {

        let url = this.restApiCfg.getRestApiUrl('prod.remove');
        let pathParams = [
            {
                key: 'id',
                value: prod.id
            }
        ];

        return this.restApi.delete(url, pathParams, undefined, undefined)
                           .then(ret => {
                               if (ret === undefined) {
                                    return undefined;
                                }
                               return this.remoteData(prod.id, products);
                            });
    }

    private saveData(prod: any, products: Product[]) {
        if (!prod) {
            return undefined;
        }
        let isExits = false;

        products.forEach(function (element: any, index: number) {
            if (element.id === prod.id) {
                isExits = true;
                products[index] = prod;
            }
        });

        if (!isExits) {
            products.push(prod);
        }

        return products;
    }

    private remoteData(id: string, products: Product[]) {
        products = products.filter(function(element: any) {
            return element.id !== id;
        });

        return products;
    }
}
