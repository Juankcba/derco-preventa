export interface StoreResponse {
    autos: Auto[];
    mantenciones: Auto[];
}

export interface Auto {
    brand_name: string;
    brand_price: number;
    brand_slug: string;
    class_name: string;
    class_slug: string;
    financial_price: number;
    fuel_name: string;
    fuel_slug: string;
    image_url: string;
    is_service: number;
    list_price: number;
    model_name: string;
    model_slug: string;
    sap: string;
    stock_availabe: string;
    stock_total: number;
    version_name: string;
    version_slug: string;
}


export interface StoreCar {
    brand_name: string;
    brand_price: number;
    brand_slug: string;
    class_name: string;
    class_slug: string;
    color_hex: string;
    color_id: number;
    color_name: string;
    color_slug: string;
    financial_price: number;
    fuel_name: string;
    fuel_slug: string;
    id: number;
    image_url: string;
    is_service: number;
    list_price: number;
    model_name: string;
    model_slug: string;
    sap: string;
    status_id: number;
    stock_availabe: number;
    stock_total: number;
    version_name: string;
    version_slug: string;
}


export interface StoreColor {
    stock_availabe: number,
    color_hex: string;
    color_id: number;
    color_name: string;
    color_slug: string;
    image: string;
}