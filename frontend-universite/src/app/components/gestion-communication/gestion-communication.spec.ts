import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCommunication } from './gestion-communication';

describe('GestionCommunication', () => {
  let component: GestionCommunication;
  let fixture: ComponentFixture<GestionCommunication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCommunication]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCommunication);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
