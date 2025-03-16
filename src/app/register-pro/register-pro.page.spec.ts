import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterProPage } from './register-pro.page';

describe('RegisterProPage', () => {
  let component: RegisterProPage;
  let fixture: ComponentFixture<RegisterProPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterProPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
