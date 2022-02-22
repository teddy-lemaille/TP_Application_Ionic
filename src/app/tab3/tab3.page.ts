import { Component } from '@angular/core';
import { APIMarket } from '../APIMarket';
import { PayloadRootObjectRiven } from '../Class/Riven';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  apiMarket: APIMarket;
  List: any;
  payloadroot: PayloadRootObjectRiven;
  moyenne: number;
  NomArme: any
  ListAttribute : any;
  ListAttributeName : string[] = [];
  AttributeName1 = "";
  AttributeName2 = "";
  AttributeName3 = "";
  AttributeNegativeName = "";
  

  List3_1: any= []; 
  List3_0: any= [];
  List2_1: any= [];
  List2_0: any= [];
  List1_1: any= [];
  List1_0: any= [];
  List0_1: any= [];
  List0_0: any= [];
  ListAll: any= [];
  List3_1Somme=0;
  List3_0Somme=0;
  List2_1Somme=0;
  List2_0Somme=0;
  List1_1Somme=0;
  List1_0Somme=0;
  List0_1Somme=0;
  List0_0Somme=0;
  SommeTotal=0;
  Coef=0;
  MoyenneEstimation=0;
 


  constructor(apiMarket : APIMarket) 
  {
    this.apiMarket = apiMarket;
  }
  
  ngOnInit() {
    this.apiMarket.GetRivenAttribute().then(data => {
      this.ListAttribute = data.payload.attributes;
      for(let i=0; i<this.ListAttribute.length; i++)
      {
        this.ListAttributeName[i] = this.ListAttribute[i].url_name;  
     
      }
      this.ListAttributeName.sort((a,b) =>  (a > b ? 1 : -1)); 
    });console.log(this.ListAttributeName);
  }

  onSearchRiven(event: any) {
    this.NomArme = event.target.value;
    let stats;
    if(this.AttributeName1 != "" && this.AttributeName1 != "none")
    {
      stats = '&positive_stats='+this.AttributeName1;
      if(this.AttributeName2 != "" && this.AttributeName2 != "none")
      {
        stats += "," + this.AttributeName2;
        if(this.AttributeName3 != "" && this.AttributeName3 != "none")
        {
          stats += "," + this.AttributeName3;
        }
      }
    }
    if(this.AttributeNegativeName != "" && this.AttributeNegativeName != "none")
    {
      stats += '&negative_stats=' + this.AttributeNegativeName;
    }

    console.log(stats)
    this.apiMarket.GetRiven(this.NomArme , stats).then(data => {
      this.payloadroot = data;
      this.List = this.payloadroot.payload.auctions;
      console.log(this.List)
      this.moyenne = 0;
      for(let i=0; i<this.List.length; i++)
      {
        if(this.List[i].top_bid != null)
        {
          this.moyenne += this.List[i].top_bid;
        }else{
          this.moyenne += this.List[i].buyout_price;
        }
      } 
      console.log(this.moyenne);
      this.moyenne = this.moyenne / this.List.length;
      console.log(this.moyenne);
      this.EstimationRiven();
    })
    
  }

  async EstimationRiven()
  {

    this.List3_1= []; 
    this.List3_0= [];
    this.List2_1 = [];
    this.List2_0 = [];
    this.List1_1 = [];
    this.List1_0 = [];
    this.List0_1 = [];
    this.List0_0 = [];
    this.ListAll = [];
    this.List3_1Somme=0;
    this.List3_0Somme=0;
    this.List2_1Somme=0;
    this.List2_0Somme=0;
    this.List1_1Somme=0;
    this.List1_0Somme=0;
    this.List0_1Somme=0;
    this.List0_0Somme=0;
    this.SommeTotal=0;
    this.Coef=0;
    this.MoyenneEstimation=0;

    // 3 stat + negative
    if(this.AttributeName1 != "" && this.AttributeName1 != "none" && this.AttributeName2 != "" && this.AttributeName2 != "none" 
     && this.AttributeName3 != "" && this.AttributeName3 != "none"  && this.AttributeNegativeName != "" && this.AttributeNegativeName != "none" )
    {
      let stats= '&positive_stats=' + this.AttributeName1 + "," + this.AttributeName2 + "," + this.AttributeName3 + '&negative_stats='+ this.AttributeNegativeName;

      await this.apiMarket.GetRiven(this.NomArme , stats).then(data => {
        this.payloadroot = data;
        this.List3_1 = this.payloadroot.payload.auctions.filter(data=> (data.owner.status == "online" || data.owner.status == "ingame"));
      })
    }
this.wait(150);

    // 3 stat 
    if(this.AttributeName1 != "" && this.AttributeName1 != "none" && this.AttributeName2 != "" && this.AttributeName2 != "none" 
    && this.AttributeName3 != "" && this.AttributeName3 != "none" )
    {
     let stats= '&positive_stats=' + this.AttributeName1 + "," + this.AttributeName2 + "," + this.AttributeName3;

     await this.apiMarket.GetRiven(this.NomArme , stats).then(data => {
       this.payloadroot = data;
       this.List3_0 = this.payloadroot.payload.auctions.filter(data=> (data.owner.status == "online" || data.owner.status == "ingame"));
     })
    }
this.wait(150);
    
    //2 stat + negative
    if(this.AttributeName1 != "" && this.AttributeName1 != "none" && this.AttributeName2 != "" && this.AttributeName2 != "none" 
    && this.AttributeNegativeName != "" && this.AttributeNegativeName != "none" )
    {
     let stats= '&positive_stats=' + this.AttributeName1 + "," + this.AttributeName2 + '&negative_stats='+ this.AttributeNegativeName;

     await this.apiMarket.GetRiven(this.NomArme , stats).then(data => {
       this.payloadroot = data;
       this.List2_1 = this.payloadroot.payload.auctions.filter(data=> (data.owner.status == "online" || data.owner.status == "ingame")).concat(this.List2_1);
     })
    }
this.wait(150);

    if(this.AttributeName1 != "" && this.AttributeName1 != "none" && this.AttributeName3 != "" && this.AttributeName3 != "none" 
    && this.AttributeNegativeName != "" && this.AttributeNegativeName != "none" )
    {
     let stats= '&positive_stats=' + this.AttributeName1 + "," + this.AttributeName3 + '&negative_stats='+ this.AttributeNegativeName;

     await this.apiMarket.GetRiven(this.NomArme , stats).then(data => {
       this.payloadroot = data;
       this.List2_1 = this.payloadroot.payload.auctions.filter(data=> (data.owner.status == "online" || data.owner.status == "ingame")).concat(this.List2_1);
     })
    }
this.wait(150);

    if(this.AttributeName2 != "" && this.AttributeName2 != "none" && this.AttributeName3 != "" && this.AttributeName3 != "none" 
    && this.AttributeNegativeName != "" && this.AttributeNegativeName != "none" )
    {
     let stats= '&positive_stats=' + this.AttributeName2 + "," + this.AttributeName3 + '&negative_stats='+ this.AttributeNegativeName;

     await this.apiMarket.GetRiven(this.NomArme , stats).then(data => {
       this.payloadroot = data;
       this.List2_1 = this.payloadroot.payload.auctions.filter(data=> (data.owner.status == "online" || data.owner.status == "ingame")).concat(this.List2_1);
     })
    }
this.wait(150);


    //2 stat 
    if(this.AttributeName1 != "" && this.AttributeName1 != "none" && this.AttributeName2 != "" && this.AttributeName2 != "none" )
    {
      let stats= '&positive_stats=' + this.AttributeName1 + "," + this.AttributeName2 ;

      await this.apiMarket.GetRiven(this.NomArme , stats).then(data => {
        this.payloadroot = data;
        this.List2_0 = this.payloadroot.payload.auctions.filter(data=> (data.owner.status == "online" || data.owner.status == "ingame")).concat(this.List2_0);
      })
    }
this.wait(150);

    if(this.AttributeName1 != "" && this.AttributeName1 != "none" && this.AttributeName3 != "" && this.AttributeName3 != "none" )
    {
      let stats= '&positive_stats=' + this.AttributeName1 + "," + this.AttributeName3;

      await this.apiMarket.GetRiven(this.NomArme , stats).then(data => {
        this.payloadroot = data;
        this.List2_0 = this.payloadroot.payload.auctions.filter(data=> (data.owner.status == "online" || data.owner.status == "ingame")).concat(this.List2_0);
      })
    }
this.wait(150);

    if(this.AttributeName2 != "" && this.AttributeName2 != "none" && this.AttributeName3 != "" && this.AttributeName3 != "none" )
    {
      let stats= '&positive_stats=' + this.AttributeName2 + "," + this.AttributeName3;

      await this.apiMarket.GetRiven(this.NomArme , stats).then(data => {
        this.payloadroot = data;
        this.List2_0 = this.payloadroot.payload.auctions.filter(data=> (data.owner.status == "online" || data.owner.status == "ingame")).concat(this.List2_0);
      })
    }
this.wait(150);

    // 1 stat + negative
    if(this.AttributeName1 != "" && this.AttributeName1 != "none" && this.AttributeNegativeName != "" && this.AttributeNegativeName != "none" )
    {
     let stats= '&positive_stats=' + this.AttributeName1 + '&negative_stats='+ this.AttributeNegativeName;

     await this.apiMarket.GetRiven(this.NomArme , stats).then(data => {
       this.payloadroot = data;
       this.List1_1 = this.payloadroot.payload.auctions.filter(data=> (data.owner.status == "online" || data.owner.status == "ingame")).concat(this.List1_1);
     })
    }
this.wait(150);
    if(this.AttributeName2 != "" && this.AttributeName2 != "none" && this.AttributeNegativeName != "" && this.AttributeNegativeName != "none" )
    {
     let stats= '&positive_stats=' + this.AttributeName2 + '&negative_stats='+ this.AttributeNegativeName;

     await this.apiMarket.GetRiven(this.NomArme , stats).then(data => {
       this.payloadroot = data;
       this.List1_1 = this.payloadroot.payload.auctions.filter(data=> (data.owner.status == "online" || data.owner.status == "ingame")).concat(this.List1_1);
     })
    }
this.wait(150);
    if(this.AttributeName3 != "" && this.AttributeName3 != "none" && this.AttributeNegativeName != "" && this.AttributeNegativeName != "none" )
    {
     let stats= '&positive_stats=' + this.AttributeName3 + '&negative_stats='+ this.AttributeNegativeName;

     await this.apiMarket.GetRiven(this.NomArme , stats).then(data => {
       this.payloadroot = data;
       this.List1_1 = this.payloadroot.payload.auctions.filter(data=> (data.owner.status == "online" || data.owner.status == "ingame")).concat(this.List1_1);
     })
    }
this.wait(150);

    //1 stat
    if(this.AttributeName1 != "" && this.AttributeName1 != "none" )
    {
     let stats= '&positive_stats=' + this.AttributeName1;

     await this.apiMarket.GetRiven(this.NomArme , stats).then(data => {
       this.payloadroot = data;
       this.List1_0 = this.payloadroot.payload.auctions.filter(data=> (data.owner.status == "online" || data.owner.status == "ingame")).concat(this.List1_0);
     })
    }
this.wait(150);
    if(this.AttributeName2 != "" && this.AttributeName2 != "none" )
    {
     let stats= '&positive_stats=' + this.AttributeName2;

     await this.apiMarket.GetRiven(this.NomArme , stats).then(data => {
       this.payloadroot = data;
       this.List1_0 = this.payloadroot.payload.auctions.filter(data=> (data.owner.status == "online" || data.owner.status == "ingame")).concat(this.List1_0);
     })
    }
this.wait(150);
    if(this.AttributeName3 != "" && this.AttributeName3 != "none" )
    {
     let stats= '&positive_stats=' + this.AttributeName3;

     await this.apiMarket.GetRiven(this.NomArme , stats).then(data => {
       this.payloadroot = data;
       this.List1_0 = this.payloadroot.payload.auctions.filter(data=> (data.owner.status == "online" || data.owner.status == "ingame")).concat(this.List1_0);
     })
    }
this.wait(150);

    // negative 
    if(this.AttributeNegativeName != "" && this.AttributeNegativeName != "none" )
    {
     let stats= '&negative_stats=' + this.AttributeNegativeName;

     await this.apiMarket.GetRiven(this.NomArme , stats).then(data => {
       this.payloadroot = data;
       this.List0_1 = this.payloadroot.payload.auctions.filter(data=> (data.owner.status == "online" || data.owner.status == "ingame")).concat(this.List0_1);
     })
    }
this.wait(150);

    // rien 
    await this.apiMarket.GetRiven(this.NomArme).then(data => {
      this.payloadroot = data;
      this.List0_0 = this.payloadroot.payload.auctions.filter(data=> (data.owner.status == "online" || data.owner.status == "ingame")).concat(this.List0_0);
    })
   

    // suprimme les doublons dans les autre listes
    this.ListAll = this.List3_1.concat(this.ListAll);
    for( let j =0 ; j< this.List3_1.length; j++) 
    {  
      let index = this.List3_0.map(function(a) {return a.id}).indexOf(this.ListAll[j].id);
      if(index != -1)
      {
          this.List3_0.splice(index,1);
      }        
    }

    this.ListAll = this.List3_0.concat(this.ListAll);
    for( let j =0 ; j< this.ListAll.length; j++) 
    {  
      let index = this.List2_1.map(function(a) {return a.id}).indexOf(this.ListAll[j].id);
      if(index != -1)
      {
          this.List2_1.splice(index,1);
      }        
    }

    this.ListAll = this.List2_1.concat(this.ListAll);
    for( let j =0 ; j< this.ListAll.length; j++) 
    {  
      let index = this.List2_0.map(function(a) {return a.id}).indexOf(this.ListAll[j].id);
      if(index != -1)
      {
          this.List2_0.splice(index,1);
      }        
    }

    this.ListAll = this.List2_0.concat(this.ListAll);
    for( let j =0 ; j< this.ListAll.length; j++) 
    {  
      let index = this.List1_1.map(function(a) {return a.id}).indexOf(this.ListAll[j].id);
      if(index != -1)
      {
          this.List1_1.splice(index,1);
      }        
    }

    this.ListAll = this.List1_1.concat(this.ListAll);
    for( let j =0 ; j< this.ListAll.length; j++) 
    {  
      let index = this.List1_0.map(function(a) {return a.id}).indexOf(this.ListAll[j].id);
      if(index != -1)
      {
        this.List1_0.splice(index,1);
        j--;
      }        
    }

    this.ListAll = this.List1_0.concat(this.ListAll);
    for( let j =0 ; j< this.ListAll.length; j++) 
    {  
      let index = this.List0_1.map(function(a) {return a.id}).indexOf(this.ListAll[j].id);
      if(index != -1)
      {
          this.List0_1.splice(index,1);
      }        
    }

    this.ListAll = this.List0_1.concat(this.ListAll);
    for( let j =0 ; j< this.ListAll.length; j++) 
    {  
      let index = this.List0_0.map(function(a) {return a.id}).indexOf(this.ListAll[j].id);
      if(index != -1)
      {
          this.List0_0.splice(index,1);
      }        
    }
    console.log(this.List1_0)
    this.ListAll = this.List0_0.concat(this.ListAll);


    
    for(let i=0; i<this.List3_1.length; i++)
    {
      if(this.List3_1[i].top_bid != null)
      {
        this.List3_1Somme += this.List3_1[i].top_bid;
      }
      else if(this.List3_1[i].starting_price != null)
      {
        this.List3_1Somme += this.List3_1[i].starting_price;
      }
      else{
        this.List3_1Somme += this.List3_1[i].buyout_price;
      }
    } 


    for(let i=0; i<this.List3_0.length; i++)
    {
      if(this.List3_0[i].top_bid != null)
      {
        this.List3_0Somme += this.List3_0[i].top_bid;
      }
      else if(this.List3_0[i].starting_price != null)
      {
        this.List3_0Somme += this.List3_0[i].starting_price;
      }
      else{
        this.List3_0Somme += this.List3_0[i].buyout_price;
      }
    } 

    for(let i=0; i<this.List2_1.length; i++)
    {
      if(this.List2_1[i].top_bid != null)
      {
        this.List2_1Somme += this.List2_1[i].top_bid;
      }
      else if(this.List2_1[i].starting_price != null)
      {
        this.List2_1Somme += this.List2_1[i].starting_price;
      }
      else{
        this.List2_1Somme += this.List2_1[i].buyout_price;
      }
    } 

    for(let i=0; i<this.List2_0.length; i++)
    {
      if(this.List2_0[i].top_bid != null)
      {
        this.List2_0Somme += this.List2_0[i].top_bid;
      }
      else if(this.List2_0[i].starting_price != null)
      {
        this.List2_0Somme += this.List2_0[i].starting_price;
      }
      else{
        this.List2_0Somme += this.List2_0[i].buyout_price;
      }
    } 

    for(let i=0; i<this.List1_1.length; i++)
    {
      if(this.List1_1[i].top_bid != null)
      {
        this.List1_1Somme += this.List1_1[i].top_bid;
      }
      else if(this.List1_1[i].starting_price != null)
      {
        this.List1_1Somme += this.List1_1[i].starting_price;
      }
      else{
        this.List1_1Somme += this.List1_1[i].buyout_price;
      }
    } 

    for(let i=0; i<this.List1_0.length; i++)
    {
      if(this.List1_0[i].top_bid != null)
      {
        this.List1_0Somme += this.List1_0[i].top_bid;
      }
      else if(this.List1_0[i].starting_price != null)
      {
        this.List1_0Somme += this.List1_0[i].starting_price;
      }
      else{
        this.List1_0Somme += this.List1_0[i].buyout_price;
      }
    } 
    
    for(let i=0; i<this.List0_1.length; i++)
    {
      if(this.List0_1[i].top_bid != null)
      {
        this.List0_1Somme += this.List0_1[i].top_bid;
      }
      else if(this.List0_1[i].starting_price != null)
      {
        this.List0_1Somme += this.List0_1[i].starting_price;
      }
      else{
        this.List0_1Somme += this.List0_1[i].buyout_price;
      }
    } 

    for(let i=0; i<this.List0_0.length; i++)
    {
      if(this.List0_0[i].top_bid != null)
      {
        this.List0_0Somme += this.List0_0[i].top_bid;
      }
      else if(this.List0_0[i].starting_price != null)
      {
        this.List0_0Somme += this.List0_0[i].starting_price;
      }
      else{
        this.List0_0Somme += this.List0_0[i].buyout_price;
      }
    } 
    
    console.log(this.List3_1Somme +"*16384\n "+ this.List3_0Somme +"*3072\n "+ this.List2_1Somme +"*921\n "+ this.List2_0Somme +"*204\n "+ 
      this.List1_1Somme +"*32\n "+ this.List1_0Somme +"*4\n "+ this.List0_1Somme +"*0.4\n "+ this.List0_0Somme +"*0.02\n ")
    this.SommeTotal = this.List3_1Somme * 16384 + this.List3_0Somme * 3072 + this.List2_1Somme * 921 + this.List2_0Somme * 204 + 
      this.List1_1Somme * 32 + this.List1_0Somme * 4 + this.List0_1Somme * 0.4 + this.List0_0Somme * 0.02;
    console.log("somme = " + this.SommeTotal)


    console.log(this.List3_1.length +"*16384\n "+ this.List3_0.length +"*3072\n " + this.List2_1.length +"*921\n " + this.List2_0.length +"*204\n "+ 
      this.List1_1.length +"*32\n "+ this.List1_0.length +"*4\n "+ this.List0_1.length +"*0.4\n "+ this.List0_0.length +"*0.02")

    this.Coef = this.List3_1.length * 16384 + this.List3_0.length * 3072 + this.List2_1.length * 921 + this.List2_0.length * 204 + 
    this.List1_1.length * 32 + this.List1_0.length * 4 + this.List0_1.length * 0.4 + this.List0_0.length * 0.02;
    console.log("coef =\n " + this.Coef)

    this.MoyenneEstimation = this.SommeTotal / this.Coef;
    console.log(this.MoyenneEstimation)
    console.log(this.ListAll)

   



    

  }


  wait(ms: number){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }



}
