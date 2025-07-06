export interface Animal {
  id: number;
  nameEn: string;
  nameJpKana: string;
  nameJpKanji?: string;
  romaji: string;
  imageUrl: string;
  audioUrl?: string;
  category: 'mammal' | 'bird' | 'reptile' | 'amphibian' | 'fish' | 'insect';
}
