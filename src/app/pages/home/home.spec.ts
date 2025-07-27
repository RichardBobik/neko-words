import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  NoopAnimationsModule,
  provideNoopAnimations,
} from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { AnimalService } from '../../services/animal.service';
import { of } from 'rxjs';
import { Animal } from '../../models/animal.model';
import { mockAllImages } from '../../test-helpers/mock-images';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockAnimals: Animal[] = [
    {
      id: 1,
      nameEn: 'Frog',
      nameJpKana: 'カエル',
      nameJpKanji: '蛙',
      romaji: 'kaeru',
      category: 'amphibian',
      imageUrl: 'frog.jpg',
    },
    {
      id: 2,
      nameEn: 'Cat',
      nameJpKana: 'ネコ',
      nameJpKanji: '猫',
      romaji: 'neko',
      category: 'mammal',
      imageUrl: 'cat.jpg',
    },
    {
      id: 3,
      nameEn: 'Cricket',
      nameJpKana: 'コオロギ',
      romaji: 'koorogi',
      imageUrl: 'cricket.jpg',
      category: 'insect',
    },
  ];

  const mockAnimalService = {
    getAnimals: jasmine
      .createSpy('getAnimals')
      .and.returnValue(of(mockAnimals)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, NoopAnimationsModule],
      providers: [
        provideHttpClientTesting(),
        provideNoopAnimations(),
        { provide: AnimalService, useValue: mockAnimalService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockAllImages(fixture);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load animals and extract categories', () => {
    expect(component.animals.length).toBe(3);
    expect(component.categories).toContain('amphibian');
    expect(component.categories).toContain('mammal');
    expect(component.categories).toContain('insect');
  });

  it('should filter animals by search term', () => {
    component.searchTerm = 'neko';
    const results = component.filteredAnimals;
    expect(results.length).toBe(1);
    expect(results[0].nameEn).toBe('Cat');
  });

  it('should filter animals by category', () => {
    component.filterByCategory('mammal');
    const results = component.filteredAnimals;
    expect(results.length).toBe(1);
    expect(results[0].category).toBe('mammal');
  });

  it('should clear category filter', () => {
    component.filterByCategory('amphibian');
    component.clearFilter();
    expect(component.selectedCategory).toBeNull();
  });

  it('should open and close animal modal', () => {
    const animal = mockAnimals[0];
    component.openModal(animal);
    expect(component.selectedAnimal).toBe(animal);
    component.closeModal();
    expect(component.selectedAnimal).toBeNull();
  });

  it('should toggle dark mode and update body class', () => {
    component.toggleDarkMode();
    expect(component.isDarkMode).toBeTrue();
    expect(document.body.className).toBe('dark-theme');

    component.toggleDarkMode();
    expect(component.isDarkMode).toBeFalse();
    expect(document.body.className).toBe('');
  });
  it('should start quiz with max 10 questions', () => {
    component.startQuiz('romaji');
    expect(component.isQuizActive).toBeTrue();
    expect(component.quizCompleted).toBeFalse();
    expect(component.quizQuestions.length).toBeLessThanOrEqual(10);
  });

  it('should increase score on correct quiz answer', () => {
    component.startQuiz('romaji');
    const question = component.quizQuestions[0];
    component.submitAnswer(question.correctAnswer);
    expect(component.quizScore).toBe(1);
  });

  it('should progress through quiz questions', () => {
    component.startQuiz('romaji');
    const initialIndex = component.quizIndex;
    const current = component.quizQuestions[initialIndex];
    component.submitAnswer(current.correctAnswer);
    expect(component.quizIndex).toBe(initialIndex + 1);
  });

  it('should end quiz and reset state', () => {
    component.startQuiz('romaji');
    component.endQuiz();
    expect(component.isQuizActive).toBeFalse();
    expect(component.quizCompleted).toBeFalse();
    expect(component.quizQuestions.length).toBe(0);
  });

  it('should set quizCompleted to true after last answer', () => {
    component.startQuiz('romaji');

    const totalQuestions = component.quizQuestions.length;

    for (let i = 0; i < totalQuestions; i++) {
      const question = component.quizQuestions[i];
      component.submitAnswer(question.correctAnswer);
    }

    expect(component.quizCompleted).toBeTrue();
    expect(component.isQuizActive).toBeFalse();
    expect(component.quizIndex).toBe(totalQuestions);
  });

  it('should return missed questions', () => {
    component.startQuiz('romaji');

    const firstQuestion = component.quizQuestions[0];
    const wrongAnswer = 'WRONG_ANSWER_NOT_IN_OPTIONS';
    component.submitAnswer(wrongAnswer);

    for (let i = 1; i < component.quizQuestions.length; i++) {
      const question = component.quizQuestions[i];
      component.submitAnswer(question.correctAnswer);
    }

    expect(component.quizCompleted).toBeTrue();
    expect(component.missedQuestions.length).toBeGreaterThan(0);
    expect(component.missedQuestions[0].correctAnswer).toBe(
      firstQuestion.correctAnswer
    );
  });
});
