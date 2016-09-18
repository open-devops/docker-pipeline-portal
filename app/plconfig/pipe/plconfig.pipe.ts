import { Pipe, PipeTransform } from '@angular/core';
import { Capability } from '../data/capability';

@Pipe({name: 'plconfigAppDisplayFmt'})
export class PLConfigAppDispalyFmt implements PipeTransform {
    transform(capabilities: Capability[], group: number) {
        if (capabilities) {
            return capabilities.filter(capability => capability.dispGroup == group).sort((c1, c2) => c1.dispIndex - c2.dispIndex);
        }
  }
}