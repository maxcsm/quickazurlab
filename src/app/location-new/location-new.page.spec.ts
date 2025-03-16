import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationNewPage } from './location-new.page';

describe('LocationNewPage', () => {
  let component: LocationNewPage;
  let fixture: ComponentFixture<LocationNewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LocationNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
