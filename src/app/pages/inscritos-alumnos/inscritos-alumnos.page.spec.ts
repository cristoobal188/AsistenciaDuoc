import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscritosAlumnosPage } from './inscritos-alumnos.page';

describe('InscritosAlumnosPage', () => {
  let component: InscritosAlumnosPage;
  let fixture: ComponentFixture<InscritosAlumnosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InscritosAlumnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
