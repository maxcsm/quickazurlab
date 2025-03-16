import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalNotePage } from './modal-note.page';

describe('ModalNotePage', () => {
  let component: ModalNotePage;
  let fixture: ComponentFixture<ModalNotePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
