import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AudioService } from 'app/services/audio.service';
import { AnimalDetailModalComponent } from './animal-detail-modal.component';
import { By } from '@angular/platform-browser';
import { Animal } from 'app/models/animal.model';
import { mockAllImages } from '../../test-helpers/mock-images';

describe('AnimalDetailModalComponent', () => {
  let component: AnimalDetailModalComponent;
  let fixture: ComponentFixture<AnimalDetailModalComponent>;
  let audioServiceSpy: jasmine.SpyObj<AudioService>;

  const testAnimal: Animal = {
    id: 1,
    nameEn: 'Frog',
    nameJpKana: 'カエル',
    nameJpKanji: '蛙',
    romaji: 'kaeru',
    category: 'amphibian',
    imageUrl: 'frog.jpg',
    audioUrl: 'frog.mp3',
  };

  beforeEach(async () => {
    audioServiceSpy = jasmine.createSpyObj('AudioService', ['play']);

    await TestBed.configureTestingModule({
      imports: [AnimalDetailModalComponent, NoopAnimationsModule],
      providers: [{ provide: AudioService, useValue: audioServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalDetailModalComponent);
    component = fixture.componentInstance;
    component.animal = testAnimal;
    fixture.detectChanges();
    mockAllImages(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render animal data', () => {
    const imgEl = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgEl.src).toBeTruthy();
    expect(imgEl.alt).toBe(testAnimal.nameEn);

    const nameEl = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(nameEl.textContent).toContain(testAnimal.nameEn);

    const romajiKanaEl = fixture.debugElement.queryAll(By.css('p'))[0]
      .nativeElement;
    expect(romajiKanaEl.textContent).toContain(testAnimal.romaji);
    expect(romajiKanaEl.textContent).toContain(testAnimal.nameJpKana);

    const kanjiEl = fixture.debugElement.queryAll(By.css('p'))[1].nativeElement;
    expect(kanjiEl.textContent).toContain(testAnimal.nameJpKanji);
  });

  it('should not call audioService.play if audioUrl is empty', () => {
    component.animal.audioUrl = '';
    fixture.detectChanges();

    const playButton = fixture.debugElement.query(By.css('.audio-btn'));
    playButton.triggerEventHandler('click', null);

    expect(audioServiceSpy.play).not.toHaveBeenCalled();
  });

  it('should emit close event when onClose is called', () => {
    spyOn(component.close, 'emit');
    component.onClose();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should emit close when backdrop is clicked', () => {
    spyOn(component.close, 'emit');
    const backdrop = fixture.debugElement.query(By.css('.modal-backdrop'));
    backdrop.triggerEventHandler('click', null);
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should emit close when close button is clicked', () => {
    spyOn(component.close, 'emit');
    const closeButton = fixture.debugElement.query(By.css('.close-btn'));
    closeButton.triggerEventHandler('click', null);
    expect(component.close.emit).toHaveBeenCalled();
  });
});
