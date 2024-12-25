import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(),
    provideEnvironmentNgxMask(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'cdc-certificaciones',
        appId: '1:871673640625:web:44a9e4c59ee38a22f69490',
        storageBucket: 'cdc-certificaciones.firebasestorage.app',
        apiKey: 'AIzaSyBVQILmh6rvtHPAEtQSW4BgtT4g3hporrc',
        authDomain: 'cdc-certificaciones.firebaseapp.com',
        messagingSenderId: '871673640625',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
