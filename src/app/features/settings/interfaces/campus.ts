import { Ubigeo } from "src/app/core/interfaces/ubigeo";
import { UbigeoService } from "src/app/core/services/ubigeo.service";

export interface Campus{
    campusId:number;
    nombreCampus:string;
    razonSocial:string;
    telefono:string;
    provinciaCampus:string;
    direccionCampus:string;
    departamentoCampus:string;
    distritoCampus:string;
    ubigeo:Ubigeo;
}