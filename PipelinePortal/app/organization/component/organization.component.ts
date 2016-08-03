import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { Organization } from '../data/organization';
import { OrganizationService } from '../service/organization.service';
import { ObjectService } from '../../common/service/object.service';

@Component({
    moduleId: module.id,
    selector: 'organization',
    templateUrl: '../template/organization.component.html',
    styleUrls: ['../style/organization.component.css', '../../share/css/global.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        OrganizationService,
        ObjectService,
        HTTP_PROVIDERS
    ]
})

export class OrganizationComponent implements OnInit {
    organizations: Organization[];
    currOrganization: Organization;
    error: any;

    constructor(
        private organizationService: OrganizationService,
        private objectService: ObjectService) { }

    ngOnInit() {
        this.currOrganization = new Organization();
        this.getOrganizations();
    }

    getOrganizations() {
        this.organizationService
            .getOrganizations()
            .then(organizations => this.organizations = organizations)
            .catch(error => this.error = error);
    }

    newOrg() {
        this.currOrganization = new Organization();
        this.switchModalOrganization(true);
    }

    modifyOrg(organization: Organization, event: any) {
        this.currOrganization = this.objectService.deepClone(organization);
        this.switchModalOrganization(true);
    }

    saveOrg(organization: Organization) {
        this.organizationService
            .saveOrganization(this.organizations, organization)
            .then(organizations => this.refreshData(this, organizations))
            .catch(error => this.error = error);
    }

    removeOrg(organization: Organization, event: any) {
        event.stopPropagation();
        this.organizationService
            .removeOrganization(this.organizations, organization)
            .then(organizations => this.refreshData(this, organizations))
            .catch(error => this.error = error);
    }

    private refreshData(comp: any, organizations: Organization[]) {
        comp.organizations = organizations;
        comp.switchModalOrganization(false)
    }

    private switchModalOrganization(show: boolean) {
        // if (show) {
        //     $('#modal_organization').modal('show');
        // } else {
        //     $('#modal_organization').modal('hide');
        // }
    }
}
