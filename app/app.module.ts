import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { SiteComponent }  from './site/component/site.component';
import { OrganizationComponent }  from './organization/component/organization.component';
import { RoleComponent }  from './role/component/role.component';
import { AccountComponent }  from './account/component/account.component';
import { ProductComponent }  from './product/component/product.component';
import { PermissionComponent }  from './permission/component/permission.component';
import { PLConfigComponent }  from './plconfig/component/plconfig.component';
import { DashboardComponent }  from './dashboard/component/dashboard.component';


import { routing }        from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    SiteComponent,
    OrganizationComponent,
    RoleComponent,
    AccountComponent,
    ProductComponent,
    PermissionComponent,
    PLConfigComponent,
    DashboardComponent
  ],
  bootstrap: [ SiteComponent ]
})
export class AppModule {
}
