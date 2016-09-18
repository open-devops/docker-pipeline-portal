import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../model/role';

@Pipe({name: 'acountDispPipe', pure: false})
export class AcountDispPipe implements PipeTransform {
    transform(roles: Role[], orgId: string) {
        if (roles) {
            return roles.filter(role => role.organizationId == orgId);
        }
  }
}