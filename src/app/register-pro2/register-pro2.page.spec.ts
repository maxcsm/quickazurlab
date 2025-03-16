import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPro2Page } from './register-pro2.page';

describe('RegisterPro2Page', () => {
  let component: RegisterPro2Page;
  let fixture: ComponentFixture<RegisterPro2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterPro2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
