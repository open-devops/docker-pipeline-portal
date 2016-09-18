import { Pipe, PipeTransform } from '@angular/core';
import { CBConfig } from '../data/cbconfig';

@Pipe({name: 'cbConfigDispPipe', pure: false})
export class CBConfigDispPipe implements PipeTransform {
    transform() {
  }
}