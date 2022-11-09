import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantListadoComponent } from './applicant-listado.component';

describe('ApplicantListadoComponent', () => {
  let component: ApplicantListadoComponent;
  let fixture: ComponentFixture<ApplicantListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
