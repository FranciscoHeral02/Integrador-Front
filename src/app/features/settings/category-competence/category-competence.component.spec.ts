import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCompetenceComponent } from './category-competence.component';

describe('CategoryCompetenceComponent', () => {
  let component: CategoryCompetenceComponent;
  let fixture: ComponentFixture<CategoryCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryCompetenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
