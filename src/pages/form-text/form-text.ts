import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Device } from '@ionic-native/device';
import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-form-text',
  templateUrl: 'form-text.html',
})
export class FormTextPage {
  private emoteForm: FormGroup;
  private deviceId: any;
  @ViewChild('emoteInput') emoteInput;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public http: Http, private device: Device, private keyboard: Keyboard) {
     this.emoteForm = this.formBuilder.group({
      emote: ['', Validators.required]
    });
    this.deviceId = this.device.uuid;
  }

  ionViewDidEnter() {
    setTimeout(()=> {
      this.keyboard.show()
      this.emoteInput.setFocus();
      console.log('focus attempted');
    },150);
  }

  logForm() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let postParams = this.emoteForm.value;
    postParams['uuid'] = this.deviceId;

    this.navCtrl.push('LoadingPage');
    
    this.http.post("https://unstuck-api-staging.herokuapp.com/emotes", postParams, options)
    .map(res => res.json())
    .subscribe(data => {
      setTimeout(function() {
        this.navCtrl.push('ResponsePage', {emote: data.action, emote_id: data.emote_id, uuid: this.deviceId});
      }.bind(this), 6000);
      console.log(data);
      console.log(this.deviceId);
      console.log(postParams);    
    }, error => {
      console.log(error);
    });
  }

  returnHome() {
    this.navCtrl.popToRoot();
  }
}
