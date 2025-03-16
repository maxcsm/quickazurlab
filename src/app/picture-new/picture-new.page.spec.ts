import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PictureNewPage } from './picture-new.page';

describe('PictureNewPage', () => {
  let component: PictureNewPage;
  let fixture: ComponentFixture<PictureNewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PictureNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
