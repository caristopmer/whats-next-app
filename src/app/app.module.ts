import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http'
import { CallNumber } from '@ionic-native/call-number';
import { Device } from '@ionic-native/device';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Keyboard } from '@ionic-native/keyboard'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SpeechRecognition,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CallNumber,
    Device,
    Keyboard
  ]
})
export class AppModule {}
