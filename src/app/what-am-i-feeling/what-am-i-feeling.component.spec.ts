import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatAmIFeelingComponent } from './what-am-i-feeling.component';

describe('WhatAmIFeelingComponent', () => {
  let component: WhatAmIFeelingComponent;
  let fixture: ComponentFixture<WhatAmIFeelingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatAmIFeelingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatAmIFeelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
