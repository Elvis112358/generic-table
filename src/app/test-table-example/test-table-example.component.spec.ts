import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTableExampleComponent } from './test-table-example.component';

describe('TestTableExampleComponent', () => {
  let component: TestTableExampleComponent;
  let fixture: ComponentFixture<TestTableExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTableExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTableExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
