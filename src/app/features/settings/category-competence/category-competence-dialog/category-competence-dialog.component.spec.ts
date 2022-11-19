import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCompetenceDialogComponent } from './category-competence-dialog.component';

describe('CategoryCompetenceDialogComponent', () => {
  let component: CategoryCompetenceDialogComponent;
  let fixture: ComponentFixture<CategoryCompetenceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryCompetenceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryCompetenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
