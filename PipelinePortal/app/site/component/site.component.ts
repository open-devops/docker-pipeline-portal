import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { SiteMenu } from '../data/sitemenu';
import { SiteService } from '../service/site.service';

@Component({
    moduleId: module.id,
    selector: 'devops-pipline-portal',
    templateUrl: '../template/site.component.html',
    styleUrls: ['../style/site.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        SiteService,
        HTTP_PROVIDERS
    ]
})

export class SiteComponent implements OnInit {
    title = 'HPE DevOps+';
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
            .then(siteMenus => this.refreshData(this, siteMenus))
    }

    private refreshData(comp: any, siteMenus: SiteMenu[]) {
        comp.siteMenus = siteMenus;
        this.selectedMenu = this.siteMenus[0];
    }

    selectMenu(menu: SiteMenu) {
        this.selectedMenu = menu;
        
        let link = [menu.path];
        this.router.navigate(link)
    }
}