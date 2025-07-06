import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private audio?: HTMLAudioElement;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio();
    }
  }

  play(url: string) {
    if (!url || !this.audio) return;

    this.audio.pause();
    this.audio.src = url;
    this.audio.load();
    this.audio.play();
  }

  stop() {
    if (!this.audio) return;
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  onEnded(callback: () => void) {
    if (!this.audio) return;
    this.audio.onended = callback;
  }
}
