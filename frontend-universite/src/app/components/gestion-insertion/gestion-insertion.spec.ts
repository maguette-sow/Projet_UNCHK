import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionInsertion } from './gestion-insertion';

describe('GestionInsertion', () => {
  let component: GestionInsertion;
  let fixture: ComponentFixture<GestionInsertion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionInsertion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionInsertion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
