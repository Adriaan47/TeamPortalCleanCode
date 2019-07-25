import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersInfoPage } from './members-info.page';

describe('MembersInfoPage', () => {
  let component: MembersInfoPage;
  let fixture: ComponentFixture<MembersInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
