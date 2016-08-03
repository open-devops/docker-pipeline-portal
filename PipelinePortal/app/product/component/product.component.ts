import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { Product } from '../data/product';
import { ProductService } from '../service/product.service';
import { ObjectService } from '../../common/service/object.service';
import { AcountDispPipe } from '../pipe/product.pipe';

@Component({
    moduleId: module.id,
    selector: 'product',
    templateUrl: '../template/product.component.html',
    styleUrls: ['../style/product.component.css', '../../share/css/global.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ProductService,
        ObjectService,
        HTTP_PROVIDERS
    ],
    pipes: [AcountDispPipe]
})

export class ProductComponent implements OnInit {
    products: Product[];
    currProduct: Product;
    organizations: any[];
    filterOrgId: string;
    error: any;

    constructor(
        private productService: ProductService,
        private objectService: ObjectService) { }

    ngOnInit() {
        this.organizations = [
            {'id': 'DDC_01', 'name': 'DDC_01'},
            {'id': 'DDC_02', 'name': 'DDC_02'},
            {'id': 'DDC_03', 'name': 'DDC_03'},
            {'id': 'DDC_04', 'name': 'DDC_04'}
        ];
        this.filterOrgId = "DDC_01";
        this.currProduct = new Product();
        this.getProducts();
    }

    getProducts() {
        this.productService
            .getProducts()
            .then(products => this.products = products)
            .catch(error => this.error = error);
    }

    newProduct() {
        this.currProduct = new Product();
        this.switchModalProduct(true);
    }

    modifyProduct(product: Product, event: any) {
        this.currProduct = this.objectService.deepClone(product);
        this.switchModalProduct(true);
    }

    saveProduct(product: Product) {
        this.productService
            .saveProduct(this.products, product)
            .then(products => this.refreshData(this, products))
            .catch(error => this.error = error);
    }

    removeProduct(product: Product, event: any) {
        event.stopPropagation();
        this.productService
            .removeProduct(this.products, product)
            .then(products => this.refreshData(this, products))
            .catch(error => this.error = error);
    }

    private refreshData(comp: any, products: Product[]) {
        comp.products = products;
        comp.switchModalProduct(false)
    }

    private switchModalProduct(show: boolean) {
        // if (show) {
        //     $('#modal_Product').modal('show');
        // } else {
        //     $('#modal_Product').modal('hide');
        // }
    }
}
