import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';
import { PipelineProvision, PipelineCapability, PipelineCapabilityConfigItem, PipelineStatus, PLOperation } from '../model/PipelineProvision';
import { RestApiCfg } from '../../common/service/restapicfg.service';
import { RestApi } from '../../common/service/restapi.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CapabilityService {
    API_PORT: string = '8700';
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): Promise<any> {
        return this.restApiCfg.loadCfgData();
    }

    getPipelineProvision(plId: string): Promise<PipelineProvision> {
        let url = this.restApiCfg.getRestApiUrl('pipeline.getByPlId', this.API_PORT);
        let pathParams = [
            {
                key: 'pipelineId',
                value: plId
            }
        ];

        return this.restApi.get(url, pathParams, undefined, undefined);
    }


    savePipelineProvision(provision: PipelineProvision): Promise<any> {
        let url = this.restApiCfg.getRestApiUrl('pipeline.save', this.API_PORT);
        let pathParams = [
            {
                key: 'pipelineId',
                value: provision.pipelineId
            }
        ];
        return this.restApi.post(url, pathParams, undefined, provision)
                            .then(ret => {
                                return ret;
                            });
    }

    getPipelineStatus(plId: string): Promise<PipelineStatus> {
        let url = this.restApiCfg.getRestApiUrl('pipeline.getStatus', this.API_PORT);
        let pathParams = [
            {
                key: 'pipelineId',
                value: plId
            }
        ];

        return this.restApi.get(url, pathParams, undefined, undefined);
    }

    plOperation(plId: string, kind: string, opeType: PLOperation): Promise<any> {
        let apiKey = this.getOpeApiKey(opeType);
        let url = this.restApiCfg.getRestApiUrl(apiKey, this.API_PORT);
        let pathParams = [
            {
                key: 'pipelineId',
                value: plId
            },
            {
                key: 'kind',
                value: kind
            }
        ];
        return this.restApi.post(url, pathParams, undefined, undefined)
                            .then(ret => {
                                return ret;
                            });
    }
    
    getOpeApiKey(opeType: PLOperation): string {
        let msgId: string;

        switch (opeType) {
            case PLOperation.StartOne:
                msgId = 'pipeline.startOne';
                break;
            case PLOperation.StopOne:
                msgId = 'pipeline.stopOne';
                break;
            case PLOperation.RestartOne:
                msgId = 'pipeline.restartOne';
                break;

            case PLOperation.StartAll:
                msgId = 'pipeline.startAll';
                break;
            case PLOperation.StopAll:
                msgId = 'pipeline.stopAll';
                break;
            case PLOperation.RestartAll:
                msgId = 'pipeline.restartAll';
                break;
        }

        return msgId;
    }
}