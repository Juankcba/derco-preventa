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
