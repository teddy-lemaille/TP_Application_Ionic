import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Injectable } from '@angular/core';
import { AppModule } from './app.module';
import { HttpClient } from '@angular/common/http';
import { Drops } from './Drops';
import { Fissure } from './Fissure';
import { Arme, Result } from './Riven';

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

    getRiven(nomArme : string) : Promise<Arme[]>
    {
      const url: string = "https://api.warframestat.us/pc/rivens/search/" + nomArme;
      return new Promise(resolve => {
        this.http.get(url).subscribe(data => { let json: Arme[] = data as Arme[]; resolve(json);},
                                     err => { console.log(err); });
      });
    }
    
    search():Promise<Result> 
    {
      console.log(`${this.TAG} search`);
      const url:string = "https://api.warframestat.us/pc/rivens/search/arca";
      console.log(`${this.TAG} url: ${url}`);
      return new Promise(resolve => {
        this.http.get(url).subscribe(data => { let json = data as Result; resolve(json);},
                                     err => { console.log(err); });
      });
    }


}