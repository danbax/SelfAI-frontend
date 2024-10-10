// src/dto/language-code.dto.ts
export class LanguageCodeDTO {
    languageCode: string;
  
    constructor(languageCode: string = 'english') {
      this.languageCode = languageCode;
    }
  }
  