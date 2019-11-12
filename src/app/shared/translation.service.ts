import {ApplicationRef, Injectable, NgZone} from '@angular/core';
import {Translations} from '../../assets/translations';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  public translations: any;

  constructor() {
    this.translations = Translations['Russian'];
  }

  setLocale(locale: string) {
    this.translations = Translations[locale];
  }

}
