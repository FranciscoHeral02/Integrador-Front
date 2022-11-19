import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UbigeoService } from 'src/app/core/services/ubigeo.service';
import { Campus } from '../../interfaces/campus';
import { CampusService } from './../../services/campus.service';

@Component({
  selector: 'app-campus-dialog',
  templateUrl: './campus-dialog.component.html',
  styleUrls: ['./campus-dialog.component.scss']
})
export class CampusDialogComponent implements OnInit {

  public depList:any;
  public provList:any;
  public distList:any;
  public campusForm:FormGroup;

  ngOnInit(): void {
    this.getDepartamentos();
    if(this.data.edit){
      this.getCampus(this.data.campusId);
    }
  }

  constructor(
    public dialogRef: MatDialogRef<CampusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ubigeoService:UbigeoService,
    private fb:FormBuilder,
    private campusService:CampusService
  ) {

    this.campusForm= this.fb.group({
      campusId:[''],
      nombreCampus:['',Validators.required],
      razonSocial:['',Validators.required],
      telefono:['',Validators.required],
      direccionCampus:['',Validators.required],
      departamentoCampus:['',Validators.required],
      provinciaCampus:['',Validators.required],
      distritoCampus:['',Validators.required]
    });

    dialogRef.disableClose = true;
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

  public getCampus(campusId:string){
    this.campusService.getCampus(campusId).subscribe({
      next: (res) => {
        this.fillForm(res);
      }, 
      error: (err) => {
        
      // handle invalid user message
      }
    })
  }

  public async fillForm(res:Campus){
    await this.getProvincias(res.ubigeo.codDep);
    await this.getDistritos(res.ubigeo.codDep,res.ubigeo.codProv);
    this.campusForm.patchValue({
      campusId: res.campusId,
      nombreCampus: res.nombreCampus,
      razonSocial: res.razonSocial,
      telefono: res.telefono,
      direccionCampus: res.direccionCampus,
      departamentoCampus: res.ubigeo.codDep,
      provinciaCampus: res.ubigeo.codProv,
      distritoCampus: res.ubigeo.codDist
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    this.dialogRef.close(this.campusForm.value)
  }

}
