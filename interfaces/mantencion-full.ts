export interface MantencionResponse {

    mantenciones: Mantencion[]
}

export interface Mantencion {
    [x: string]: any;
    id: number;
    name: string;
    kms: number;
    category: string;
    price: number;
}