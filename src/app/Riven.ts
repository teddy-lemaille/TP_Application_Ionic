export class Rolled {
    itemType: string;
    compatibility: string;
    rerolled: boolean;
    avg: number;
    stddev: number;
    min: number;
    max: number;
    pop: number;
    median: number;
}
export interface Arme {
    rerolled: Rolled;
    unrolled: Rolled;
}


export interface Result {
    " " : Arme;
    arme : Arme;
    "Arca Titron": Arme;
    "Arca Plasmor": Arme;
    "Arca Scisco": Arme;
    "Dual Heat Swords": DarkSplitSword;

  }
  
  export interface DarkSplitSword {
    rerolled: Rolled;
    unrolled: Rolled;
  }
  
