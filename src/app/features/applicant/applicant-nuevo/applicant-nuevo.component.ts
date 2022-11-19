import { Component, OnInit , ViewChild} from '@angular/core';
import { NgForm, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UbigeoService } from 'src/app/core/services/ubigeo.service';
import { ApplicantService } from './../services/applicant.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-applicant-nuevo',
  templateUrl: './applicant-nuevo.component.html',
  styleUrls: ['./applicant-nuevo.component.scss']
})
export class ApplicantNuevoComponent implements OnInit {

  private applicantForm: FormGroup;

  public depList:any;
  public provList:any;
  public distList:any;
  public isUpdate:boolean=false;

  public codDepartamento:string ='';
  public codProvincia:string='';
  public codDistrito:string='';

  public employeeId!: string;

  public nombre:string='';
  public apellidos:string='';
  public direccion:string='';
  public telefono:string='';
  public celular:string='';
  public email:string='';
  public fechaNacimiento:string='';
  public dni:string='';
  public puestoPostulacion:string='';
  public aspiracionSalarial:string='';
  public disponibilidad:string='';
  public aniosServicio:any;
  public empresaAnterior:string='';
  public puestoAnterior:string='';
  public entrevistado:string='';
  public perfil:string='';
  public aceptado:boolean=false;
  public lugarNacimiento:string="";

  public fileControl: FormControl;
  public file:any;
  constructor(private ubigeoService:UbigeoService,private applicantService: ApplicantService,
    private toastr:ToastrService, private route:ActivatedRoute,formBuilder: FormBuilder,
    private router:Router) {

      this.applicantForm = formBuilder.group({

      })

      this.fileControl = new FormControl(this.file, [
        Validators.required
      ])
  }


  ngOnInit(): void {

    this.getDepartamentos();
    this.getEmployeeForUpdate();
    this.getFile();
  }

  public getEmployeeForUpdate(){
    this.route.queryParamMap.subscribe(parameter => {
      if(parameter.get("idEmployee")){
        this.isUpdate=true;  
        this.getApplicant(parameter.get("idEmployee"));
      }; 
    })
  }

  public getFile(){
    this.fileControl.valueChanges.subscribe((file: any) => { 
        console.log(file);
      
        this.file = file;
    })
  }

  public saveApplicant(data:NgForm){
   
    this.applicantService.saveApplicant(data.value,this.file).subscribe({
      next: (res) => {
        this.toastr.success("Guardado");
        this.router.navigate(["applicant","listado"])
      }, 
      error: (err) => {
        
      }
    })
  }

  public updateApplicant(data:NgForm){
  
    this.applicantService.updateApplicant(data.value,this.file).subscribe({
      next: (res) => {
        this.toastr.success("Actualizado");
        console.log(data.value);
        data.reset();
        this.fileControl.reset;
      }, 
      error: (err) => {
     
      }
    })
  }

  public getApplicant(idEmployee:any){
    
    this.applicantService.getApplicant(idEmployee).subscribe({
      next: (res) => {
        this.fillForm(res);
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }

  public getDepartamentos(){
    this.ubigeoService.getDepartamentos().subscribe({
      next: (res) => {
        this.depList=res;
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }

  public getProvincias(codDep:string){
    this.ubigeoService.getProvincias(codDep).subscribe({
      next: (res) => {
        this.provList=res;
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }

  public getDistritos(codDep:string,codProv:string){
    this.ubigeoService.getDistritos(codDep,codProv).subscribe({
      next: (res) => {
        this.distList=res;
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }

  public async fillForm(res:any){

    await this.getProvincias(res.departamentoNacimiento);
    await this.getDistritos(res.departamentoNacimiento,res.provinciaNacimiento);

    this.nombre=res.nombre;
    this.apellidos=res.apellidos;
    this.direccion=res.direccion;
    this.telefono=res.telefono;
    this.celular=res.celular;
    this.email=res.email;
    this.fechaNacimiento=res.fechaNacimiento;
    this.dni=res.dni;
    this.puestoPostulacion=res.puestoPostulacion;
    this.aspiracionSalarial=res.aspiracionSalarial;
    this.disponibilidad=res.disponibilidad;
    this.aniosServicio=res.aniosServicio;
    this.empresaAnterior=res.empresaAnterior;
    this.puestoAnterior=res.puestoAnterior;
    this.perfil=res.perfil;
    this.employeeId=res.employeeId;
    this.lugarNacimiento=res.lugarNacimiento;
    this.codDepartamento=res.departamentoNacimiento;
    this.codProvincia=res.provinciaNacimiento;
    this.codDistrito=res.distritoNacimiento;
  
  }

  
}
