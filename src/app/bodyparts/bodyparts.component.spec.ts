import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodypartsComponent } from './bodyparts.component';

describe('BodypartsComponent', () => {
  let component: BodypartsComponent;
  let fixture: ComponentFixture<BodypartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodypartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodypartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
