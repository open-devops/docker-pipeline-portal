import { provideRouter, RouterConfig } from '@angular/router';

import { plconfigRoutes } from './plconfig/plconfig.routes';
import { organizationRoutes } from './organization/organization.routes';
import { accountRoutes } from './account/account.routes';
import { roleRoutes } from './role/role.routes';
import { productRoutes } from './product/product.routes';
import { permissionRoutes } from './permission/permission.routes';
import { cbConfigRoutes } from './cbconfig/cbconfig.routes';
import { ctlpadRoutes } from './ctlpad/ctlpad.routes';
import { dashboardRoutes } from './dashboard/dashboard.routes';


export const routes: RouterConfig = [
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
    ...cbConfigRoutes,
    ...ctlpadRoutes,
    ...dashboardRoutes
];

export const appRouterProviders = [
    provideRouter(routes)
];