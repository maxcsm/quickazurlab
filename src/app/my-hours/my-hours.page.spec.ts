import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyHoursPage } from './my-hours.page';

describe('MyHoursPage', () => {
  let component: MyHoursPage;
  let fixture: ComponentFixture<MyHoursPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyHoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
