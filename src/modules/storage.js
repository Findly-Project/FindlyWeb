export class StorageManager {
  constructor(app) {
    this.app = app;
  }

  saveStateToLocalStorage() {
    const state = {
      maxSize: this.app.maxSize,
      filters: this.app.filters,
    };
    localStorage.setItem('findlyAppState', JSON.stringify(state));
  }

  loadStateFromLocalStorage() {
    const savedStateJSON = localStorage.getItem('findlyAppState');
    if (savedStateJSON) {
      const savedState = JSON.parse(savedStateJSON);
      this.app.maxSize = savedState.maxSize ?? this.app.constructor.DEFAULT_MAX_SIZE;
      this.app.filters = savedState.filters ?? { 
        onlyNew: false, 
        nameFilter: false, 
        priceFilter: false, 
        excludeWords: [] 
      };
    }
  }

  addExcludeWord() {
    const input = this.app.elements['exclude-word-input'];
    const word = input.value.trim();
    
    const validation = this.app.validation.validateExcludeWord(word);
    if (!validation.isValid) {
      this.app.ui.showToast(validation.message, 1500);
      return;
    }

    this.app.filters.excludeWords.push(word);
    this.app.ui.renderExcludeWords();
    this.saveStateToLocalStorage();
    input.value = '';
  }

  removeExcludeWord(word) {
    this.app.filters.excludeWords = this.app.filters.excludeWords.filter(w => w !== word);
    this.app.ui.renderExcludeWords();
    this.saveStateToLocalStorage();
  }
} 