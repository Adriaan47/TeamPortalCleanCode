import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillsPage } from './add-skills.page';

describe('AddSkillsPage', () => {
  let component: AddSkillsPage;
  let fixture: ComponentFixture<AddSkillsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSkillsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
