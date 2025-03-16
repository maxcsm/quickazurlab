import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileDetailPage } from './file-detail.page';

describe('FileDetailPage', () => {
  let component: FileDetailPage;
  let fixture: ComponentFixture<FileDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FileDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
