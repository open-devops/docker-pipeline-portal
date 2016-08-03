import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../data/product';

@Pipe({name: 'acountDispPipe', pure: false})
export class AcountDispPipe implements PipeTransform {
    transform(products: Product[], orgId: string) {
        if (products) {
            return products.filter(product => product.orgId == orgId);
        }
  }
}