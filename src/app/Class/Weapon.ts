
    export interface Patchlog {
    }

    export interface Components {
    }

    export interface Introduced {
        name: string;
        url: string;
        aliases: any[];
        parent: string;
        date: string;
    }

    export interface Pellet {
        name: string;
        count: number;
    }

    export interface Falloff {
        start: number;
        end: number;
        reduction: number;
    }

    export interface Damage {
        impact: number;
        puncture: number;
        slash: number;
        heat: number;
        cold: number;
        electric: number;
        toxin: number;
        gas: number;
        viral: number;
        corrosive: number;
        blast: number;
        magnetic: number;
        radiation: number;
        true: number;
        void: number;
    }

    export interface Radial {
    }

    export interface Slam {
        damage: number;
        radial: Radial;
    }

    export interface Attack {
        name: string;
        duration: number;
        radius: number;
        speed: number;
        pellet: Pellet;
        crit_chance: number;
        crit_mult: number;
        status_chance: number;
        charge_time: number;
        shot_type: number;
        flight: number;
        falloff: Falloff;
        damage: Damage;
        slide: string;
        jump: string;
        wall: string;
        channeling: number;
        slam: Slam;
    }

    export interface Weapon {
        name: string;
        uniqueName: string;
        patchlogs: Patchlog[];
        components: Components;
        description: string;
        type: string;
        tradable: boolean;
        introduced: Introduced;
        category: string;
        productCategory: string;
        imageName: string;
        estimatedVaultDate: string;
        url: string;
        mr: number;
        riven_disposition: number;
        polarities: string[];
        thumbnail: string;
        tags: string[];
        vaulted: boolean;
        marketCost: string;
        bpCost: string;
        attacks: Attack[];
        masteryReq: number;
        buildPrice: number;
        buildTime: number;
        skipBuildTimePrice: number;
        buildQuantity: number;
        consumeOnBuild: boolean;
        wikiaThumbnail: string;
        wikiaUrl: string;
        criticalChance: number;
        criticalMultiplier: number;
        disposition: number;
        fireRate: number;
        omegaAttenuation: number;
        procChance: number;
        releaseDate: number;
        slot: number;
        totalDamage: number;
        vaultDate: string;
        accuracy: number;
        ammo: number;
        magazineSize: number;
        multishot: number;
        noise: string;
        trigger: string;
    }


