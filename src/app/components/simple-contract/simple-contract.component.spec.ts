import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleContractComponent } from './simple-contract.component';

describe('SimpleContractComponent', () => {
  let component: SimpleContractComponent;
  let fixture: ComponentFixture<SimpleContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
