import { Component, OnInit } from '@angular/core';
import { API } from '../API';
import { APIMarket } from '../APIMarket';
import { Mod } from '../Class/Mod';
import { Order, Payload, PayloadRootObject } from '../Class/Order';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  api: API;
  apiMarket: APIMarket;
  List: Mod[] = [];
  ListOrder: Order[];
  payloadroot: PayloadRootObject;
  ListModPrice: Array<ModPrice> = [];
  i:number = 0;
  NbrDeVendeur: number = 1;
  NbMaxMod:number;
  ListType = [];
  ListTypeCheckboxisChecked = [];
  listStatic: string[] = [];
  ValeurMin: number = 5;

 // Liste de mod qui soit ne sont , soit plus en jeu, soit pas tradable, soit dispo dans la version chinois
  ListNomSupprime : string[] = ["Air Martial", "Amalgam Argonak Metal Auger", "Amalgam Barrel Diffusion", "Amalgam Daikyu Target Acquired",
 "Amalgam Furax Body Count", "Amalgam Javlok Magazine Warp", "Amalgam Organ Shatter", "Amalgam Ripkas True Steel", "Amalgam Serration", 
 "Amalgam Shotgun Spazz", "Ambush Optics", "Augmented Sonar", "Do Not Use", "Do Not Use", "Fizzbang Flourish", "Harrowed Hook", 
 "Primed Fast Deflection" , "Primed Shred", "Primed Streamline", "Primed Sure Footed", "Primed Vigor", "Resilient Focus", "Soaring Truth",
 "Strategic Pursuit","Martial Magnetism", "Tracking Shot"];
  
 ListModGroupAllCheckboxisChecked : boolean = false;


 
 GroupAll()
 {
  if ( this.ListModGroupAllCheckboxisChecked == true) 
  {
    this.ListModGroupWarframeCheckboxisChecked = true;
    this.GroupWarframe();
    this.ListModGroupWarframeCheckboxisChecked = false;

    this.ListModGroupWeaponCheckboxisChecked = true;
    this.GroupWeapon();
    this.ListModGroupWeaponCheckboxisChecked = false;
  
    this.ListModGroupCompanionCheckboxisChecked = true;
    this.GroupCompanion();
    this.ListModGroupCompanionCheckboxisChecked = false;

    this.ListModGroupArchwingCheckboxisChecked = true;
    this.GroupArchwing();
    this.ListModGroupArchwingCheckboxisChecked = false; 

    this.ListModK_DrivesCheckboxisChecked = false;
    
    this.ListModGroupAugmentCheckboxisChecked = true;
    this.GroupAugment();
    this.ListModGroupAugmentCheckboxisChecked = false;   
    
    this.ListModGroupConclaveCheckboxisChecked = true;
    this.GroupConclave();
    this.ListModGroupConclaveCheckboxisChecked = false;

  }else{
    this.ListModGroupWarframeCheckboxisChecked = false;
    this.GroupWarframe();
    this.ListModGroupWarframeCheckboxisChecked = true;
    
    this.ListModGroupWeaponCheckboxisChecked = false;
    this.GroupWeapon();
    this.ListModGroupWeaponCheckboxisChecked = true;
  
    this.ListModGroupCompanionCheckboxisChecked = false;
    this.GroupCompanion();
    this.ListModGroupCompanionCheckboxisChecked = true;

    this.ListModGroupArchwingCheckboxisChecked = false;
    this.GroupArchwing();
    this.ListModGroupArchwingCheckboxisChecked = true; 

    this.ListModK_DrivesCheckboxisChecked = true;
    
    this.ListModGroupAugmentCheckboxisChecked = false;
    this.GroupAugment();
    this.ListModGroupAugmentCheckboxisChecked = true;   
    
    this.ListModGroupConclaveCheckboxisChecked = false;
    this.GroupConclave();
    this.ListModGroupConclaveCheckboxisChecked = true;
  }
 }
 
//Liste fait depuis https://warframe.fandom.com/wiki/Mod/List_of_Mods#Warframe

ListModGroupWarframeCheckboxisChecked : boolean = true;
GroupWarframe()
{
  if ( this.ListModGroupWarframeCheckboxisChecked == true) 
  {
    this.ListModWarframeCheckboxisChecked = false;
    this.ListModAuraCheckboxisChecked = false;
  }else{
    this.ListModWarframeCheckboxisChecked = true;
    this.ListModAuraCheckboxisChecked = true;
  }
}

ListModWarframeCheckboxisChecked : boolean = true;
ListModWarframe: string[] = ["Adaptation", "Adept Surge", "Adrenaline Boost", "Aero Vantage", "Agility Drift", "Air Thrusters", "Anti-Flak Plating", "Anticipation", 
"Antitoxin", "Armored Acrobatics", "Armored Agility", "Armored Evade", "Armored Recovery", "Augur Accord", "Augur Message", "Augur Reach", "Augur Secrets", 
"Aviator", "Battering Maneuver", "Blind Rage", "Calculated Spring", "Carnis Carapace", "Coaction Drift", "Constitution", "Continuity", "Cunning Drift", "Diamond Skin", 
"Endurance Drift", "Enemy Sense", "Energy Conversion", "Equilibrium", "Fast Deflection", "Final Act", "Firewalker", "Flame Repellent", "Fleeting Expertise", 
"Flow", "Follow Through", "Fortitude", "Gladiator Aegis", "Gladiator Finesse", "Gladiator Resolve", "Handspring", "Hastened Steps", "Health Conversion", 
"Heavy Impact", "Heightened Reflexes", "Hunter Adrenaline", "Ice Spring", "Insulation", "Intensify", "Lightning Dash", "Lightning Rod", "Maglev", "Master Thief", 
"Mecha Pulse", "Mobilize", "Motus Signal", "Narrow Minded", "Natural Talent", "No Current Leap", "Overcharge Detectors", "Overcharged", "Overextended", "Pain Threshold", 
"Patagium", "Peculiar Bloom", "Peculiar Growth", "Piercing Step", "Power Drift", "Preparation", "Primed Continuity", "Primed Flow", "Primed Sure Footed", "Primed Vigor", 
"Proton Pulse", "Provoked", "Quick Charge", "Quick Thinking", "Rage", "Rapid Resilience", "Redirection", "Reflection", "Reflex Guard", "Rending Turn", "Retribution", 
"Rime Vault", "Rising Skill", "Rolling Guard", "Rush", "Searing Leap", "Shock Absorbers", "Speed Drift", "Stealth Drift", "Steel Fiber", "Strain Consume", 
"Streamline", "Streamlined Form", "Stretch", "Sure Footed", "Surplus Diverters", "Synth Reflex", "Tactical Retreat", "Tek Collateral", "Tempered Bound", "Thief's Wit", 
"Toxic Flight", "Transient Fortitude", "Umbral Fiber", "Umbral Intensify", "Umbral Vitality", "Undying Will", "Venomous Rise", "Vigilante Pursuit", "Vigilante Vigor", 
"Vigor", "Vigorous Swap", "Vital Systems Bypass", "Vitality", "Voltaic Lance", "Warm Coat"]

ListModAuraCheckboxisChecked : boolean = true;
ListModAura: string[] = ["Aerodynamic", "Brief Respite", "Combat Discipline", "Corrosive Projection", "Dead Eye", "Empowered Blades", "EMP Aura", "Enemy Radar", "Energy Siphon", "Growing Power", "Infested Impedance", "Loot Detector", "Mecha Empowered", "Melee Guidance", "Physique", "Pistol Amp", "Pistol Scavenger", 
"Power Donation", "Rejuvenation", "Rifle Amp", "Rifle Scavenger", "Shepherd", "Shield Disruption", "Shotgun Amp", "Shotgun Scavenger", "Sniper Scavenger", "Speed Holster", 
"Sprint Boost", "Stand United", "Steel Charge", "Swift Momentum", "Toxin Resistance" ]


ListModGroupWeaponCheckboxisChecked : boolean = true;
GroupWeapon()
{
  if ( this.ListModGroupWeaponCheckboxisChecked == true) 
  {
    this.ListModWeaponPrimaryCheckboxisChecked = false;
    this.ListModWeaponRifleCheckboxisChecked = false;
    this.ListModWeaponAssault_RifleCheckboxisChecked = false;
    this.ListModWeaponShotgunCheckboxisChecked = false;
    this.ListModWeaponSniperCheckboxisChecked = false;
    this.ListModWeaponBowCheckboxisChecked = false;
    this.ListModWeaponPistolCheckboxisChecked = false;
    this.ListModWeaponMeleeCheckboxisChecked = false;
    this.ListModWeaponStanceCheckboxisChecked = false;

  }else{
    this.ListModWeaponPrimaryCheckboxisChecked = true;
    this.ListModWeaponRifleCheckboxisChecked = true;
    this.ListModWeaponAssault_RifleCheckboxisChecked = true;
    this.ListModWeaponShotgunCheckboxisChecked = true;
    this.ListModWeaponSniperCheckboxisChecked = true;
    this.ListModWeaponBowCheckboxisChecked = true;
    this.ListModWeaponPistolCheckboxisChecked = true;
    this.ListModWeaponMeleeCheckboxisChecked = true;
    this.ListModWeaponStanceCheckboxisChecked = true;
  }
}

ListModWeaponPrimaryCheckboxisChecked : boolean = true;
ListModWeaponPrimary: string[] = ["Aero Periphery", "Hunter Munitions", "Hunter Track", "Vigilante Armaments", "Vigilante Fervor", "Vigilante Offense", 
"Vigilante Supplies"]

ListModWeaponRifleCheckboxisChecked : boolean = true;
ListModWeaponRifle: string[] = ["Adhesive Blast", "Agile Aim", "Amalgam Serration", "Ammo Drum", "Apex Predator", "Argon Scope", "Bane of Corpus", "Bane of Corrupted", 
"Bane of Grineer", "Bane of Infested", "Bladed Rounds", "Catalyzer Link", "Cautious Shot", "Combustion Beam", "Comet Rounds", "Continuous Misery", "Crash Course", 
"Critical Delay", "Cryo Rounds", "Eagle Eye", "Fanged Fusillade", "Fast Hands", "Firestorm", "Hammer Shot", "Heavy Caliber", "Hellfire", "High Voltage", "Hush", 
"Infected Clip", "Lucky Shot", "Magazine Warp", "Malignant Force", "Metal Auger", "Piercing Caliber", "Piercing Hit", "Point Strike", "Primed Bane of Corpus", 
"Primed Bane of Corrupted", "Primed Bane of Grineer", "Primed Bane of Infested", "Primed Cryo Rounds", "Primed Fast Hands", "Primed Firestorm", "Primed Shred", 
"Proton Jet", "Recover", "Rifle Aptitude", "Rime Rounds", "Ripper Rounds", "Rupture", "Sawtooth Clip", "Serrated Rounds", "Serration", "Shred", "Sinister Reach", 
"Speed Trigger", "Split Chamber", "Stabilizer", "Stormbringer", "Terminal Velocity", "Thermite Rounds", "Twitch", "Vanquished Prey", "Vile Acceleration", 
"Vile Precision", "Vital Sense", "Wildfire"]

ListModWeaponAssault_RifleCheckboxisChecked : boolean = true;
ListModWeaponAssault_Rifle: string[] = ["Deft Tempo", "Guided Ordnance", "Gun Glide", "Hydraulic Gauge", "Loose Hatch", "Maximum Capacity", "Overview", 
"Rifle Ammo Mutation", "Primed Rifle Ammo Mutation", "Spring-Loaded Chamber", "Tactical Reload", "Tainted Mag" ]

ListModWeaponShotgunCheckboxisChecked : boolean = true;
ListModWeaponShotgun: string[] = ["Accelerated Blast", "Amalgam Shotgun Spazz", "Ammo Stock", "Blaze", "Blunderbuss", "Bounty Hunter", "Breach Loader", "Broad Eye", 
"Burdened Magazine", "Charged Shell", "Chilling Grasp", "Chilling Reload", "Cleanse Corpus", "Cleanse Corrupted", "Cleanse Grineer", "Cleanse Infested", 
"Contagious Spread", "Crash Shot", "Critical Deceleration", "Disruptor", "Double-Barrel Drift", "Fatal Acceleration", "Flak Shot", "Flechette", "Frail Momentum", 
"Frigid Blast", "Full Contact", "Hell's Chamber", "Hydraulic Chamber", "Incendiary Coat", "Kill Switch", "Laser Sight", "Lingering Torment", "Loaded Capacity", 
"Lock and Load", "Loose Chamber", "Momentary Pause", "Motus Setup", "Nano-Applicator", "Narrow Barrel", "Point Blank", "Primed Charged Shell", 
"Primed Chilling Grasp", "Primed Cleanse Corpus", "Primed Cleanse Corrupted", "Primed Cleanse Grineer", "Primed Cleanse Infested", "Primed Ravage", 
"Primed Point Blank", "Primed Shotgun Ammo Mutation", "Prize Kill", "Ravage", "Repeater Clip", "Scattering Inferno", "Seeking Force", "Seeking Fury", "Shell Compression", 
"Shell Shock", "Shotgun Ammo Mutation", "Shotgun Savvy", "Shotgun Spazz", "Shrapnel Shot", "Shred Shot", "Shredder", "Silent Battery", "Snap Shot", "Soft Hands", 
"Sweeping Serration", "Tactical Pump", "Tainted Shell", "Toxic Barrage", "Vicious Spread"]

ListModWeaponSniperCheckboxisChecked : boolean = true;
ListModWeaponSniper: string[] = ["Aero Agility", "Charged Chamber", "Depleted Reload", "Emergent Aftermath", "Harkonar Scope", "Lie In Wait", "Primed Chamber", 
"Sharpshooter", "Sniper Ammo Mutation", "Target Acquired"]

ListModWeaponBowCheckboxisChecked : boolean = true;
ListModWeaponBow: string[] = ["Arrow Mutation", "Feathered Arrows", "Plan B", "Soaring Strike", "Split Flights", "Thunderbolt"]

ListModWeaponPistolCheckboxisChecked : boolean = true;
ListModWeaponPistol: string[] = ["Air Recon", "Amalgam Barrel Diffusion", "Anemic Agility", "Augur Pact", "Augur Seeker", "Barrel Diffusion", "Blind Shot", "Bore", 
"Calculated Victory", "Carnis Stinger", "Concealed Explosives", "Concussion Rounds", "Convulsion", "Creeping Bullseye", "Deep Freeze", "Eject Magazine", 
"Embedded Catalyzer", "Expel Corpus", "Expel Corrupted", "Expel Grineer", "Expel Infested", "Frostbite", "Full Capacity", "Fulmination", "Gunslinger", 
"Hawk Eye", "Heated Charge", "Heavy Warhead", "Hollow Point", "Hornet Strike", "Hydraulic Barrel", "Hydraulic Crosshairs", "Ice Storm", "Impaler Munitions", 
"Jolt", "Jugulus Spines", "Lethal Momentum", "Lethal Torrent", "Loose Magazine", "Magnum Force", "Maim", "Meteor Munitions", "Night Stalker", "No Return", 
"Pathogen Rounds", "Perpetual Agony", "Pistol Ammo Mutation", "Pistol Gambit", "Pistol Pestilence", "Pressurized Magazine", "Primed Expel Corpus", 
"Primed Expel Corrupted", "Primed Expel Grineer", "Primed Expel Infested", "Primed Fulmination", "Primed Heated Charge", "Primed Pistol Ammo Mutation", 
"Primed Pistol Gambit", "Primed Quickdraw", "Primed Slip Magazine", "Primed Target Cracker", "Pummel", "Quickdraw", "Razor Munitions", "Razor Shot", "Recuperate", 
"Reflex Draw", "Ruinous Extension", "Saxum Spittle", "Scorch", "Secondary Wind", "Seeker", "Sharpened Bullets", "Slip Magazine", "Spry Sights", "Steady Hands", 
"Strafing Slide", "Stunning Speed", "Suppress", "Sure Shot", "Synth Charge", "Tainted Clip", "Target Cracker", "Targeting Subsystem", "Trick Mag"]

ListModWeaponMeleeCheckboxisChecked : boolean = true;
ListModWeaponMelee: string[] = [ 
"Amalgam Organ Shatter", "Auger Strike", "Berserker Fury", "Blood Rush", "Body Count", "Buzz Kill", "Collision Force", "Condition Overload", "Corrupt Charge", 
"Counterweight", "Covert Lethality", "Dispatch Overdrive", "Drifting Contact", "Enduring Affliction", "Enduring Strike", "Energy Channel", "Explosive Demise", 
"Fever Strike", "Finishing Touch", "Focus Energy", "Focused Defense", "Fury", "Gladiator Might", "Gladiator Rush", "Gladiator Vice", "Guardian Derision", 
"Healing Return", "Heartseeker", "Heavy Trauma", "Impenetrable Offense", "Jagged Edge", "Killing Blow", "Lasting Sting", "Life Strike", "Maiming Strike", 
"Martial Fury", "Melee Prowess", "Molten Impact", "Mortal Conduct", "Motus Impact", "North Wind", "Organ Shatter", "Parry", "Power Throw", "Pressure Point", 
"Primed Fever Strike", "Primed Fury", "Primed Heavy Trauma", "Primed Pressure Point", "Primed Reach", "Primed Smite Corpus", "Primed Smite Corrupted", 
"Primed Smite Grineer", "Primed Smite Infested", "Proton Snap", "Quick Return", "Quickening", "Reach", "Rebound", "Reflex Coil", "Relentless Assault", 
"Relentless Combination", "Rending Strike", "Sacrificial Pressure", "Sacrificial Steel", "Seismic Wave", "Serrated Edges", "Sharpened Blade", "Shattering Impact", 
"Shocking Touch", "Smite Corpus", "Smite Corrupted", "Smite Grineer", "Smite Infested", "Spoiled Strike", "Spring-Loaded Blade", "Stand Ground", "Strain Infection", 
"Sundering Strike", "Sword Alone", "Tek Gravity", "True Punishment", "True Steel", "Vicious Frost", "Virulent Scourge", "Volcanic Edge", "Voltaic Strike", 
"Weeping Wounds", "Whirlwind"]

ListModWeaponStanceCheckboxisChecked : boolean = true;
ListModWeaponStance: string[] = ["Argent Scourge", "Astral Twilight", "Atlantis Vulcan", "Biting Piranha", "Bleeding Willow", "Blind Justice", "Brutal Tide", 
"Bullet Dance", "Burning Wasp", "Butcher's Revelry", "Carving Mantis", "Celestial Nightfall", "Clashing Forest", "Cleaving Whirlwind", "Coiling Viper", 
"Crashing Havoc", "Crashing Timber", "Crimson Dervish", "Crossing Snakes", "Crushing Ruin", "Cunning Aspect", "Cyclone Kraken", "Decisive Judgement", 
"Defiled Snapdragon", "Dividing Blades", "Eleventh Storm", "Fateful Truth", "Final Harbinger", "Flailing Branch", "Four Riders", "Fracturing Wind", "Gaia's Tragedy", 
"Gemini Cross", "Gleaming Talon", "Gnashing Payara", "Grim Fury", "High Noon", "Homing Fang", "Iron Phoenix", "Lashing Coil", "Last Herald", "Mafic Rain", 
"Malicious Raptor", "Noble Cadence", "Piercing Fury", "Pointed Wind", "Quaking Hand", "Reaping Spiral", "Rending Crane", "Rending Wind", "Rising Steel", 
"Scarlet Hurricane", "Seismic Palm", "Shadow Harvest", "Shattering Storm", "Shimmering Blight", "Sinking Talon", "Slicing Feathers", "Sovereign Outcast", 
"Spinning Needle", "Stalking Fan", "Star Divide", "Stinging Thorn", "Sundering Weave", "Swirling Tiger", "Swooping Falcon", "Tainted Hydra", "Tempo Royale", 
"Tranquil Cleave", "Twirling Spire", "Vengeful Revenant", "Vermillion Storm", "Vicious Approach", "Votive Onslaught", "Vulpine Mask", "Wise Razor"]


ListModGroupCompanionCheckboxisChecked : boolean = false;
GroupCompanion()
{
  if ( this.ListModGroupCompanionCheckboxisChecked == true) 
  {
    this.ListModCompanionCheckboxisChecked= false;
    this.ListModCompanionRoboticCheckboxisChecked = false;
    this.ListModCompanionSentinelCheckboxisChecked = false;
    this.ListModCompanionMOACheckboxisChecked = false;
    this.ListModCompanionBeastCheckboxisChecked = false;
    this.ListModCompanionKubrowCheckboxisChecked= false;
    this.ListModCompanionKavatCheckboxisChecked = false;
    this.ListModCompanionHoundCheckboxisChecked = false;

    
  }else{
   this.ListModCompanionCheckboxisChecked = true;
   this.ListModCompanionRoboticCheckboxisChecked = true;   
   this.ListModCompanionSentinelCheckboxisChecked = true;
   this.ListModCompanionMOACheckboxisChecked = true;
   this.ListModCompanionBeastCheckboxisChecked = true;
   this.ListModCompanionKubrowCheckboxisChecked= true;
   this.ListModCompanionKavatCheckboxisChecked = true;
   this.ListModCompanionHoundCheckboxisChecked = true;
  }
}

ListModCompanionCheckboxisChecked : boolean = false;
ListModCompanion: string[] = ["Animal Instinct", "Calculated Redirection", "Enhanced Vitality", "Link Armor", "Link Health", "Link Shields", "Loyal Companion", 
"Medi-Pet Kit", "Metal Fiber", "Pack Leader", "Primed Animal Instinct", "Primed Pack Leader"]

ListModCompanionRoboticCheckboxisChecked : boolean = false;
ListModCompanionRobotic: string[] = ["Anti-Grav Array", "Coolant Leak", "Guardian", "Medi-Ray", "Sanctuary", "Shield Charger", "Vacuum"]

ListModCompanionSentinelCheckboxisChecked : boolean = false;
ListModCompanionSentinel: string[] = ["Accelerated Deflection", "Ambush", "Ammo Case", "Animal Instinct", "Arc Coil", "Assault Mode", "Auto Omni", 
"Calculated Redirection", "Calculated Shot", "Cordon", "Crowd Dispersion", "Detect Vulnerability", "Electro Pulse", "Energy Generator", "Enhanced Vitality", 
"Fatal Attraction", "Fired Up", "Ghost", "Investigator", "Looter", "Metal Fiber", "Molecular Conversion", "Negate", "Odomedic", "Primed Regen", "Reawaken", "Regen", 
"Repair Kit", "Revenge", "Sacrifice", "Sanctuary", "Scan Aquatic Lifeforms", "Scan Matter", "Self Destruct", "Spare Parts", "Synth Deconstruct", "Synth Fiber", 
"Targeting Receptor", "Thumper", "Vaporize"]

ListModCompanionMOACheckboxisChecked : boolean = false;
ListModCompanionMOA: string[] = ["Anti-Grav Grenade", "Security Override", "Shockwave Actuators", "Stasis Field", "Tractor Beam", "Whiplash Mine"]

ListModCompanionBeastCheckboxisChecked : boolean = false;
ListModCompanionBeast: string[] = ["Bite", "Fetch", "Flame Gland", "Frost Jaw", "Hastened Deflection", "Hunter Command", "Hunter Recovery", "Hunter Synergy", 
"Maul", "Scavenge", "Shelter", "Shock Collar", "Venom Teeth"]

ListModCompanionKubrowCheckboxisChecked : boolean = false;
ListModCompanionKubrow: string[] = ["Dig", "Ferocity", "Howl", "Hunt", "Mecha Overdrive", "Mecha Recharge", "Neutralize", "Proboscis", "Protect", "Retrieve", 
"Savagery", "Stalk", "Strain Eruption", "Strain Fever", "Trample", "Unleashed"]

ListModCompanionKavatCheckboxisChecked : boolean = false;
ListModCompanionKavat: string[] = ["Cat's Eye", "Charm", "Draining Bite", "Mischief", "Pounce", "Reflect", "Sense Danger", "Sharpened Claws", "Swipe", 
"Tek Assault", "Tek Enhance", "Territorial Aggression", "Transfusion"]

ListModCompanionHoundCheckboxisChecked : boolean = false;
ListModCompanionHound: string[] = ["Aerial Prospectus", "Diversified Denial", "Equilibrium Audit", "Evasive Denial", "Focused Prospectus", "Null Audit", 
"Reflex Denial", "Repo Audit", "Synergized Prospectus"]


ListModGroupArchwingCheckboxisChecked : boolean = false;
GroupArchwing()
{
  if ( this.ListModGroupArchwingCheckboxisChecked == true) 
  {
    this.ListModArchwingCheckboxisChecked = false;
    this.ListModArchwing_GunCheckboxisChecked = false;
    this.ListModArchwing_MeleeCheckboxisChecked = false;
    
  }else{
    this.ListModArchwingCheckboxisChecked = true;
    this.ListModArchwing_GunCheckboxisChecked = true;
    this.ListModArchwing_MeleeCheckboxisChecked = true;
  }
}

ListModArchwingCheckboxisChecked : boolean = false;
ListModArchwing: string[] = ["Afterburner", "Argon Plating", "Auxiliary Power", "Cold Snap", "Efficient Transferral", "Energy Amplifier", "Energy Field", 
"Energy Inversion", "Enhanced Durability", "Hyperion Thrusters", "Kinetic Diversion", "Morphic Transformer", "Primed Morphic Transformer", "Superior Defenses", 
"System Reroute"]

ListModArchwing_GunCheckboxisChecked : boolean = false;
ListModArchwing_Gun: string[] = ["Ammo Chain", "Archgun Ace", "Automatic Trigger", "Ballista Measure", "Charged Bullets", "Combustion Rounds", "Comet Blast", 
"Contamination Casing", "Critical Focus", "Deadly Efficiency", "Dual Rounds", "Electrified Barrel", "Hollowed Bullets", "Hypothermic Shell", "Magazine Extension", 
"Magma Chamber", "Marked Target", "Modified Munitions", "Parallax Scope", "Polar Magazine", "Primed Rubedo-Lined Barrel", "Quasar Drill", "Quick Reload", 
"Resolute Focus", "Rubedo-Lined Barrel", "Sabot Rounds", "Shell Rush", "Venomous Clip", "Zodiac Shred"]

ListModArchwing_MeleeCheckboxisChecked : boolean = false;
ListModArchwing_Melee: string[] = ["Astral Autopsy", "Astral Slash", "Blazing Steel", "Bleeding Edge", "Cryo Coating", "Cutting Edge", "Extend", "Furor", 
"Conductive Blade", "Glacial Edge", "Infectious Injection", "Ion Infusion", "Meteor Crash", "Nebula Bore", "Poisonous Sting", "Searing Steel", "Sudden Impact", 
"Tempered Blade"]




ListModK_DrivesCheckboxisChecked : boolean = false;
ListModK_Drives: string[] = ["Air Time", "Bomb The Landin'", "Cold Arrival", "Extreme Velocity", "Inertia Dampeners", "Juice", "Kinetic Friction", "Mad Stack", 
"Mag Locks", "Nitro Boost", "Perfect Balance", "Poppin' Vert", "Pop Top", "Primo Flair", "Quick Escape", "Rail Guards", "Slay Board", "Sonic Boost", "Thrash Landing", 
"Trail Blazer", "Vapor Trail", "Venerdo Hoverdrive"]






ListModGroupAugmentCheckboxisChecked : boolean = false;
GroupAugment()
{
  if ( this.ListModGroupAugmentCheckboxisChecked == true) 
  {
    this.ListModAugmentWarframeCheckboxisChecked = false;
    this.ListModAugmentWarframePvpCheckboxisChecked = false;
    this.ListModAugmentWeaponCheckboxisChecked = false;
  }else{
    this.ListModAugmentWarframeCheckboxisChecked = true;
    this.ListModAugmentWeaponCheckboxisChecked = true;
    this.ListModAugmentWarframePvpCheckboxisChecked = true;
  }
}

ListModAugmentWarframeCheckboxisChecked : boolean = false;
ListModAugmentWarframe: string[] = ["Seeking Shuriken", "Smoke Shadow", "Fatal Teleport", "Rising Storm", "Rubble Heap", "Path of Statues", "Tectonic Fracture",
"Ore Gaze", "Rumbled", "Titanic Rumbler", "Sonic Fracture", "Resonance", "Savage Silence", "Resonating Quake", "Endless Lullaby", "Reactive Storm", 
"Afterburn", "Everlasting Ward", "Vexing Retaliation", "Guided Effigy", "Fireball Frenzy", "Immolated Radiance", "Healing Flame", "Purifying Flames", 
"Exothermic", "Duality", "Calm & Frenzy", "Peaceful Provocation", "Energy Transfer", "Purging Slash", "Surging Dash", "Radiant Finish", "Furious Javelin", 
"Chromatic Blade", "Freeze Force", "Ice Wave Impedance", "Chilling Globe", "Icy Avalanche", "Mending Splinters", "Spectrosiphon", "Dread Ward", "Blood Forge",
"Blending Talons", "Mach Crash", "Catapult", "Hearty Nourishment", "Tribunal", "Warding Thurible", "Lasting Covenant", "Balefire Surge", "Blazing Pillage",
"Corroding Barrage", "Tidal Impunity", "Curative Undertow", "Pilfering Swarm", "Desiccation's Curse", "Elemental Sandstorm", "Negation Swarm", 
"Empowered Quiver", "Power of Three", "Piercing Navigator", "Infiltrate", "Concentrated Arrow", "Accumulating Whipclaw", "Venari Bodyguard", 
"Pilfering Strangledome", "Swift Bite", "Rift Haven", "Rift Torrent", "Cataclysmic Continuum", "Deceptive Bond", "Savior Decoy", "Hushed Invisibility", 
"Safeguard Switch", "Irradiating Disarm", "Greedy Pull", "Magnetized Discharge", "Counter Pulse", "Fracturing Crush", "Ballistic Bullseye", "Muzzle Flash", 
"Staggering Shield", "Mesa's Waltz", "Hall of Malevolence", "Explosive Legerdemain", "Total Eclipse", "Prism Guard", "Soul Survivor", "Creeping Terrify", 
"Despoil", "Shield of Shadows", "Controlled Slide", "Pyroclastic Flow", "Reaping Chakram", "Safeguard", "Abundant Mutation", "Teeming Virulence", 
"Larva Burst", "Insatiable", "Neutron Star", "Antimatter Absorb", "Escape Velocity", "Molecular Fission", "Mind Freak", "Pacifying Bolts", "Chaos Sphere", 
"Assimilate", "Singularity", "Smite Infusion", "Hallowed Eruption", "Phoenix Renewal", "Hallowed Reckoning", "Partitioned Mallet", "Conductor", "Repair Dispensary",
"Thrall Pact", "Blinding Reave", "Ironclad Charge", "Iron Shrapnel", "Piercing Roar", "Reinforcing Stomp","Revealing Spores", "Venom Dose", "Regenerative Molt", 
"Contagion Cloud", "Ironclad Flight", "Spellbound Harvest", "Beguiling Lantern", "Razorwing Blitz", "Pool of Life", "Vampire Leech", "Abating Link", 
"Champion's Blessing", "Swing Line", "Eternal War", "Prolonged Paralysis", "Enraged", "Hysterical Assault", "Tesla Bank", "Photon Repeater", "Repelling Bastille",
"Shock Trooper", "Shocking Speed", "Recharge Barrier", "Transistor Shield", "Capacitance", "Fused Reservoir", "Critical Surge", "Celestial Stomp", 
"Enveloping Cloud", "Primal Rage", "Vampiric Grasp", "The Relentless Lost", "Anchored Glide", "Target Fixation", "Airburst Rounds", "Jet Stream", "Funnel Clouds"]

ListModAugmentWarframePvpCheckboxisChecked : boolean = false;
ListModAugmentWarframePvp: string[] = ["Tear Gas", "Rumbled", "Afterburn", "Purifying Flames", "Push & Pull", "Purging Slash", "Signal Flare", "Ice Wave Impedance", 
"Power of Three", "Deceptive Bond", "Sapping Reach", "Shield Overload", "Mesa's Waltz", "Prism Guard", "Discharge Strike", "Ward Recovery", "Antimatter Mine", 
"Singularity", "Defiled Reckoning", "Iron Shrapnel", "Hysterical Fixation", "Recharge Barrier", "Kinetic Collision"]

ListModAugmentWeaponCheckboxisChecked : boolean = false;
ListModAugmentWeapon: string[] = ["Eroding Blight", "Gleaming Blight", "Toxic Blight", "Stockpiled Blight",	"Entropy Burst", "Entropy Flight", "Entropy Spike", 
"Entropy Detonation",	"Justice Blades", "Scattered Justice", "Shattering Justice", "Neutralizing Justice",	"Bright Purity", "Lasting Purity", "Winds of Purity", 
"Disarming Purity",	"Deadly Sequence", "Sequence Burn", "Toxic Sequence", "Voltage Sequence", "Blade of Truth", "Gilded Truth", "Stinging Truth", "Avenging Truth", 
"Tether Grenades", "Flux Overdrive", "Thermagnetic Shells", "Static Discharge", "Kinetic Ricochet", "Electromagnetic Shielding", "Vulcan Blitz", "Acid Shells", 
"Rift Strike", "Nightwatch Napalm", "Fomorian Accelerant", "Hunter's Bonesaw", "Harkonar Scope", "Medi-Ray", "Bursting Mass", "Napalm Grenades", "Wild Frenzy", 
"Efficient Beams", "Exposing Harpoon", "Meticulous Aim", "Deadly Maneuvers", "Dizzying Rounds", "Precision Strike", "Ambush Optics", "Brain Storm", 
"Directed Convergence", "Double Tap", "Focused Acceleration", "Shrapnel Rounds", "Skull Shots", "Spring-Loaded Broadhead", "Amalgam Argonak Metal Auger", 
"Amalgam Daikyu Target Acquired", "Amalgam Furax Body Count", "Amalgam Javlok Magazine Warp", "Amalgam Ripkas True Steel", "Damzav-Vati", "Zazvat-Kar", 
"Bhisaj-Bal", "Hata-Satya"]



ListModGroupConclaveCheckboxisChecked : boolean = false;
GroupConclave()
{
  if ( this.ListModGroupConclaveCheckboxisChecked == true) 
  {
    this.ListModConclaveWarframeCheckboxisChecked = false;
    this.ListModConclaveWeaponCheckboxisChecked = false;
  }else{
    this.ListModConclaveWarframeCheckboxisChecked = true;
    this.ListModConclaveWeaponCheckboxisChecked = true;
  }
}

 ListModConclaveWarframeCheckboxisChecked : boolean = false;
 ListModConclaveWarframe : string[] = ["Afterburn", "Antimatter Mine", "Deceptive Bond", "Defiled Reckoning", "Discharge Strike", "Hysterical Fixation", 
"Ice Wave Impedance", "Iron Shrapnel", "Kinetic Collision", "Mesa's Waltz", "Power of Three", "Prism Guard", "Purging Slash", 
"Purifying Flames", "Push & Pull", "Recharge Barrier", "Rumbled", "Sapping Reach", "Shield Overload", "Signal Flare", "Singularity", 
"Tear Gas", "Ward Recovery", "Adept Surge", "Adrenaline Boost", "Air Thrusters", "Anticipation", "Anti-Flak Plating", 
"Armored Acrobatics", "Armored Evade", "Armored Recovery", "Calculated Spring", "Final Act", "Follow Through", "Hastened Steps", 
"Heightened Reflexes", "No Current Leap", "Overcharge Detectors", "Overcharged", "Quick Charge", "Rising Skill", "Surplus Diverters", 
"Tactical Retreat", "Tempered Bound", "Vital Systems Bypass",	"Searing Leap", "Rime Vault", "Venomous Rise", "Voltaic Lance"]

ListModConclaveWeaponCheckboxisChecked : boolean = false;
ListModConclaveWeapon : string[] = ["Ambush Optics", "Brain Storm", "Directed Convergence", "Double Tap", "Draining Gloom", "Final Tap", "Focused Acceleration", 
"Gorgon Frenzy", "Grinloked", "Measured Burst", "Precision Munition", "Shrapnel Rounds", "Skull Shots", "Spring-Loaded Broadhead", 
"Static Alacrity", "Sudden Justice", "Thundermiter", "Triple Tap", "Agile Aim", "Apex Predator", "Comet Rounds", "Deft Tempo", 
"Gun Glide", "Hydraulic Gauge", "Loose Hatch", "Lucky Shot", "Maximum Capacity", "Overview", "Recover", "Ripper Rounds", 
"Serrated Rounds", "Tactical Reload", "Twitch", "Vanquished Prey", "Bounty Hunter", "Broad Eye", "Crash Shot", "Double-Barrel Drift",
"Flak Shot", "Hydraulic Chamber", "Kill Switch", "Loaded Capacity", "Lock and Load", "Loose Chamber", "Momentary Pause", "Prize Kill",
"Shred Shot", "Snap Shot", "Soft Hands", "Emergent Aftermath", "Lie In Wait", "Feathered Arrows", "Plan B", "Soaring Strike", "Air Recon", 
"Blind Shot", "Calculated Victory", "Eject Magazine", "Full Capacity", "Heavy Warhead", "Hydraulic Barrel", "Impaler Munitions", 
"Loose Magazine", "Meteor Munitions", "Night Stalker", "Razor Munitions", "Recuperate", "Reflex Draw", "Secondary Wind", "Spry Sights", 
"Strafing Slide", "Counterweight", "Explosive Demise", "Heartseeker", "Impenetrable Offense", "Martial Fury", "Mortal Conduct", 
"Relentless Assault", "Serrated Edges", "Sharpened Blade", "Stand Ground", "Sword Alone", "Argent Scourge", "Biting Piranha", 
"Celestial Nightfall", "Crashing Havoc", "Crashing Timber", "Cunning Aspect", "Dividing Blades", "Fateful Truth", "Lashing Coil", 
"Last Herald", "Mafic Rain", "Noble Cadence", "Piercing Fury", "Quaking Hand", "Rending Wind", "Rising Steel", "Scarlet Hurricane", 
"Shadow Harvest", "Star Divide", "Tainted Hydra", "Vicious Approach", "Martial Magnetism", "Tracking Shot"]




ListModPrimedCheckboxisChecked : boolean = false;
ListModPrimed: string[] = ["Primed Animal Instinct", "Primed Bane of Corpus", "Primed Bane of Corrupted", "Primed Bane of Grineer", "Primed Bane of Infested", "Primed Charged Shell",
"Primed Chilling Grasp", "Primed Cleanse Corpus", "Primed Cleanse Corrupted", "Primed Cleanse Grineer", "Primed Cleanse Infested", "Primed Continuity",
"Primed Cryo Rounds", "Primed Expel Corpus", "Primed Expel Corrupted", "Primed Expel Grineer", "Primed Expel Infested", "Primed Fast Hands", "Primed Fever Strike",
"Primed Firestorm", "Primed Flow", "Primed Fulmination", "Primed Fury", "Primed Heated Charge", "Primed Heavy Trauma", "Primed Morphic Transformer", "Primed Pack Leader",
"Primed Pistol Gambit", "Primed Pistol Ammo Mutation", "Primed Point Blank", "Primed Pressure Point", "Primed Quickdraw", "Primed Ravage", "Primed Reach", "Primed Regen",
"Primed Rifle Ammo Mutation", "Primed Rubedo-Lined Barrel", "Primed Shotgun Ammo Mutation", "Primed Smite Corpus", "Primed Smite Corrupted", "Primed Smite Grineer",
"Primed Smite Infested", "Primed Shred", "Primed Slip Magazine", "Primed Sure Footed", "Primed Tactical Pump", "Primed Target Cracker", "Primed Vigor",
"Sacrificial Pressure", "Sacrificial Steel", "Umbral Fiber", "Umbral Intensify", "Umbral Vitality", "Primed Ammo Stock", "Primed Chamber"]


ListModNightmareCheckboxisChecked : boolean = false;
ListModNightmare: string[] = [
"Armored Agility", 
"Constitution", 
"Fortitude", 
"Streamlined Form", 
"Vigor", 
"Hammer Shot", 
"Wildfire", 
"Shred", 
"Accelerated Blast", 
"Blaze", 
"Chilling Reload", 
"Seeking Fury", 
"Ice Storm", 
"Stunning Speed", 
"Lethal Torrent", 
"Focus Energy", 
"Rending Strike", 
"Drifting Contact", 
"Animal Instinct", 
]


ListModCorruptedCheckboxisChecked : boolean = false;
ListModCorrupted: string[] = [
"Heavy Caliber", 
"Vile Precision", 
"Tainted Mag", 
"Vile Acceleration", 
"Depleted Reload", 
"Burdened Magazine", 
"Vicious Spread", 
"Tainted Shell", 
"Frail Momentum", 
"Critical Deceleration", 
"Anemic Agility", 
"Creeping Bullseye", 
"Hollow Point", 
"Magnum Force", 
"Tainted Clip", 
"Spoiled Strike", 
"Corrupt Charge", 
]
  
ListModDriftCheckboxisChecked : boolean = false;
ListModDrift: string[] = [  
"Agility Drift",
"Coaction Drift",
"Cunning Drift",
"Endurance Drift",
"Power Drift",
"Speed Drift",
"Stealth Drift",]

ListModBossesCheckboxisChecked : boolean = false;
ListModBosses: string[] = [ 
"Acid Shells",
"Amalgam Argonak Metal Auger",
"Amalgam Daikyu Target Acquired",
"Amalgam Furax Body Count",
"Amalgam Javlok Magazine Warp",
"Amalgam Ripkas True Steel",
"Bane of Infested",
"Blood For Ammo",
"Blood For Energy",
"Blood For Life",
"Blunderbuss",
"Calculated Redirection",
"Charged Bullets",
"Contamination Casing",
"Continuity",
"Convulsion",
"Cryo Coating",
"Cryo Rounds",
"Electromagnetic Shielding",
"Eleventh Storm",
"Fast Deflection",
"Fever Strike",
"Fomorian Accelerant",
"Fracturing Wind",
"Gunslinger",
"Handspring",
"Harkonar Scope",
"Heated Charge",
"Hellfire",
"Hit And Run",
"Hunter Adrenaline",
"Hunter Command",
"Hunter Munitions",
"Hunter Recovery",
"Hunter Synergy",
"Hunter Track",
"Hunter's Bonesaw",
"Hypothermic Shell",
"Incendiary Coat",
"Infectious Injection",
"Intensify",
"Ion Infusion",
"Killing Blow",
"Lethal Momentum",
"Magazine Warp",
"Medi-Ray",
"Melee Prowess",
"Molten Impact",
"Nightwatch Napalm",
"North Wind",
"Out Of Sight",
"Pressure Point",
"Quick Return",
"Quickdraw",
"Rebound",
"Reflex Coil",
"Regen",
"Rift Strike",
"Ruinous Extension",
"Rupture",
"Shattering Storm",
"Shell Compression",
"Shock Absorbers",
"Shocking Touch",
"Shotgun Savvy",
"Slip Magazine",
"Spare Parts",
"Speed Trigger",
"Spinning Needle",
"Split Chamber",
"Stabilizer",
"Steel Fiber",
"Streamline",
"Stretch",
"Tactical Pump",
"Target Acquired",
"Tempo Royale",
"Thief's Wit",
"Trick Mag",
"True Steel",
"Vitality",
"Vulcan Blitz",
]
 
  constructor(api : API, apiMarket:APIMarket)
  {
    this.api = api;
    this.apiMarket = apiMarket;
    
  }

  ngOnInit() {
    this.listStatic = [];
    this.api.getAllMods().then( async value => {
      this.List = value;
      this.NbMaxMod = this.List.length
      //console.log(this.List)

      for(let j=0; j< this.List.length-1; j++)
      {
        //supprime les doublons
        if(this.List[j].name == this.List[j+1].name)
        {
          //console.log(this.List[j].name)
          this.List.splice(j,1);
        }             
      }

      //Retire mod supprimé
      for( let j =0 ; j< this.List.length; j++) 
      {  
        if(this.List[j].excludeFromCodex == true )
        {
          this.List.splice(j,1);
        }            
      }
      //Retire les mods qui ne sont plus dans le jeu de la liste
      for(let j=0; j< this.ListNomSupprime.length; j++)
      {
        let index = this.List.map(function(a) {return a.name}).indexOf(this.ListNomSupprime[j]);
        this.List.splice(index,1);
      }

    })
  }


  async RechercheStatic(): Promise<void>
  {
    this.ListModPrice =[];
    this.listStatic = [];


    //Warframe
      //Retire les mods Warframe
      if(this.ListModWarframeCheckboxisChecked == true)
      {
        this.listStatic = this.ListModWarframe.concat(this.listStatic);
      }
      //Retire les mods Aura
      if(this.ListModAuraCheckboxisChecked == true)
      {
        this.listStatic = this.ListModAura.concat(this.listStatic);   
        console.log(this.listStatic) 
      }

    //Weapon 
      //Retire les mods Primary
      if(this.ListModWeaponPrimaryCheckboxisChecked == true)
      {
        this.listStatic = this.ListModWeaponPrimary.concat(this.listStatic);
      } 
      //Retire les mods Rifle
      if(this.ListModWeaponRifleCheckboxisChecked == true)
      {
        this.listStatic = this.ListModWeaponRifle.concat(this.listStatic);
      } 
      //Retire les mods Assault_Rifle
      if(this.ListModWeaponAssault_RifleCheckboxisChecked == true)
      {
        this.listStatic = this.ListModWeaponAssault_Rifle.concat(this.listStatic);
      } 
      //Retire les mods Shotgun
      if(this.ListModWeaponShotgunCheckboxisChecked == true)
      {
        this.listStatic = this.ListModWeaponShotgun.concat(this.listStatic);
      } 
      //Retire les mods Sniper
      if(this.ListModWeaponSniperCheckboxisChecked == true)
      {
        this.listStatic = this.ListModWeaponSniper.concat(this.listStatic);
      } 
      //Retire les mods Bow
      if(this.ListModWeaponBowCheckboxisChecked == true)
      {
        this.listStatic = this.ListModWeaponBow.concat(this.listStatic);
      } 
      //Retire les mods Pistol
      if(this.ListModWeaponPistolCheckboxisChecked == true)
      {
        this.listStatic = this.ListModWeaponPistol.concat(this.listStatic);
      } 
      //Retire les mods Melee
      if(this.ListModWeaponMeleeCheckboxisChecked == true)
      {
        this.listStatic = this.ListModWeaponMelee.concat(this.listStatic);
      } 
      //Retire les mods Stance
      if(this.ListModWeaponStanceCheckboxisChecked == true)
      {
        this.listStatic = this.ListModWeaponStance.concat(this.listStatic);
      } 

    //Companion
      //Retire les mods Companion
      if(this.ListModCompanionCheckboxisChecked == true)
      {
        this.listStatic = this.ListModCompanion.concat(this.listStatic);
      }
      //Retire les mods Robotic
      if(this.ListModCompanionRoboticCheckboxisChecked == true)
      {
        this.listStatic = this.ListModCompanionRobotic.concat(this.listStatic);
      }
      //Retire les mods Sentinel
      if(this.ListModCompanionSentinelCheckboxisChecked == true)
      {
        this.listStatic = this.ListModCompanionSentinel.concat(this.listStatic);
      }
      //Retire les mods MOA
      if(this.ListModCompanionMOACheckboxisChecked == true)
      {
        this.listStatic = this.ListModCompanionMOA.concat(this.listStatic);
      }
      //Retire les mods Beast
      if(this.ListModCompanionBeastCheckboxisChecked == true)
      {
        this.listStatic = this.ListModCompanionBeast.concat(this.listStatic);
      }
      //Retire les mods Kubrow 
      if(this.ListModCompanionKubrowCheckboxisChecked == true)
      {
        this.listStatic = this.ListModCompanionKubrow.concat(this.listStatic);
      }
      //Retire les mods Kavat 
      if(this.ListModCompanionKavatCheckboxisChecked == true)
      {
        this.listStatic = this.ListModCompanionKavat.concat(this.listStatic);
      }
      //Retire les mods Hound 
      if(this.ListModCompanionHoundCheckboxisChecked == true)
      {
        this.listStatic = this.ListModCompanionHound.concat(this.listStatic);
      }

    //Archwings
     //Retire les mods Archwing 
      if(this.ListModArchwingCheckboxisChecked == true)
      {
        this.listStatic = this.ListModArchwing.concat(this.listStatic);
      } 
     //Retire les mods Archwing_Gun 
      if(this.ListModArchwing_GunCheckboxisChecked == true)
      {
        this.listStatic = this.ListModArchwing_Gun.concat(this.listStatic);
      } 
      //Retire les mods Archwing_Melee 
      if(this.ListModArchwing_MeleeCheckboxisChecked == true)
      {
        this.listStatic = this.ListModArchwing_Melee.concat(this.listStatic);
      } 


      //Retire les mods K_Drives
      if(this.ListModK_DrivesCheckboxisChecked == true)
      {     
        this.listStatic = this.ListModK_Drives.concat(this.listStatic);
      }

    //Augments
      //Retire les mods augment Warframe
      if(this.ListModAugmentWarframeCheckboxisChecked == true)
      {
        this.listStatic = this.ListModAugmentWarframe.concat(this.listStatic);
      } 
      //Retire les mods augment WarframePvp
      if(this.ListModAugmentWarframePvpCheckboxisChecked == true)
      {
        this.listStatic = this.ListModAugmentWarframePvp.concat(this.listStatic);
      } 
      //Retire les mods augment weapon
      if(this.ListModAugmentWeaponCheckboxisChecked == true)
      {        
        this.listStatic = this.ListModAugmentWeapon.concat(this.listStatic);
      }

      //Retire les mods conclave warframe
      if(this.ListModConclaveWarframeCheckboxisChecked == true)
      {            
        this.listStatic = this.ListModConclaveWarframe.concat(this.listStatic); 
      }
      //Retire les mods conclave weapon
      if(this.ListModConclaveWeaponCheckboxisChecked == true)
      {
        this.listStatic = this.ListModConclaveWeapon.concat(this.listStatic);
      }
      //les mods primed
      if(this.ListModPrimedCheckboxisChecked == true)
      {
        this.listStatic = this.ListModPrimed.concat(this.listStatic);
      } 
      //
      if(this.ListModNightmareCheckboxisChecked == true)
      {
        this.listStatic = this.ListModNightmare.concat(this.listStatic);
      }
      //
      if(this.ListModCorruptedCheckboxisChecked == true)
      {
        this.listStatic = this.ListModCorrupted.concat(this.listStatic);
      }
      //
      if(this.ListModDriftCheckboxisChecked == true)
      {
        this.listStatic = this.ListModDrift.concat(this.listStatic);
      }
      //
      if(this.ListModBossesCheckboxisChecked == true)
      {
        this.listStatic = this.ListModBosses.concat(this.listStatic);
      }
 
      console.log(this.listStatic)
      //Retire les mods qui ne sont plus dans le jeu de la liste static
      for(let j=0; j< this.ListNomSupprime.length; j++)
      {
        let index;
        while(index != -1)
        {
          index = this.listStatic.indexOf(this.ListNomSupprime[j]);
          if(index != -1)
          {
              this.listStatic.splice(index,1);
          }
        }
        
      }
      console.log(this.listStatic)
      let nomMod : string;
      for( this.i =0 ; this.i<this.listStatic.length; this.i++)     
        {
          //nomMod = this.CorrectionNomMod(this.List[this.i].name);
          nomMod = this.CorrectionNomMod(this.listStatic[this.i]);

          let mod = new ModPrice(nomMod, 0, "");
          console.log(nomMod );
          if(this.i%50 == 0) 
          {
            this.wait(1000)
          }
            
          await this.apiMarket.GetPrice(nomMod).then( data => {
            this.payloadroot = data;
            //console.log(this.payloadroot.payload.orders[0]);
            this.ListOrder = data.payload.orders.filter(data => (data.user.status == "online" || data.user.status == "ingame") && data.order_type == 'sell');
            if(this.ListOrder.length > 2)
            {
              this.ListOrder = this.ListOrder.sort((a,b)=>a.platinum-b.platinum); 
            }
            if(this.ListOrder.length >= this.NbrDeVendeur && this.ValeurMin < this.ListOrder[0].platinum)
            {
              //console.log(this.ListOrder[0].platinum);
              
              if(this.ListOrder[0] != null)
              {
                mod.platinum =  this.ListOrder[0].platinum;
                mod.vendeur = this.ListOrder[0].user.ingame_name;
              }

              this.ListModPrice.push(mod);
              this.ListModPrice.sort((b,a)=>a.platinum-b.platinum); 
              this.wait(400)
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
    nomMod = nomMod.replace('scan_aquatic_lifeforms','scan_lifeforms');
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

export class ModPrice {
  name: string;
  platinum: number;
  vendeur : string;

  constructor(name:string = 'null', platinum:number = 0, vendeur : string = ""){
    this.name = name;
    this.platinum = platinum;
    this.vendeur = vendeur; 
  }
}
