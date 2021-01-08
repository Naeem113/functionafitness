import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWhatAmIFeelingComponent } from './detail-what-am-i-feeling.component';

describe('DetailWhatAmIFeelingComponent', () => {
  let component: DetailWhatAmIFeelingComponent;
  let fixture: ComponentFixture<DetailWhatAmIFeelingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailWhatAmIFeelingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailWhatAmIFeelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
