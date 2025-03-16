import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterAnnoncePage } from './filter-annonce.page';

describe('FilterAnnoncePage', () => {
  let component: FilterAnnoncePage;
  let fixture: ComponentFixture<FilterAnnoncePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FilterAnnoncePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
