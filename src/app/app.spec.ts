import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { App } from './app';
import { HomeComponent } from './pages/home/home.component';
import { mockAllImages } from './test-helpers/mock-images';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, HomeComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockAllImages(fixture);
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have title 'neko-words'`, () => {
    expect(component['title']).toBe('neko-words');
  });

  it('should render the HomeComponent', () => {
    const homeElement = fixture.nativeElement.querySelector('app-home');
    expect(homeElement).toBeTruthy();
  });
});
