import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedPositionsComponent } from './grouped-positions.component';

describe('GroupedPositionsComponent', () => {
  let component: GroupedPositionsComponent;
  let fixture: ComponentFixture<GroupedPositionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupedPositionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
