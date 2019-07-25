import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMembersPage } from './search-members.page';

describe('SearchMembersPage', () => {
  let component: SearchMembersPage;
  let fixture: ComponentFixture<SearchMembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMembersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
