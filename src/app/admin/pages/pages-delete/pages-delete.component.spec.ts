import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesDeleteComponent } from './pages-delete.component';

describe('PagesDeleteComponent', () => {
  let component: PagesDeleteComponent;
  let fixture: ComponentFixture<PagesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
