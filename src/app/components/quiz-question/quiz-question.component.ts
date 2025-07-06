import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizQuestion } from '../../models/quiz-question.model';

@Component({
  selector: 'app-quiz-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss'],
})
export class QuizQuestionComponent {
  @Input() question!: QuizQuestion;
  @Input() currentIndex!: number;
  @Input() totalQuestions!: number;

  @Output() answer = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  onAnswerClick(option: string) {
    this.answer.emit(option);
  }

  onCloseClick() {
    this.close.emit();
  }
}
