import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleContractFormComponent } from './simple-contract-form.component';

describe('SimpleContractFormComponent', () => {
  let component: SimpleContractFormComponent;
  let fixture: ComponentFixture<SimpleContractFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleContractFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleContractFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
