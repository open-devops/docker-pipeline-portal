import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { CBConfig } from '../data/cbconfig';
import { CBConfigService } from '../service/cbconfig.service';
import { ObjectService } from '../../common/service/object.service';
import { CBConfigDispPipe } from '../pipe/cbconfig.pipe';

@Component({
    moduleId: module.id,
    selector: 'cbconfig',
    templateUrl: '../template/cbconfig.component.html',
    styleUrls: [
        '../style/cbconfig.component.css',
        '../../share/css/global.css'
    ],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        CBConfigService,
        ObjectService,
        HTTP_PROVIDERS
    ],
    pipes: [CBConfigDispPipe]
})

export class CBConfigComponent implements OnInit {
    cbconfigs: CBConfig[];
    currCBConfig: CBConfig;
    organizations: any[];
    products: any[];
    pipelines: any[];
    plRoles: any[];
    filterOrgName: string;
    filterProdName: string;
    filterPlName: string;
    filterPLRole: string;
    error: any;

    constructor(
        private cbconfigService: CBConfigService,
        private objectService: ObjectService) { }

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
        this.plRoles = [
            {'id': 'CAP_CM', 'name': 'CAP_CM'},
            {'id': 'CAP_CI', 'name': 'CAP_CI'},
            {'id': 'CAP_CR', 'name': 'CAP_CR'},
            {'id': 'CAP_CB', 'name': 'CAP_CB'},
            {'id': 'CAP_CD', 'name': 'CAP_CD'},
            {'id': 'CAP_CT', 'name': 'CAP_CT'}
        ];
        this.filterPLRole ='CAP_CM';
        this.currCBConfig = new CBConfig();
    }
}
