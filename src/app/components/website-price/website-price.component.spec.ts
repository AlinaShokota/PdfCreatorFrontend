import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsitePriceComponent } from './website-price.component';

describe('WebsitePriceComponent', () => {
  let component: WebsitePriceComponent;
  let fixture: ComponentFixture<WebsitePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsitePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsitePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
