import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { lightDatePicker} from './lightDatePicker/lightDatePicker';
import { MyHammerConfig } from './lightDatePicker/myHammer.config';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    lightDatePicker
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    lightDatePicker
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: HAMMER_GESTURE_CONFIG,  useClass: MyHammerConfig }
  ]
})
export class AppModule {}
