import { Component, EventEmitter, Output } from '@angular/core';
import { Language } from '../models/language';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css'],
})
export class LanguageSelectorComponent {
  @Output() change: EventEmitter<any> = new EventEmitter();
  data: Language[] = [
    { id: 1, name: 'ENG' },
    { id: 2, name: 'GEO' },
    { id: 3, name: 'FRA' },
  ];
  selectedLanguage: Language = this.data[0];

  onChange() {
    if (this.data && this.selectedLanguage) {
      const currentIndex = this.data.findIndex(lang => lang.id === this.selectedLanguage.id);
      if (currentIndex !== -1) {
        const nextIndex = (currentIndex + 1) % this.data.length;
        this.selectedLanguage = this.data[nextIndex];
        console.log(`Selected language: ${this.selectedLanguage.name}`);
        this.change.emit(this.selectedLanguage);
      }
    }
  }
}
