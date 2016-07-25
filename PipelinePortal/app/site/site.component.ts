import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'devops-pipline-portal',
    templateUrl: './site.component.html',
    styleUrls: ['./site.component.css'],
    directives: [ROUTER_DIRECTIVES]
})

export class SiteComponent {
    title = 'HPE DevOps+';
}