import { Job } from "./job";

export interface Category{
    categoryId:number;
    nombreCategoria:string;
    pagoHora: string;
    jobId:number;
    job:Job;
}