import { Pipe, PipeTransform } from '@angular/core';
import { Dashboard } from '../data/dashboard';

@Pipe({name: 'acountDispPipe', pure: false})
export class AcountDispPipe implements PipeTransform {
    transform(dashboards: Dashboard[], orgId: string) {
        if (dashboards) {
            return dashboards.filter(dashboard => dashboard.orgId == orgId);
        }
  }
}