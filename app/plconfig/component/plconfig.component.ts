import { Component, OnInit } from '@angular/core';
import { Organization } from '../../organization/model/organization';
import { OrganizationService } from '../../organization/service/organization.service';
import { ProductService } from '../../product/service/product.service';
import { PipelineProvision, PipelineCapability, PipelineCapabilityConfigItem, PipelineStatus, PLOperation, CapabilityStatus } from '../model/PipelineProvision';
import * as CapTemplate from '../model/capability-template';
import { CapabilityService } from '../service/plconfig.service';
import { ObjectService } from '../../common/service/object.service';
import { RestApiCfg } from '../../common/service/restapicfg.service';
import { RestApi } from '../../common/service/restapi.service';
import { MessageService } from '../../common/service/message.service';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'pl-config',
    templateUrl: '../template/plconfig.component.html',
    styleUrls: ['../style/plconfig.component.css', '../../share/css/global.css'],
    providers: [
        OrganizationService,
        ProductService,
        CapabilityService,
        ObjectService,
        RestApiCfg,
        RestApi,
        MessageService,
        ToastsManager
    ]
})

export class PLConfigComponent implements OnInit{
    organizations: any[];
    prodAndPL: any[];
    products: string[];
    pipelines: any[];

    pipelineProvision: PipelineProvision;
    capabilities: PipelineCapability[];
    plConfigStatus: number = 0;    //0:none, 1:creating, 2:done

    filterOrgId: string;
    filterProdName: string;
    filterPlId: string;

    currCapability: PipelineCapability;
    currConfigs: PipelineCapabilityConfigItem[];
    selectOptions: any[];

    error: any;

    constructor(
        private organizationService: OrganizationService,
        private productService: ProductService,
        private capabilityService: CapabilityService,
        private objectService: ObjectService,
        private msgService: MessageService) { }

    // Initialization
    ngOnInit() {
        this.filterOrgId = "";
        this.filterProdName = '';
        this.filterPlId ='';

        this.currCapability = new PipelineCapability();


        this.msgService.loadCfgData('app/plconfig/config/message.json');
        this.organizationService.init()
                                 .then(res =>
                                 {
                                     this.getOrganizations();
                                 });
    }

    // Filter Change Event
    orgChange($event: any) {
        this.products = [];
        this.pipelines = [];

        this.getProdAndPL(this.filterOrgId);
    }

    prodChange($event: any) {
        this.pipelines = this.prodAndPL[this.filterProdName];

        if (this.pipelines.length > 0) {
            this.filterPlId = this.pipelines[0].id;
            this.plChange(null);
        }
    }

    plChange($event: any) {
        this.pipelineProvision = null;
        this.capabilities = null;
        this.plConfigStatus = 0;
        this.getPipelineProvision(this.filterPlId);
    }

    // Get Data From Server
    getOrganizations() {
        this.organizationService
            .getOrganizations()
            .then(organizations => {
                if (!organizations) {
                    this.msgService.error('pl-001');
                    this.organizations = [];
                } else {
                    this.organizations = organizations;
                    if (this.organizations.length > 0) {
                        this.filterOrgId = this.organizations[0].id;
                        this.orgChange(null);
                    }
                }

            })
            .catch(error => {
                this.error = error;
                this.msgService.error('pl-001');
            });
    }

    getProdAndPL(id: string) {
        this.productService
            .getProducts(id)
            .then(prodAndPL => {
                if (!prodAndPL) {
                    this.msgService.error('pl-002');
                    this.products = [];
                } else {
                    this.prodAndPL = prodAndPL;
                    this.products = Object.keys(prodAndPL);

                    if (this.products.length > 0) {
                        this.filterProdName = this.products[0];
                        this.prodChange(null);
                    }
                }

            })
            .catch(error => {
                this.error = error;
                this.msgService.error('pl-002');
            });
    }

    getPipelineProvision(pipelineId: string) {
        this.capabilityService
            .getPipelineProvision(pipelineId)
            .then( pipelineProvision => {
                    if (!pipelineProvision) {
                        this.msgService.error('pl-003');
                        this.pipelineProvision = new PipelineProvision();
                        this.pipelineProvision.pipelineId = this.filterPlId;
                    } else {
                        if (pipelineProvision.capabilities && pipelineProvision.capabilities.length > 0) {
                            this.pipelineProvision = pipelineProvision;
                            this.formatCapability(this.pipelineProvision.capabilities);
                            this.capabilities = this.pipelineProvision.capabilities;
                            this.getPipelineStatus(pipelineId);
                            this.plConfigStatus = 2;
                        } else {
                            this.pipelineProvision = new PipelineProvision();
                            this.pipelineProvision.pipelineId = this.filterPlId;
                            this.plConfigStatus = 0;
                        }
                    }
            })
            .catch(error => {
                this.error = error;
                this.msgService.error('pl-003');
            });
    }

    formatCapability(capabilities: PipelineCapability[]) {
        capabilities.forEach((element, index) => {

            // Capability Provider Info
            for (let i=0; i<CapTemplate.SelectOptions.length; i++) {
                let capKind = CapTemplate.SelectOptions[i];
                if (element.kind == capKind.kind) {
                    capabilities[index].providerName = capabilities[index].provider;
                    capabilities[index].class = PLConfigComponent.calcClass(capKind.dispWidth);
                    capabilities[index].description = capKind.description;

                    // Capability Selectable Providers Info
                    capKind.selectOptions.forEach(opt => {
                        if (capabilities[index].provider == opt.name) {
                            capabilities[index].url = opt.url;
                            capabilities[index].img = opt.img;
                            capabilities[index].configItems = capabilities[index].configItems || [];

                            // Capability Provider Config Items Info
                            if (capabilities[index].configItems.length > 0 && opt.configItems.length > 0) {
                                // Already has existing data, set usefull data from config item template
                                capabilities[index].configItems.forEach((item, itemIndex) => {
                                    opt.configItems.forEach(cfgItem => {
                                        if (item.name == cfgItem.id) {
                                            capabilities[index].configItems[itemIndex]['template'] = cfgItem;
                                        }
                                    });
                                });
                            } else if (capabilities[index].configItems.length == 0 && opt.configItems.length > 0) {
                                // There is no existing data, copy data from config item temeplate
                                opt.configItems.forEach(cfgItem => {
                                    let newItem = new PipelineCapabilityConfigItem();
                                    newItem.kind = cfgItem.kind;
                                    newItem.name = cfgItem.id;
                                    newItem['template'] = cfgItem;

                                    capabilities[index].configItems.push(newItem);
                                })
                            }


                        }
                    });
                    break;
                }
            }
        });
    }

    getPipelineStatus(pipelineId: string) {
        this.capabilityService
            .getPipelineStatus(pipelineId)
            .then( ret => {
                    if (!ret) {
                        this.msgService.error('pl-011');
                        this.plConfigStatus = 2;
                    } else {
                        this.updatePipelineStatus(ret);
                        this.plConfigStatus = 2;
                    }
            })
            .catch( error => {
                this.error = error;
                this.msgService.error('pl-011');
            });
    }

    newPipeline() {
        this.plConfigStatus = 1;
        this.pipelineProvision.capabilities = [];
        this.capabilities = this.pipelineProvision.capabilities;

        this.initPipeline(0);
    }

    initPipeline(index: number) {
        if (index >= CapTemplate.SelectOptions.length) {
            return;
        }

        let element = CapTemplate.SelectOptions[index++];

        let capability = new PipelineCapability();
        capability.kind = element.kind;
        capability.class = PLConfigComponent.calcClass(element.dispWidth);
        capability.driver = 'Docker';
        capability.description = element.description;

        this.capabilities.push(capability);

        setTimeout(() => {
            this.initPipeline(index);
        }, 200);
    }

    private static calcClass(width: number): string {
        let classStr: string = 'col-lg-3';
        switch(width) {
            case 1:
                classStr = 'col-lg-3';
                break;
            case 2:
                classStr = 'col-lg-6';
                break;
            case 3:
                classStr = 'col-lg-9';
                break;
            case 4:
                classStr = 'col-lg-12';
                break;
        }
        return classStr;
    }

    addCapability(capability: PipelineCapability) {
        this.currCapability = this.objectService.deepClone(capability);

        CapTemplate.SelectOptions.forEach(element => {
            if (element.kind == capability.kind) {
                this.selectOptions = element.selectOptions;
            }
        });
    }

    saveCapability(capability: PipelineCapability) {
        this.selectOptions.forEach(element => {
            if (element.id == capability.provider) {
                capability.img = element.img;
                capability.providerName = element.name;

                let configItems: any[] = element.configItems;
                if (configItems) {
                    configItems.forEach(cfgItem => {
                        let newItem = new PipelineCapabilityConfigItem();
                        newItem.kind = cfgItem.kind;
                        newItem.name = cfgItem.id;
                        newItem['template'] = cfgItem;

                        capability.configItems.push(newItem);
                    });
                }

            }
        });

        this.capabilities.forEach((element, index) => {
            if (element.kind == capability.kind) {
                this.capabilities[index] = capability;
            }
        });
    }

    configCapability(capability: PipelineCapability) {
        this.currCapability = capability;
        this.currConfigs = [];
        if (capability.configItems) {
            capability.configItems.forEach(element => {
                this.currConfigs.push(this.objectService.deepClone(element));
            });
        }
    }

    saveConfig(configItems: PipelineCapabilityConfigItem[]) {
        this.currCapability.configItems = configItems;
    }

    savePipeline() {
        this.capabilityService
            .savePipelineProvision(this.pipelineProvision)
            .then( ret => {
                    if (!ret) {
                        this.msgService.error('pl-004');
                        // this.pipelineProvision = new PipelineProvision();
                    } else {
                        this.getPipelineStatus(this.pipelineProvision.pipelineId);
                        this.plConfigStatus = 2;
                    }
            })
            .catch(error => {
                this.error = error;
                this.msgService.error('pl-004');
            });
    }

    // showCapabilityPage(capability: PipelineCapability) {

    // }

    confirmRemoveCapability(capability: PipelineCapability) {
        this.currCapability = capability;
    }

    removeCapability(capability: PipelineCapability) {
        this.capabilities.forEach((element, index) => {
            if (element.kind == capability.kind) {
                this.capabilities[index].provider = '';
                this.capabilities[index].providerName = '';
                this.capabilities[index].img = '';
                if (this.capabilities[index].configItems) {
                    this.capabilities[index].configItems.length = 0;
                }
            }
        });
    }

    // Pipeline Operations
    startOne(capability: PipelineCapability) {
        this.plOperation(capability.kind, PLOperation.StartOne);
    }
    stopOne(capability: PipelineCapability) {
        this.plOperation(capability.kind, PLOperation.StopOne);
    }
    restartOne(capability: PipelineCapability) {
        this.plOperation(capability.kind, PLOperation.RestartOne);
    }
    startAll() {
        this.plOperation('', PLOperation.StartAll);
    }
    stopAll() {
        this.plOperation('', PLOperation.StopAll);
    }
    restartAll() {
        this.plOperation('', PLOperation.RestartAll);
    }

    plOperation(kind: string, opeType: PLOperation) {
        let errorMsgId = this.getOpeErrorMsgId(opeType);

        this.capabilityService
            .plOperation(this.pipelineProvision.pipelineId, kind, opeType)
            .then( ret => {
                    if (!ret) {
                        this.msgService.error(errorMsgId);
                        this.plConfigStatus = 1;
                    } else {
                        this.updatePipelineStatus(ret);
                        this.plConfigStatus = 2;
                    }
            })
            .catch( error => {
                this.error = error;
                this.msgService.error(errorMsgId);
            });
    }

    getOpeErrorMsgId(opeType: PLOperation): string {
        let msgId: string;

        switch (opeType) {
            case PLOperation.StartOne:
                msgId = 'pl_005';
                break;
            case PLOperation.StopOne:
                msgId = 'pl_006';
                break;
            case PLOperation.RestartOne:
                msgId = 'pl_007';
                break;

            case PLOperation.StartAll:
                msgId = 'pl_008';
                break;
            case PLOperation.StopAll:
                msgId = 'pl_009';
                break;
            case PLOperation.RestartAll:
                msgId = 'pl_010';
                break;
        }

        return msgId;
    }

    updatePipelineStatus(pipelineStatus: PipelineStatus) {
        this.capabilities.forEach((element, index) => {
            let kind = element.kind;
            this.capabilities[index].status = this.formatCapabilityStatus(pipelineStatus[kind]);
        });
    }

    formatCapabilityStatus(status: string): CapabilityStatus {
        let capStatus: CapabilityStatus;

        switch (status.toLowerCase()) {
            case 'up':
                capStatus = CapabilityStatus.Up;
                break;
            case 'down':
                capStatus = CapabilityStatus.Down;
                break;
            case 'N/A':
                capStatus = CapabilityStatus.NA;
                break;

            default:
                capStatus = CapabilityStatus.NA;
                break;
        }

        return capStatus;
    }
}
