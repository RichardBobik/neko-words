import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';
import { Animal } from '../../models/animal.model';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-animal-card',
  standalone: true,
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss'],
  imports: [CommonModule],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class AnimalCardComponent {
  @Input() animal!: Animal;
  @Output() cardClick = new EventEmitter<void>();
  isPlaying = false;

  constructor(private audioService: AudioService) {}

  async onPlayClick(event: MouseEvent) {
    event.stopPropagation();
    if (this.animal.audioUrl) {
      this.isPlaying = true;

      try {
        await this.audioService.play(this.animal.audioUrl);
      } catch (err) {
        console.error('Audio failed to play', err);
      }

      this.audioService.onEnded(() => {
        this.isPlaying = false;
      });
    }
  }

  onCardClick() {
    this.cardClick.emit();
  }
}
