import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMessageComponent } from './dialog-message.component';

describe('DialogMessageComponent', () => {
  let component: DialogMessageComponent;
  let fixture: ComponentFixture<DialogMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogMessageComponent]
    });
    fixture = TestBed.createComponent(DialogMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
