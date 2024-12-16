import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesorDetallePage } from './profesor-detalle.page';

describe('ProfesorDetallePage', () => {
  let component: ProfesorDetallePage;
  let fixture: ComponentFixture<ProfesorDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
