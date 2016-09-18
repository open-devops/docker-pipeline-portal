import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SiteMenu } from '../data/siteMenu';
import { SiteService } from '../service/site.service';

@Component({
    moduleId: module.id,
    selector: 'devops-pipline-portal',
    templateUrl: '../template/site.component.html',
    styleUrls: ['../style/site.component.css'],
    providers: [
        SiteService
    ]
})

export class SiteComponent implements OnInit {
    title = 'Open DevOps+';
    siteMenus: SiteMenu[];
    selectedMenu: SiteMenu;

    constructor(
        private router: Router,
        private siteService: SiteService
    ) { };

    ngOnInit() {
        this.getOrganizations();
    }

    getOrganizations() {
        this.siteService
            .getSiteMenus()
            .then(siteMenus => this.refreshData(this, siteMenus));
    }

    private refreshData(comp: any, siteMenus: SiteMenu[]) {
        comp.siteMenus = siteMenus;
        this.selectedMenu = this.siteMenus[0];
    }

    selectMenu(menu: SiteMenu) {
        this.selectedMenu = menu;

        let link = [menu.path];
        this.router.navigate(link);
    }
}
