import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { KFAppModule } from './app/kf.app.module';
import { environmentReader } from './environments/environment';

environmentReader.then(environment => {
    if (environment["production"]) {
        enableProdMode();
    }

    platformBrowserDynamic().bootstrapModule(KFAppModule)
        .catch(err => console.log(err));
});
