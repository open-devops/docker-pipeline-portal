import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MessageModel } from '../model/message';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MessageService {
    msgData: MessageModel[];

    constructor(
        private http: Http,
        private toastsManager: ToastsManager
    ) {
        // this.toastOptions.positionClass = 'toast-top-center';
    }

    loadCfgData(msgPath: string): Promise<any>  {

        return this.http.get(msgPath)
                         .toPromise()
                         .then(res => this.msgData = res.json())
                         .catch(this.handleError);
    }

    getMessage(id: string): MessageModel {
        let result: MessageModel;
        for (let messageItem of this.msgData) {
            if (messageItem.id.toLowerCase() === id.toLowerCase()) {
                result = messageItem;
                break;
            }
        }
        return result;
    }

    showMessage(id: string, title = '') {
        let message = this.getMessage(id) as MessageModel;
        this.showToasts(message.content, title);
    }

    showToasts(message: string, title: string) {
        this.toastsManager.error(message, title);
    }

    info(id: string) {
        let message = this.getMessage(id) as MessageModel;
        this.toastsManager.info(message.content, '');
    }

    success(id: string) {
        let message = this.getMessage(id) as MessageModel;
        this.toastsManager.success(message.content, '');
    }

    warning(id: string) {
        let message = this.getMessage(id) as MessageModel;
        this.toastsManager.warning(message.content, '');
    }

    error(id: string) {
        let message = this.getMessage(id) as MessageModel;
        this.toastsManager.error(message.content, '');
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
