import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinCaehComponent } from './lin-caeh.component';

describe('LinCaehComponent', () => {
  let component: LinCaehComponent;
  let fixture: ComponentFixture<LinCaehComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinCaehComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinCaehComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
