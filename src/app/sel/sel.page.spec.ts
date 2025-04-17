import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelPage } from './sel.page';

describe('SelPage', () => {
  let component: SelPage;
  let fixture: ComponentFixture<SelPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
