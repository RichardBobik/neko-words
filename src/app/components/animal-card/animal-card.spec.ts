import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimalCardComponent } from './animal-card.component';
import { Animal } from '../../models/animal.model';
import { AudioService } from '../../services/audio.service';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { mockAllImages } from '../../test-helpers/mock-images';

describe('AnimalCardComponent', () => {
  let component: AnimalCardComponent;
  let fixture: ComponentFixture<AnimalCardComponent>;
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
    audioServiceSpy = jasmine.createSpyObj('AudioService', ['play', 'onEnded']);

    await TestBed.configureTestingModule({
      imports: [AnimalCardComponent, NoopAnimationsModule],
      providers: [{ provide: AudioService, useValue: audioServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalCardComponent);
    component = fixture.componentInstance;
    component.animal = testAnimal;
    fixture.detectChanges();
    mockAllImages(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render animal data correctly', () => {
    const imgEl = fixture.debugElement.query(By.css('img'))
      .nativeElement as HTMLImageElement;
    expect(imgEl.src).toBeTruthy();
    expect(imgEl.alt).toBe(testAnimal.nameEn);

    const nameEnEl = fixture.debugElement.query(
      By.css('.animal-name')
    ).nativeElement;
    expect(nameEnEl.textContent).toBe(testAnimal.nameEn);

    const romajiEl = fixture.debugElement.query(
      By.css('.romaji')
    ).nativeElement;
    expect(romajiEl.textContent.trim()).toBe(testAnimal.romaji);

    const kanaEl = fixture.debugElement.query(By.css('.kana')).nativeElement;
    expect(kanaEl.textContent.trim()).toBe(testAnimal.nameJpKana);

    const kanjiEl = fixture.debugElement.query(By.css('.kanji')).nativeElement;
    expect(kanjiEl.textContent.trim()).toBe(testAnimal.nameJpKanji);
  });

  it('should emit cardClick event when card is clicked', () => {
    spyOn(component.cardClick, 'emit');

    const card = fixture.debugElement.query(By.css('.card'));
    card.triggerEventHandler('click', null);

    expect(component.cardClick.emit).toHaveBeenCalled();
  });

  it('should call audioService.play and set isPlaying correctly on play click', async () => {
    audioServiceSpy.play.and.returnValue(await Promise.resolve());
    audioServiceSpy.onEnded.and.callFake((cb: () => void) => cb());

    await component.onPlayClick(new MouseEvent('click'));
    fixture.detectChanges();

    expect(component.isPlaying).toBeFalse();

    component.isPlaying = true;
    fixture.detectChanges();
    let waveBars = fixture.debugElement.query(By.css('.wave-bars'));
    expect(waveBars).toBeTruthy();

    component.isPlaying = false;
    fixture.detectChanges();
    waveBars = fixture.debugElement.query(By.css('.wave-bars'));
    expect(waveBars).toBeNull();
  });

  it('should not call audioService.play if audioUrl is missing', async () => {
    component.animal.audioUrl = '';
    await component.onPlayClick(new MouseEvent('click'));
    expect(audioServiceSpy.play).not.toHaveBeenCalled();
  });

  it('should stop event propagation when play button is clicked', () => {
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');

    component.onPlayClick(event);

    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
