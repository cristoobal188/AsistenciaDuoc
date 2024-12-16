import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrClasesPage } from './qr-clases.page';

describe('QrClasesPage', () => {
  let component: QrClasesPage;
  let fixture: ComponentFixture<QrClasesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrClasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
