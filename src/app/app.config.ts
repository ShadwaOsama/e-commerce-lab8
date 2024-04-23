import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store/src';
import { routes } from './app.routes';
import { authInterceptor } from './interceptor/auth-inerceptor.service';
import { countReducer } from './store/counter/counter.reducer';
import { languageReducer } from './store/language/language.reducer';
import { LanguageEffect } from './store/language/language.effect';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withFetch(),withInterceptors([authInterceptor])),
  provideStore({
    counter:countReducer,
    language: languageReducer
}), provideEffects([LanguageEffect])],
};

function provideEffects(arg0: any[]): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

