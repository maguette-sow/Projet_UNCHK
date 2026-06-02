import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBudget } from './gestion-budget';

describe('GestionBudget', () => {
  let component: GestionBudget;
  let fixture: ComponentFixture<GestionBudget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionBudget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionBudget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
