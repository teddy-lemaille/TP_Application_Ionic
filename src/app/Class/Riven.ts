export interface Attribute {
  positive: boolean;
  value: number;
  url_name: string;
}

export interface Item {
  mastery_level: number;
  mod_rank: number;
  attributes: Attribute[];
  re_rolls: number;
  name: string;
  weapon_url_name: string;
  polarity: string;
  type: string;
}

export interface Owner {
  reputation: number;
  region: string;
  last_seen: Date;
  ingame_name: string;
  avatar: string;
  status: string;
  id: string;
}

export interface Auction {
  starting_price: number;
  minimal_reputation: number;
  note: string;
  private: boolean;
  item: Item;
  buyout_price: number;
  visible: boolean;
  owner: Owner;
  platform: string;
  closed: boolean;
  top_bid?: any;
  winner?: any;
  is_marked_for?: any;
  marked_operation_at?: any;
  created: Date;
  updated: Date;
  note_raw: string;
  is_direct_sell: boolean;
  id: string;
}

export interface PayloadRiven {
  auctions: Auction[];
}

export interface PayloadRootObjectRiven {
  payload: PayloadRiven;
}

