import { bootstrap }    from '@angular/platform-browser-dynamic';

import { SiteComponent }       from './site/site.component';
import { appRouterProviders } from './app.routes';

bootstrap(SiteComponent, [
  appRouterProviders
])
.catch(err => console.error(err));