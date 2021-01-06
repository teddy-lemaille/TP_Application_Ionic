import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { API } from '../API';
import { Arme, Result } from '../Riven';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  api: API;
  public list : Array<Arme>[];
  public listresult : Result;
  public listresult2 : Arme;

  constructor(api : API) 
  {
    this.api = api;
  }
/*
  onSearchRiven(event: any) {
    let val = event.target.value;
    console.log("val  =  " + val);
    this.api.getRiven(val).then(data => {
      this.list = data;
      console.log(data);
    })
  }
*/
  onSearchRiven(event: any) {
    let val = event.target.value;
    console.log("val  =  " + val);
    this.api.search().then(data => {
      this.listresult = data;
      console.log("log data");
      console.log(data);
      this.affiche();
    })
    
  }

  affiche()
  {
    console.log("log list");
    console.log(this.listresult);
    this.listresult2 = this.listresult[0];
    console.log("log list 2");
    console.log(this.listresult2);
  }

}
