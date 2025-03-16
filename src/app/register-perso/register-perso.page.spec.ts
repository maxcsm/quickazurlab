import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPersoPage } from './register-perso.page';

describe('RegisterPersoPage', () => {
  let component: RegisterPersoPage;
  let fixture: ComponentFixture<RegisterPersoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterPersoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
