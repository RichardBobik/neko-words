import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuizQuestionComponent } from './quiz-question.component';
import { QuizQuestion } from '../../models/quiz-question.model';
import { mockAllImages } from '../../test-helpers/mock-images';

describe('QuizQuestionComponent', () => {
  let component: QuizQuestionComponent;
  let fixture: ComponentFixture<QuizQuestionComponent>;

  const testQuestion: QuizQuestion = {
    imageUrl: 'frog.jpg',
    correctAnswer: 'Frog',
    options: ['Frog', 'Toad', 'Salamander'],
    animalNameEn: 'Frog',
    selectedAnswer: undefined,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizQuestionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizQuestionComponent);
    component = fixture.componentInstance;
    component.question = testQuestion;
    component.currentIndex = 0;
    component.totalQuestions = 3;
    fixture.detectChanges();
    mockAllImages(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render question image with correct src', () => {
    const imgEl = fixture.debugElement.query(By.css('img.quiz-image'))
      .nativeElement as HTMLImageElement;
    expect(imgEl.src).toBeTruthy();
  });

  it('should render all options as buttons', () => {
    const optionButtons = fixture.debugElement.queryAll(
      By.css('button.option')
    );
    expect(optionButtons.length).toBe(testQuestion.options.length);
    optionButtons.forEach((btn, idx) => {
      expect(btn.nativeElement.textContent.trim()).toBe(
        testQuestion.options[idx]
      );
    });
  });

  it('should display current question index and total questions', () => {
    const indexEl = fixture.debugElement.query(
      By.css('.question-index')
    ).nativeElement;
    expect(indexEl.textContent).toContain(
      `Question ${component.currentIndex + 1} of ${component.totalQuestions}`
    );
  });

  it('should emit "answer" event when an option is clicked', () => {
    spyOn(component.answer, 'emit');
    const optionButtons = fixture.debugElement.queryAll(
      By.css('button.option')
    );
    optionButtons[1].triggerEventHandler('click', null);
    expect(component.answer.emit).toHaveBeenCalledWith(testQuestion.options[1]);
  });

  it('should emit "close" event when close button is clicked', () => {
    spyOn(component.close, 'emit');
    const closeBtn = fixture.debugElement.query(By.css('button.close-btn'));
    closeBtn.triggerEventHandler('click', null);
    expect(component.close.emit).toHaveBeenCalled();
  });
});
