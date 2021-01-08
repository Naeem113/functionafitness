import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSkillCategoryComponent } from './update-skill-category.component';

describe('UpdateSkillCategoryComponent', () => {
  let component: UpdateSkillCategoryComponent;
  let fixture: ComponentFixture<UpdateSkillCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSkillCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSkillCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
