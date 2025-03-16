import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterLocationPage } from './filter-location.page';

describe('FilterLocationPage', () => {
  let component: FilterLocationPage;
  let fixture: ComponentFixture<FilterLocationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FilterLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
