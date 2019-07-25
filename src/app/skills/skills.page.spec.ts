import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:src/app/Pages/Projects/projects.page.spec.ts
import { ProjectsPage } from './Projects.page';

describe('Tab2Page', () => {
  let component: ProjectsPage;
  let fixture: ComponentFixture<ProjectsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsPage],
=======
import { SkillsPage } from './skills.page';

describe('SkillsPage', () => {
  let component: SkillsPage;
  let fixture: ComponentFixture<SkillsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsPage ],
>>>>>>> 2f8700c1da444c19967e441f0eb80b629777cc52:src/app/skills/skills.page.spec.ts
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD:src/app/Pages/Projects/projects.page.spec.ts
    fixture = TestBed.createComponent(ProjectsPage);
=======
    fixture = TestBed.createComponent(SkillsPage);
>>>>>>> 2f8700c1da444c19967e441f0eb80b629777cc52:src/app/skills/skills.page.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
