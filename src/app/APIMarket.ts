import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Injectable } from '@angular/core';
import { AppModule } from './app.module';
import { HttpClient } from '@angular/common/http';
import { Drops } from './Drops';
import { Fissure } from './Fissure';
import {  } from './Class/Riven';
import { Mod } from './Class/Mod';
import { Payload, PayloadRootObject } from './Class/Order';
import { PayloadRootObjectRiven } from './Class/Riven';
import { PayloadRootObjectAttributeRiven } from './Class/AttributeRiven';

@Injectable({
  providedIn: 'root'
})
export class APIMarket
{
  constructor(private http: HttpClient) {}


  GetPrice(item :string) : Promise<PayloadRootObject>
  {
    const url: string = 'https://api.warframe.market/v1/items/'+ item +'/orders';
    console.log(url);
    return new Promise(resolve => {
      this.http.get(url).subscribe(data => { let json: PayloadRootObject = data as PayloadRootObject; resolve(json);},
                                   err => { console.log(err); });
    });
  }

   GetRiven(item :string, stat= "") : Promise<PayloadRootObjectRiven>
  {
    const url: string = 'https://api.warframe.market/v1/auctions/search?type=riven&weapon_url_name='+ item + stat + '&sort_by=price_asc';
    console.log(url);
    return new Promise(resolve => {
      this.http.get(url).subscribe(data => { let json: PayloadRootObjectRiven = data as PayloadRootObjectRiven; resolve(json);},
                                   err => { console.log(err); });
    });
  }  
  
  GetRivenAttribute() : Promise<PayloadRootObjectAttributeRiven>
  {
    const url: string = 'https://api.warframe.market/v1/riven/attributes';
    console.log(url);
    return new Promise(resolve => {
      this.http.get(url).subscribe(data => { let json: PayloadRootObjectAttributeRiven = data as PayloadRootObjectAttributeRiven; resolve(json);},
                                   err => { console.log(err); });
    });
  }
}

function GetRiven(item: any, string: any, arg2: any) {
  throw new Error('Function not implemented.');
}
