import { Component } from '@angular/core';
import { API } from '../API';
import { Fissure } from '../Fissure';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  api: API;
  list: Array<Fissure>;
  plateform = "pc";


  constructor(api : API)
  {
    this.api = api;
  }

  ngOnInit() 
  {
    this.api.getFissure(this.plateform).then(data => {
      this.list = data.sort((a,b)=>a.tierNum-b.tierNum);    
    })
  }


  onChange(event: any)
  {
    let val = event.target.value;
    this.plateform = val;
    this.ngOnInit();
  }


}
