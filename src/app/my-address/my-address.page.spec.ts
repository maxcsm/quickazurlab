import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAddressPage } from './my-address.page';

describe('MyAddressPage', () => {
  let component: MyAddressPage;
  let fixture: ComponentFixture<MyAddressPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
