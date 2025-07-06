import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AnimalCardComponent } from '../../components/animal-card/animal-card.component';
import { AnimalService } from '../../services/animal.service';
import { QuizService } from '../../services/quiz.service';
import { AnimalDetailModalComponent } from '../../components/animal-detail-modal/animal-detail-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Animal } from '../../models/animal.model';
import { QuizQuestionComponent } from '../../components/quiz-question/quiz-question.component';
import { QuizQuestion } from 'app/models/quiz-question.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AnimalCardComponent,
    AnimalDetailModalComponent,
    QuizQuestionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';
  selectedCategory: string | null = 'Amphibian';

  animals: Animal[] = [];
  selectedAnimal: Animal | null = null;
  categories: string[] = [];

  constructor(
    private animalService: AnimalService,
    public quizService: QuizService
  ) {}

  ngOnInit() {
    this.loadAnimals();
  }

  loadAnimals() {
    this.animalService.getAnimals().subscribe((data) => {
      this.animals = data;

      this.categories = Array.from(
        new Set(this.animals.map((a) => a.category))
      );

      if (
        this.selectedCategory &&
        !this.categories.includes(this.selectedCategory)
      ) {
        this.selectedCategory = null;
      }
    });
  }

  get filteredAnimals() {
    return this.animals.filter((animal) => {
      const matchesCategory =
        !this.selectedCategory || animal.category === this.selectedCategory;
      const matchesSearch =
        animal.nameEn.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        animal.romaji.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        animal.nameJpKana
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        (animal.nameJpKanji
          ?.toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ??
          false);

      return matchesCategory && matchesSearch;
    });
  }

  filterByCategory(cat: string) {
    this.selectedCategory = cat;
  }

  clearFilter() {
    this.selectedCategory = null;
  }

  openModal(animal: Animal) {
    this.selectedAnimal = animal;
  }

  closeModal() {
    this.selectedAnimal = null;
  }

  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const themeClass = this.isDarkMode ? 'dark-theme' : '';
    document.body.className = themeClass;
  }

  startQuiz(mode: 'romaji' | 'kana' | 'kanji') {
    this.quizService.startQuiz(this.animals, mode);
  }

  submitAnswer(answer: string) {
    this.quizService.submitAnswer(answer);
  }

  endQuiz() {
    this.quizService.endQuiz();
  }

  get quizQuestions() {
    return this.quizService.quizQuestions;
  }

  get quizIndex() {
    return this.quizService.quizIndex;
  }

  get quizScore() {
    return this.quizService.quizScore;
  }

  get quizMode() {
    return this.quizService.quizMode;
  }

  get isQuizActive() {
    return this.quizService.isQuizActive;
  }

  get missedQuestions() {
    return this.quizService.missedQuestions;
  }

  get quizCompleted() {
    return this.quizService.quizCompleted;
  }
}
