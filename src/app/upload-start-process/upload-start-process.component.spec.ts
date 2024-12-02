import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStartProcessComponent } from './upload-start-process.component';

describe('UploadStartProcessComponent', () => {
  let component: UploadStartProcessComponent;
  let fixture: ComponentFixture<UploadStartProcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadStartProcessComponent]
    });
    fixture = TestBed.createComponent(UploadStartProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
