import { Injectable } from '@angular/core';
import { Animal } from '../models/animal.model';
import { QuizQuestion } from '../models/quiz-question.model';

@Injectable({ providedIn: 'root' })
export class QuizService {
  quizQuestions: QuizQuestion[] = [];
  quizIndex = 0;
  quizScore = 0;
  isQuizActive = false;
  quizMode: 'romaji' | 'kana' | 'kanji' = 'romaji';
  quizCompleted = false;

  startQuiz(animals: Animal[], mode: 'romaji' | 'kana' | 'kanji') {
    this.quizCompleted = false;
    this.isQuizActive = true;
    this.quizMode = mode;
    this.quizScore = 0;
    this.quizIndex = 0;

    const filteredAnimals =
      mode === 'kanji'
        ? animals.filter((a) => !!a.nameJpKanji?.trim())
        : animals;

    const shuffled = [...filteredAnimals].sort(() => Math.random() - 0.5);

    const selected = shuffled.slice(0, 10);

    this.quizQuestions = selected.map((animal) => {
      const correct = this.getAnswerByMode(animal, mode);

      const incorrectPool = filteredAnimals.filter((a) => a !== animal);
      const wrongAnswers = incorrectPool
        .map((a) => this.getAnswerByMode(a, mode))
        .filter((val) => !!val && val !== correct)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const options = [...wrongAnswers, correct].sort(
        () => Math.random() - 0.5
      );

      return {
        imageUrl: animal.imageUrl,
        correctAnswer: correct,
        options,
        animalNameEn: animal.nameEn,
        selectedAnswer: undefined,
      };
    });

    this.isQuizActive = true;
  }

  getAnswerByMode(animal: Animal, mode: 'romaji' | 'kana' | 'kanji'): string {
    switch (mode) {
      case 'romaji':
        return animal.romaji;
      case 'kana':
        return animal.nameJpKana;
      case 'kanji':
        return animal.nameJpKanji ?? '';
    }
  }

  submitAnswer(selected: string) {
    const currentQuestion = this.quizQuestions[this.quizIndex];
    currentQuestion.selectedAnswer = selected;

    if (selected === currentQuestion.correctAnswer) {
      this.quizScore++;
    }

    this.quizIndex++;
    if (this.quizIndex >= this.quizQuestions.length) {
      this.isQuizActive = false;
      this.quizCompleted = true;
    }

    if (this.quizIndex >= this.quizQuestions.length) {
      this.isQuizActive = false;
    }
  }

  endQuiz() {
    this.isQuizActive = false;
    this.quizCompleted = false;
    this.quizQuestions = [];
  }

  get missedQuestions() {
    return this.quizQuestions.filter(
      (q) => q.selectedAnswer && q.selectedAnswer !== q.correctAnswer
    );
  }
}
