import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private animalsUrl = 'assets/data/animals.json';

  constructor(private http: HttpClient) {}

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.animalsUrl);
  }
}
