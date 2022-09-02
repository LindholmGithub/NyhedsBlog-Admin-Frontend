import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesCreateComponent } from './pages-create.component';

describe('PagesCreateComponent', () => {
  let component: PagesCreateComponent;
  let fixture: ComponentFixture<PagesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
