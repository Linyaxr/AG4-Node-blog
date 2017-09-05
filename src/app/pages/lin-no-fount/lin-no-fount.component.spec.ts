import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinNoFountComponent } from './lin-no-fount.component';

describe('LinNoFountComponent', () => {
  let component: LinNoFountComponent;
  let fixture: ComponentFixture<LinNoFountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinNoFountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinNoFountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
