import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciaAlumnosPage } from './asistencia-alumnos.page';

describe('AsistenciaAlumnosPage', () => {
  let component: AsistenciaAlumnosPage;
  let fixture: ComponentFixture<AsistenciaAlumnosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaAlumnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
