import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionNotes } from './gestion-notes';

describe('GestionNotes', () => {
  let component: GestionNotes;
  let fixture: ComponentFixture<GestionNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionNotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionNotes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
