import { Injectable } from '@angular/core';

@Injectable()
export class ObjectService {
    deepClone(object: {}) {
        let objectCopy = <any>{};

        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                objectCopy[key] = (<any>object)[key];
            }
        }

        return objectCopy;
    }
}

