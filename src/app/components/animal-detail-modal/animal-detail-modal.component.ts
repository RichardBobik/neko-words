import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { Animal } from '../../models/animal.model';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-animal-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animal-detail-modal.component.html',
  styleUrls: ['./animal-detail-modal.component.scss'],
  animations: [
    trigger('fadeZoom', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0.9)', // ✨ Already centered
        }),
        animate(
          '200ms ease-out',
          style({
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1)',
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in',
          style({
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0.9)',
          })
        ),
      ]),
    ]),
    trigger('backdropFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 0.6 })),
      ]),
      transition(':leave', [animate('150ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AnimalDetailModalComponent {
  @Input() animal!: Animal;
  @Output() close = new EventEmitter<void>();

  constructor(private audioService: AudioService) {}

  playAudio() {
    if (this.animal.audioUrl) {
      this.audioService.play(this.animal.audioUrl);
    }
  }

  onClose() {
    this.close.emit();
  }
}
