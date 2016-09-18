import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { plconfigRoutes } from './plconfig/plconfig.routes';
import { organizationRoutes } from './organization/organization.routes';
import { accountRoutes } from './account/account.routes';
import { roleRoutes } from './role/role.routes';
import { productRoutes } from './product/product.routes';
import { permissionRoutes } from './permission/permission.routes';
import { dashboardRoutes } from './dashboard/dashboard.routes';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/organization',
        pathMatch: 'full'
    },
    ...organizationRoutes,
    ...accountRoutes,
    ...roleRoutes,
    ...productRoutes,
    ...permissionRoutes,
    ...plconfigRoutes,
    ...dashboardRoutes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
