import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

import { AllInOneSDK } from "@ionic-native/all-in-one-sdk/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  constructor(
    private allInOneSDK: AllInOneSDK,
    private router: Router
  ) { }

  value: string;
  mid: string = "";
  orderId: string = "";
  amount: string = "";
  isStaging: boolean = false;
  restrictAppInvoke: boolean = false;
  txnToken: string = "";




  startTransaction() {
    var urls;
    if (this.isStaging) {
      urls = "https://securegw-stage.paytm.in/"
    } else {
      urls = "https://securegw.paytm.in/";
    }
    let paymentIntent = {
      mid: this.mid,
      orderId: this.orderId,
      txnToken: this.txnToken,
      amount: this.amount,
      isStaging: this.isStaging,
      callbackUrl: urls + "theia/paytmCallback?ORDER_ID=" + this.orderId,
      restrictAppInvoke: this.restrictAppInvoke
    };
    this.allInOneSDK.startTransaction(paymentIntent).then(
      resp => {
        // The response received after the transaction is completed will be an object containing "message" and "response". You can parse both and use them as required in your application
        alert(JSON.stringify(resp.response));
      }).catch(error => {
        alert(error);
      })
  }
}
