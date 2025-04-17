import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaylorPage } from './taylor.page';

describe('TaylorPage', () => {
  let component: TaylorPage;
  let fixture: ComponentFixture<TaylorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TaylorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
