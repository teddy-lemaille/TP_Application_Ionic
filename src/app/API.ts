import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Injectable } from '@angular/core';
import { AppModule } from './app.module';
import { HttpClient } from '@angular/common/http';
import { Drops } from './Drops';
import { Fissure } from './Fissure';
import { Mod } from './Class/Mod';
import { Weapon } from './Class/Weapon';

@Injectable({
  providedIn: 'root'
})
export class API 
{
    constructor(private http: HttpClient) {}
    readonly TAG:string = 'DeezerService';
    
    getDrops(items: string) : Promise<Drops[]>
    {
      const url: string = 'https://api.warframestat.us/drops/search/' + encodeURI(items);
      console.log(url);
      return new Promise(resolve => {
        this.http.get(url).subscribe(data => { let json: Drops[] = data as Drops[]; resolve(json);},
                                     err => { console.log(err); });
      });
    }
    

    getFissure(Plateform : string) : Promise<Fissure[]>
    {
      const url: string = "https://api.warframestat.us/"+ Plateform +"/fissures" ;
      return new Promise(resolve => {
        this.http.get(url).subscribe(data => { let json: Fissure[] = data as Fissure[]; resolve(json);},
                                     err => { console.log(err); });
      });
    }
    


    getAllMods() : Promise<Mod[]>
    {
      const url: string = 'https://api.warframestat.us/mods';
      return new Promise(resolve => {
        this.http.get(url).subscribe(data => { let json: Mod[] = data as Mod[]; resolve(json);},
                                     err => { console.log(err); });
      });
    }

    getAllWeapons() : Promise<Weapon[]>
    {
      const url: string = 'https://api.warframestat.us/weapons';
      return new Promise(resolve => {
        this.http.get(url).subscribe(data => { let json: Weapon[] = data as Weapon[]; resolve(json);},
                                     err => { console.log(err); });
      });
    }

}