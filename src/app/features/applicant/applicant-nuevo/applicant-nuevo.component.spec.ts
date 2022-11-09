import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantNuevoComponent } from './applicant-nuevo.component';

describe('ApplicantNuevoComponent', () => {
  let component: ApplicantNuevoComponent;
  let fixture: ComponentFixture<ApplicantNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantNuevoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
