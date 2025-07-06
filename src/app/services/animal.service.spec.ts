import { TestBed } from '@angular/core/testing';
import { AnimalService } from './animal.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Animal } from '../models/animal.model';

describe('AnimalService', () => {
  let service: AnimalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AnimalService],
    });

    service = TestBed.inject(AnimalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch animals from JSON', () => {
    const mockAnimals: Animal[] = [
      {
        id: 1,
        nameEn: 'Frog',
        category: 'amphibian',
        nameJpKana: '',
        romaji: '',
        imageUrl: '',
      },
    ];

    service.getAnimals().subscribe((animals) => {
      expect(animals).toEqual(mockAnimals);
    });

    const req = httpMock.expectOne('assets/data/animals.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockAnimals);
  });
});
