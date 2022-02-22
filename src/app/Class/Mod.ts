export class Mod {

    baseDrain: number;
    category: string;
    compatName: string;
    fusionLimit: number;
    imageName: string;
    introduced: Introduced;
    isAugment: boolean;
    levelStats: LevelStat[];
    name: string;
    polarity: string;
    rarity: string;
    releaseDate: string;
    tradable: boolean;
    transmutable: boolean;
    type: string;
    uniqueName: string;
    wikiaThumbnail: string;
    wikiaUrl: string;
    i18n: string;
    excludeFromCodex? : boolean;

}

export interface LevelStat {
    stats: string[];
}

export interface Introduced {
    name: string;
    url: string;
    aliases: string[];
    parent: string;
    date: string;
}