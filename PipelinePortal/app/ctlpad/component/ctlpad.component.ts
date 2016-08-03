import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { Capability } from '../data/capability';
import { CtlPadAppDispalyFmt } from '../pipe/ctlpad.pipe';
import { CapabilityService } from '../service/ctlpad.service';

@Component({
    moduleId: module.id,
    selector: 'pl-config',
    templateUrl: '../template/ctlpad.component.html',
    styleUrls: ['../style/ctlpad.component.css', '../../share/css/global.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        CapabilityService,
        HTTP_PROVIDERS
    ],
    pipes: [CtlPadAppDispalyFmt]
})

export class CtlPadComponent implements OnInit{
    capabilities: Capability[];
    organizations: any[];
    products: any[];
    pipelines: any[];
    filterOrgName: string;
    filterProdName: string;
    filterPlName: string;
    error: any;

    constructor(
        private capabilityService: CapabilityService
    ) { }

    ngOnInit() {
        this.organizations = [
            {'id': 'DDC_01', 'name': 'DDC_01'},
            {'id': 'DDC_02', 'name': 'DDC_02'},
            {'id': 'DDC_03', 'name': 'DDC_03'},
            {'id': 'DDC_04', 'name': 'DDC_04'}
        ];
        this.filterOrgName = "DDC_01";
        this.products = [
            {'id': 'DDC_PROD_01', 'name': 'DDC_PROD_01'},
            {'id': 'DDC_PROD_02', 'name': 'DDC_PROD_02'},
            {'id': 'DDC_PROD_03', 'name': 'DDC_PROD_03'},
            {'id': 'DDC_PROD_04', 'name': 'DDC_PROD_04'}
        ];
        this.filterProdName = 'DDC_PROD_01';
        this.pipelines = [
            {'id': 'DDC_PL_01', 'name': 'DDC_PL_01'},
            {'id': 'DDC_PL_02', 'name': 'DDC_PL_02'},
            {'id': 'DDC_PL_03', 'name': 'DDC_PL_03'},
            {'id': 'DDC_PL_04', 'name': 'DDC_PL_04'}
        ];
        this.filterPlName ='DDC_PL_01';
        this.getCapabilities();
    }

    getCapabilities() {
        this.capabilityService
            .getCapabilities()
            .then(capabilities => this.capabilities = capabilities)
            .catch(error => this.error = error);
    }
}