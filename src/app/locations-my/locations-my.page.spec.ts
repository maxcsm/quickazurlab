import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationsMyPage } from './locations-my.page';

describe('LocationsMyPage', () => {
  let component: LocationsMyPage;
  let fixture: ComponentFixture<LocationsMyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LocationsMyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
