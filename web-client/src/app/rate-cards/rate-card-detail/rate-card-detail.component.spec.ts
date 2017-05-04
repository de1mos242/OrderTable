import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateCardDetailComponent } from './rate-card-detail.component';

describe('RateCardDetailComponent', () => {
  let component: RateCardDetailComponent;
  let fixture: ComponentFixture<RateCardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateCardDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
