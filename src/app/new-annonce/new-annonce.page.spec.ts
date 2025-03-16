import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewAnnoncePage } from './new-annonce.page';

describe('NewAnnoncePage', () => {
  let component: NewAnnoncePage;
  let fixture: ComponentFixture<NewAnnoncePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewAnnoncePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
