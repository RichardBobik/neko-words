export interface QuizQuestion {
  imageUrl: string;
  correctAnswer: string;
  options: string[];
  animalNameEn: string;
  selectedAnswer?: string;
}
