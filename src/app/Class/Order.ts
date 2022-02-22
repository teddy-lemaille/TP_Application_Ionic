

    export interface User {
        ingame_name: string;
        last_seen: Date;
        reputation: number;
        region: string;
        avatar: string;
        status: string;
        id: string;
    }

    export interface Order {
        user: User;
        visible: boolean;
        quantity: number;
        region: string;
        platform: string;
        creation_date: Date;
        platinum: number;
        order_type: string;
        last_update: Date;
        id: string;
        
    }

    export interface Payload {
        orders: Order[];
    }

    export interface PayloadRootObject {
        payload: Payload;
    }


