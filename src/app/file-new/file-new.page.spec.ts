import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileNewPage } from './file-new.page';

describe('FileNewPage', () => {
  let component: FileNewPage;
  let fixture: ComponentFixture<FileNewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FileNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
