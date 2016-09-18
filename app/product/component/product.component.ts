import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../organization/service/organization.service';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { ObjectService } from '../../common/service/object.service';
import { RestApiCfg } from '../../common/service/restapicfg.service';
import { RestApi } from '../../common/service/restapi.service';
import { MessageService } from '../../common/service/message.service';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'product',
    templateUrl: '../template/product.component.html',
    styleUrls: ['../style/product.component.css', '../../share/css/global.css'],
    providers: [
        OrganizationService,
        ProductService,
        ObjectService,
        RestApiCfg,
        RestApi,
        MessageService,
        ToastsManager
    ]
})

export class ProductComponent implements OnInit {
    products: Product[];
    currProduct: Product;
    organizations: any[];
    filterOrgId: string;
    error: any;

    constructor(
        private organizationService: OrganizationService,
        private productService: ProductService,
        private objectService: ObjectService,
        private msgService: MessageService
    ) { }

    ngOnInit() {
        this.currProduct = new Product();
        this.filterOrgId = '';
        this.msgService.loadCfgData('app/product/config/message.json');
        this.organizationService.init()
                                 .then(res => {
                                     this.getOrganizations();
                                 });
        this.productService.init();
    }

    getOrganizations() {
        this.organizationService
            .getOrganizations()
            .then(organizations => {
                if (!organizations) {
                    this.msgService.error('prod-001');
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
                this.msgService.error('prod-001');
            });
    }

    orgChange($event: any) {
        this.products = [];
        this.getProducts(this.filterOrgId);
    }

    getProducts(id: string) {
        this.productService
            .getProducts(id)
            .then(products => {
                if (!products) {
                    this.msgService.error('prod-002');
                    this.products = [];
                } else {
                    this.products = [];

                    let prodNames = Object.keys(products);
                    prodNames.forEach(prodName => {
                        for (let index = 0; index < products[prodName].length; index++) {
                            this.products.push(products[prodName][index]);
                        }
                    });
                }

            })
            .catch(error => {
                this.error = error;
                this.msgService.error('prod-002');
            });
    }

    newProduct() {
        this.currProduct = new Product();
        this.currProduct.organizationId = this.filterOrgId;
        this.switchModalProduct(true);
    }

    modifyProduct(product: Product, event: any) {
        this.currProduct = this.objectService.deepClone(product);
        this.switchModalProduct(true);
    }

    saveProduct(product: Product) {
        this.productService
            .saveProduct(this.products, product)
            .then(products => {
                if (!products) {
                    this.msgService.error('prod-003');
                } else {
                    this.refreshData(this, products);
                }
            })
            .catch(error => {
                this.error = error;
                this.msgService.error('prod-003');
            });
    }

    confirmRemoveProduct(product: Product) {
        this.currProduct = product;
        this.switchModalProduct(true);
    }

    removeProduct(product: Product) {
        this.productService
            .removeProduct(this.products, product)
            .then(products => {
                if (!products) {
                    this.msgService.error('prod-004');
                } else {
                    this.refreshData(this, products);
                }
            })
            .catch(error => {
                this.error = error;
                this.msgService.error('prod-004');
            });
    }

    private refreshData(comp: any, products: Product[]) {
        comp.products = products;
        comp.switchModalProduct(false);
    }

    private switchModalProduct(show: boolean) {
        // if (show) {
        //     $('#modal_Product').modal('show');
        // } else {
        //     $('#modal_Product').modal('hide');
        // }
    }
}
