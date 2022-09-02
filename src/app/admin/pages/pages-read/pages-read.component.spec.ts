import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesReadComponent } from './pages-read.component';

describe('PagesReadComponent', () => {
  let component: PagesReadComponent;
  let fixture: ComponentFixture<PagesReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
