import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), 
     provideClientHydration(withEventReplay()),
     provideHttpClient(withFetch()),
     importProvidersFrom(BrowserAnimationsModule),
     provideToastr({
       timeOut: 3000,
       positionClass: 'toast-bottom-right',
       preventDuplicates: true,
     }), provideNgxMask()]
};
