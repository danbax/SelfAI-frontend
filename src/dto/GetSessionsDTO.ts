// src/dto/GetSessionsDTO.ts
export class GetSessionsDTO {
  categoryId: number;
  languageCode: string;

  constructor(categoryId: number, languageCode: string = 'english') {
    this.categoryId = categoryId;
    this.languageCode = languageCode;
  }
}