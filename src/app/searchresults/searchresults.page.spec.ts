import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchResultsPage } from "./searchresults.page";

describe("searchresultsPage", () => {
  let component: SearchResultsPage;
  let fixture: ComponentFixture<SearchResultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
