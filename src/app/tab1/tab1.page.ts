import { Component } from '@angular/core';
import { API } from 'src/app/API';
import { appInitialize } from '@ionic/angular/app-initialize';
import { Drops } from '../Drops';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  api : API;
  public list: Array<Drops> = [] ;
  public listIntact : Array<Drops> = [];



  constructor(api : API)
  {
    this.api = api;
  }



  onSearchItems(event: any) {
    let val = event.target.value;

    var p = "Prime"; 
    var p1 = "prime"; 
    var p2 = " p "; 
    var p3 = " P "; 
    val = val.replace(p, "P."); 
    val = val.replace(p1, "P.");
    val = val.replace(p2, " P. ");
    val = val.replace(p3, " P. ");
    console.log("Apres replace  : " + val)
    
    this.api.getDrops(val).then(data => {
    
      
      /*for(let i = 0; i < data.length; i++)
      {
        console.log(" i : "+i +" "+ data[i].place); 
        if(true == data[i].place.includes("(Exceptional)") ||  data[i].place.includes("(Radiant)") || data[i].place.includes("(Flawless)") )
        {
          // pas ajouté
        }
        else
          this.listIntact.push(data[i]);
      }*/

      this.list = data.filter(value => (!value.place.includes("(Exceptional)") && !value.place.includes("(Radiant)") && !value.place.includes("(Flawless)")));
      this.list = this.list.sort((b,a)=>a.chance-b.chance); 
      //this.list = data;

   
    })

  }


  onSearchItemsString(string: string) {
    let val = string;
    this.api.getDrops(val).then(data => {
      this.list = data.filter(value => (!value.place.includes("(Exceptional)") && !value.place.includes("(Radiant)") && !value.place.includes("(Flawless)")));      
      //this.list = data.sort((a,b)=>a.chance-b.chance); 
    })
    console.log(val);
  }



}

