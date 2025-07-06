import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function mockAllImages(fixture: ComponentFixture<any>): void {
  const images = fixture.debugElement.queryAll(By.css('img'));
  images.forEach((imgDebugEl) => {
    imgDebugEl.nativeElement.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
  });
}
