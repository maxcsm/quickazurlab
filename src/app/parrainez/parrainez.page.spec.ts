import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParrainezPage } from './parrainez.page';

describe('ParrainezPage', () => {
  let component: ParrainezPage;
  let fixture: ComponentFixture<ParrainezPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ParrainezPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
