import { RouterConfig } from '@angular/router';

import { PLConfigComponent } from './component/plconfig.component';

export const plconfigRoutes: RouterConfig = [
    {
        path: '',
        redirectTo: '/plconfig',
        pathMatch: 'full'
    },
    {
        path: 'plconfig',
        component: PLConfigComponent
    }
]; 