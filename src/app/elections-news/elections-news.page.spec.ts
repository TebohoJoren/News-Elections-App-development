import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionsNewsPage } from './elections-news.page';

describe('ElectionsNewsPage', () => {
  let component: ElectionsNewsPage;
  let fixture: ComponentFixture<ElectionsNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectionsNewsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionsNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
