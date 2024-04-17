import { Injectable } from '@angular/core';
import {LocalStorageService} from "@app/services/local-storage.service";
import {languages} from "@app/data/languages";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly defaultLanguage = languages[0];

  private readonly languageKey = 'language';

  constructor(private localStorageService :LocalStorageService) {}

  applyDefault(language: string) {
    this.localStorageService.setItem(this.languageKey, this.defaultLanguage.code);
  }

  setLanguage(language: string) {

    // Check if language exists
    if (!languages.map(l => l.code).includes(language)) {
      this.applyDefault(language)
      console.error('\n[LanguageService](setLanguage) Language not found, default language applied');
      return;
    }

    this.localStorageService.setItem(this.languageKey, language);
  }

}
