import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateCardListComponent } from './rate-card-list.component';

describe('RateCardListComponent', () => {
  let component: RateCardListComponent;
  let fixture: ComponentFixture<RateCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
