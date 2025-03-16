import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MySocialPage } from './my-social.page';

describe('MySocialPage', () => {
  let component: MySocialPage;
  let fixture: ComponentFixture<MySocialPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MySocialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
