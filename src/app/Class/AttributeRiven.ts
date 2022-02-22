export interface Attribute {
    search_only: boolean;
    suffix: string;
    units: string;
    negative_only: boolean;
    url_name: string;
    group: string;
    effect: string;
    exclusive_to: string[];
    prefix: string;
    id: string;
    positive_is_negative: boolean;
}

export interface PayloadAttributeRiven {
    attributes: Attribute[];
}

export interface PayloadRootObjectAttributeRiven {
    payload: PayloadAttributeRiven;
}