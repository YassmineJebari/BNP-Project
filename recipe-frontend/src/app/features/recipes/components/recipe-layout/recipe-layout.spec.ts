import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeLayout } from './recipe-layout';

describe('RecipeLayout', () => {
  let component: RecipeLayout;
  let fixture: ComponentFixture<RecipeLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
