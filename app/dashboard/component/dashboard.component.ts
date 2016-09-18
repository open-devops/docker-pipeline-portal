import { Component, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Dashboard } from '../data/dashboard';
import { DashboardService } from '../service/dashboard.service';
import { ObjectService } from '../../common/service/object.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: '../template/dashboard.component.html',
    styleUrls: ['../style/dashboard.component.css', '../../share/css/global.css'],
    providers: [
        DashboardService,
        ObjectService,
        HttpModule
    ]
})

export class DashboardComponent implements OnInit {
    dashboards: Dashboard[];
    currDashboard: Dashboard;
    organizations: any[];
    products: any[];
    pipelines: any[];
    filterOrgName: string;
    filterProdName: string;
    filterPlName: string;
    error: any;

    constructor(
        private dashboardService: DashboardService,
        private objectService: ObjectService) { }

    ngOnInit() {
        this.organizations = [
            {'id': 'DDC_01', 'name': 'DDC_01'},
            {'id': 'DDC_02', 'name': 'DDC_02'},
            {'id': 'DDC_03', 'name': 'DDC_03'},
            {'id': 'DDC_04', 'name': 'DDC_04'}
        ];
        this.filterOrgName = 'DDC_01';
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
        this.filterPlName = 'DDC_PL_01';
        this.currDashboard = new Dashboard();
        this.getDashboards();
    }

    getDashboards() {
        this.dashboardService
            .getDashboards()
            .then(dashboards => this.dashboards = dashboards)
            .catch(error => this.error = error);
    }

    newDashboard() {
        this.currDashboard = new Dashboard();
        this.switchModalDashboard(true);
    }

    modifyDashboard(dashboard: Dashboard, event: any) {
        this.currDashboard = this.objectService.deepClone(dashboard);
        this.switchModalDashboard(true);
    }

    saveDashboard(dashboard: Dashboard) {
        this.dashboardService
            .saveDashboard(this.dashboards, dashboard)
            .then(dashboards => this.refreshData(this, dashboards))
            .catch(error => this.error = error);
    }

    removeDashboard(dashboard: Dashboard, event: any) {
        event.stopPropagation();
        this.dashboardService
            .removeDashboard(this.dashboards, dashboard)
            .then(dashboards => this.refreshData(this, dashboards))
            .catch(error => this.error = error);
    }

    private refreshData(comp: any, dashboards: Dashboard[]) {
        comp.dashboards = dashboards;
        comp.switchModalDashboard(false);
    }

    private switchModalDashboard(show: boolean) {
        // if (show) {
        //     $('#modal_Dashboard').modal('show');
        // } else {
        //     $('#modal_Dashboard').modal('hide');
        // }
    }
}
