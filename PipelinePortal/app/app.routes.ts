import { provideRouter, RouterConfig } from '@angular/router';

import { plconfigRoutes } from './plconfig/plconfig.routes';

export const routes: RouterConfig = [
    ...plconfigRoutes
];

export const appRouterProviders = [
    provideRouter(routes)
];