import { Pipe, PipeTransform } from '@angular/core';
import { Permission } from '../model/permission';

@Pipe({name: 'acountDispPipe', pure: false})
export class AcountDispPipe implements PipeTransform {
    transform(permissions: Permission[], orgName: string, prodName: string, plName: string) {
        if (permissions) {
            return permissions.filter(permission => (permission.organizationName == orgName && permission.productName == prodName && permission.pipelineName == plName));
        }
  }
}