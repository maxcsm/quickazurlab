import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCompanyPage } from './my-company.page';

describe('MyCompanyPage', () => {
  let component: MyCompanyPage;
  let fixture: ComponentFixture<MyCompanyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
