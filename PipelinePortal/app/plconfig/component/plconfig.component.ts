import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Capability } from '../data/capability';
import { PLConfigAppDispalyFmt } from '../pipe/plconfig.pipe';
import { CapabilityService } from '../service/plconfig.service';
import { HTTP_PROVIDERS } from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'devops-pipline-portal',
    templateUrl: '../template/plconfig.component.html',
    styleUrls: ['../style/plconfig.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        CapabilityService,
        HTTP_PROVIDERS
    ],
    pipes: [PLConfigAppDispalyFmt]
})

export class PLConfigComponent implements OnInit{
    capabilities: Capability[];
    error: any;

    constructor(
        private capabilityService: CapabilityService
    ) { }

    getCapabilities() {
        this.capabilityService
            .getCapabilities()
            .then(capabilities => this.capabilities = capabilities)
            .catch(error => this.error = error);
    }

    ngOnInit() {
        this.getCapabilities();
    }
}