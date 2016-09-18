import { Component, OnInit } from '@angular/core';
import { Organization } from '../model/organization';
import { OrganizationService } from '../service/organization.service';
import { ObjectService } from '../../common/service/object.service';
import { RestApiCfg } from '../../common/service/restapicfg.service';
import { RestApi } from '../../common/service/restapi.service';
import { MessageService } from '../../common/service/message.service';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'organization',
    templateUrl: '../template/organization.component.html',
    styleUrls: ['../style/organization.component.css', '../../share/css/global.css'],
    providers: [
        OrganizationService,
        ObjectService,
        RestApiCfg,
        RestApi,
        MessageService,
        ToastsManager
    ]
})

export class OrganizationComponent implements OnInit {
    organizations: Organization[];
    currOrganization: Organization;
    error: any;

    constructor(
        private organizationService: OrganizationService,
        private objectService: ObjectService,
        private msgService: MessageService
    ) { }

    ngOnInit() {
        this.currOrganization = new Organization();
        this.msgService.loadCfgData('app/organization/config/message.json');
        this.organizationService.init()
                                 .then(res =>
                                 {
                                     this.getOrganizations();
                                 });
    }

    getOrganizations() {
        this.organizationService
            .getOrganizations()
            .then(organizations => {
                if (!organizations) {
                    this.msgService.error('org-001');
                }
                this.organizations = organizations || [];
            })
            .catch(error => {
                this.error = error;
                this.msgService.error('org-001');
            });
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
            .then(organizations => {
                if (!organizations) {
                    this.msgService.error('org-004');
                } else {
                    this.refreshData(this, organizations)
                }
            })
            .catch(error => {
                this.error = error;
                this.msgService.error('org-004');
            });
    }

    confirmRemoveOrg(organization: Organization) {
        this.currOrganization = organization;
        this.switchModalOrganization(true);
    }

    removeOrg(organization: Organization) {
        this.organizationService
            .removeOrganization(this.organizations, organization)
            .then(organizations => {
                if (!organizations) {
                    this.msgService.error('org-003');
                } else {
                    this.refreshData(this, organizations)
                }
            })
            .catch(error => {
                this.error = error;
                this.msgService.error('org-003');
            });
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
