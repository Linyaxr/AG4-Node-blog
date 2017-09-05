import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinChangeComponent } from './lin-change.component';

describe('LinChangeComponent', () => {
  let component: LinChangeComponent;
  let fixture: ComponentFixture<LinChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
