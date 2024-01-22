import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-f9249","appId":"1:1072904801891:web:d698cefe1800dfa78f7256","storageBucket":"ring-of-fire-f9249.appspot.com","apiKey":"AIzaSyCK_jnb6NrTFHNXbQ6CiBdaFuCBTjt8Bxc","authDomain":"ring-of-fire-f9249.firebaseapp.com","messagingSenderId":"1072904801891"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
