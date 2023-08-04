import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsRendererComponent } from './actions-renderer.component';

describe('ActionsRendererComponent', () => {
  let component: ActionsRendererComponent;
  let fixture: ComponentFixture<ActionsRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ActionsRendererComponent]
    });
    fixture = TestBed.createComponent(ActionsRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
