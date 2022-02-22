import { Component, OnInit } from '@angular/core';
import { API } from '../API';
import { APIMarket } from '../APIMarket';
import { Mod } from '../Class/Mod';
import { Order, PayloadRootObject } from '../Class/Order';
import { ModPrice } from '../tab4/tab4.page';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  api: API;
  apiMarket: APIMarket;
  List: Mod[] = [];
  ListOrder: Order[];
  payloadroot: PayloadRootObject;
  ListModPrice: Array<ModPrice> = [];
  i:number = 0;
  NbrDeVendeur: number = 5;
  NbMaxMod:number;
  ListType = []; 
  ListTypeCheckboxisChecked = [];

   // Liste de mod qui soit ne sont , soit plus en jeu, soit pas tradable, soit dispo dans la version chinois
   ListNomSupprime : string[] = ["Air Martial", "Amalgam Argonak Metal Auger", "Amalgam Barrel Diffusion", "Amalgam Daikyu Target Acquired",
   "Amalgam Furax Body Count", "Amalgam Javlok Magazine Warp", "Amalgam Organ Shatter", "Amalgam Ripkas True Steel", "Amalgam Serration", 
   "Amalgam Shotgun Spazz", "Ambush Optics", "Augmented Sonar", "Do Not Use", "Do Not Use", "Fizzbang Flourish", "Harrowed Hook", 
   "Primed Fast Deflection" , "Primed Shred", "Primed Streamline", "Primed Sure Footed", "Primed Vigor", "Resilient Focus", "Soaring Truth",
   "Strategic Pursuit"];
  
  constructor(api : API, apiMarket:APIMarket)
  {
    this.api = api;
    this.apiMarket = apiMarket;
  }

  ngOnInit() { 
    this.api.getAllMods().then( async value => {
      this.List = value;
      this.NbMaxMod = this.List.length

      for(let j=0; j< this.List.length-1; j++)
      {
        //Supprime les doublons
        if(this.List[j].name == this.List[j+1].name)
        {
          this.List.splice(j,1);
        }
        //Retire mod supprimé
        if(this.List[j].excludeFromCodex == true )
        {
          this.List.splice(j,1);
        }              
        //Récupération des diférents type de mod
        if(this.ListType.indexOf(this.List[j].type) == -1)
        {
          this.ListType.push(this.List[j].type);
        }
      }

      //Retire les mods qui ne sont plus dans le jeu de la liste
      for(let j=0; j< this.ListNomSupprime.length; j++)
      {
        let index = this.List.map(function(a) {return a.name}).indexOf(this.ListNomSupprime[j]);
        this.List.splice(index,1);
      }

      for(let j=0; j< this.ListType.length; j++)
      {
        this.ListTypeCheckboxisChecked.push({id:j, value:this.ListType[j], isSelected:true});
      }
      console.log(this.ListTypeCheckboxisChecked.indexOf(this.List[this.List.length].type))
    })

  }

  Actu()
  {
    for(let i=0; i< this.List.length; i++)
    {
      let nomMod = this.CorrectionNomMod(this.List[i].name);
      let mod = new ModPrice(nomMod, 0, "");
      if(this.i%50 == 0) 
      {
        this.wait(1000)
      }
      
       
      this.apiMarket.GetPrice(nomMod).then( data => {
        this.payloadroot = data;
        this.ListOrder = data.payload.orders.filter(data => (data.user.status == "online" || data.user.status == "ingame") && data.order_type == 'sell');
        if(this.ListOrder.length >= this.NbrDeVendeur)
        {
          if(this.ListOrder.length > 2)
          {
            this.ListOrder = this.ListOrder.sort((a,b)=>a.platinum-b.platinum); 
          }
            

          
          if(this.ListOrder[0] != null)
          {
            mod.platinum =  this.ListOrder[0].platinum;
            mod.vendeur = this.ListOrder[0].user.ingame_name;
          }
          
        
          this.ListModPrice.push(mod);
          this.ListModPrice.sort((b,a)=>a.platinum-b.platinum); 
          this.wait(150)
        }
        
      });
    }
  }

  CorrectionNomMod(nomMod :string):string
  {
    nomMod = nomMod.toLocaleLowerCase();
    nomMod = nomMod.replace(' ','_');
    nomMod = nomMod.replace(' ','_');
    nomMod = nomMod.replace(' ','_');
    nomMod = nomMod.replace('-','_');
    nomMod = nomMod.replace('\'','');
    nomMod = nomMod.replace('&','and');
    nomMod = nomMod.replace('archgun_riven_mod','arch_gun_riven_mod_(veiled)');
    nomMod = nomMod.replace('berserker_fury','berserker');
    nomMod = nomMod.replace('brain_storm','brain_storm_(grakata)');
    nomMod = nomMod.replace('conductive_blade','galvanized_blade');
    nomMod = nomMod.replace('kitgun_riven_mod','kitgun_riven_mod_(veiled)');    
    nomMod = nomMod.replace('melee_riven_mod','melee_riven_mod_(veiled)');
    nomMod = nomMod.replace('pistol_riven_mod','pistol_riven_mod_(veiled)');
    nomMod = nomMod.replace('rifle_riven_mod','rifle_riven_mod_(veiled)');
    nomMod = nomMod.replace('shotgun_riven_mod','shotgun_riven_mod_(veiled)');
    nomMod = nomMod.replace('zaw_riven_mod','zaw_riven_mod_(veiled)');
    nomMod = nomMod.replace('primed_charged_chamber','primed_chamber');
    nomMod = nomMod.replace('shrapnel_rounds','shrapnel_rounds_(marelok)');
    nomMod = nomMod.replace('skull_shots','skull_shots_(viper)');
    nomMod = nomMod.replace('static_alacrity','static_alacrity_(staticor)');
    nomMod = nomMod.replace('thundermiter','thundermiter_(miter)');
    return nomMod;
  }

  wait(ms: number){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }


}

export class Checkbox {
  id: number;
  value: string;
  isSelected: boolean;

  constructor(id:number, value:string, isSelected : boolean){
    this.id = id;
    this.value = value;
    this.isSelected = isSelected; 
  }
}