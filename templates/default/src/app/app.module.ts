import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// ng-zorro
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
// i18n
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import zh from '@angular/common/locales/zh';
registerLocaleData(en);
registerLocaleData(zh);
import { en_US, NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
// ngxs
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';
// application
import { environment } from 'src/environments/environment';
import { AuthModule } from './auth/auth.module';
import { AuthState } from './auth/store/state';
import { AuthFailedInterceptor } from './auth/auth-failed.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// simulate a data server
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { AuthTokenInterceptor } from './auth/auth-token.interceptor';
import { ErrorState, NotificationState } from './store';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    environment.production
      ? []
      : HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzNotificationModule,
    AuthModule,
    NgxsModule.forRoot([ErrorState, NotificationState, AuthState], {
      developmentMode: !environment.production,
      selectorOptions: {
        suppressErrors: false, // `true` by default
        injectContainerState: false,
      },
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsFormPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: 'auth',
      storage: StorageOption.SessionStorage,
    }),
  ],
  providers: [
    {
      provide: NZ_I18N,
      useFactory: (localId: string) => {
        switch (localId) {
          case 'en':
            return en_US;
          case 'zh':
            return zh_CN;
          default:
            return zh_CN;
        }
      },
      deps: [LOCALE_ID],
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthFailedInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
