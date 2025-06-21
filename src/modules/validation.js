export class ValidationManager {
  constructor(app) {
    this.app = app;
  }

  validateQuery(query) {
    if (!query) {
      return { isValid: false, message: 'Query cannot be empty' };
    }

    if (!this.app.constructor.QUERY_VALIDATION_REGEX.test(query)) {
      return { isValid: false, message: 'The request can contain only numbers and letters' };
    }

    if (query.length < 3 || query.length > 20) {
      return { isValid: false, message: 'The request must be >=3 and <=20 characters' };
    }

    if (this.app.filters.nameFilter && this.app.filters.excludeWords.length > 0) {
      const queryWords = query.toLowerCase().split(/\s+/);
      const excludeWordsLower = this.app.filters.excludeWords.map(w => w.toLowerCase());
      const forbiddenWord = queryWords.find(qw => excludeWordsLower.includes(qw));

      if (forbiddenWord) {
        return { 
          isValid: false, 
          message: `The query cannot contain the exception word "${forbiddenWord}", because "Filter by name" is enabled.` 
        };
      }
    }

    return { isValid: true };
  }

  validateExcludeWord(word) {
    if (!word) {
      return { isValid: false, message: 'Exclude word cannot be empty' };
    }

    if (word.length > 8) {
      return { isValid: false, message: 'Exclude word must be <=8 characters' };
    }

    if (!this.app.constructor.EXCLUDE_WORD_VALIDATION_REGEX.test(word)) {
      return { isValid: false, message: 'Exclude word can contain only numbers and letters' };
    }

    if (this.app.filters.excludeWords.includes(word)) {
      return { isValid: false, message: 'Excluded word has already been added' };
    }

    if (this.app.filters.excludeWords.length >= this.app.constructor.MAX_EXCLUDE_WORDS) {
      return { isValid: false, message: 'Exclude word limit reached' };
    }

    return { isValid: true };
  }
} 