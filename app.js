class FindlyWeb {
  static #API_BASE_URL = 'http://192.168.196.105:8000';
  static #SEARCH_ENDPOINT = '/api/search';
  static #MARKETPLACES = ['MMG', 'Onliner', 'Kufar', '21vek'];
  static #DEFAULT_MAX_SIZE = 20;
  static #SEARCH_TIMEOUT = 20000;
  static #MAX_EXCLUDE_WORDS = 5;
  static #QUERY_VALIDATION_REGEX = /^[a-zA-Zа-яА-Я0-9- ]*$/;
  static #EXCLUDE_WORD_VALIDATION_REGEX = /^[a-zA-Zа-яА-Я0-9]*$/;

  #apiBaseUrl = FindlyWeb.#API_BASE_URL;
  #searchEndpoint = FindlyWeb.#SEARCH_ENDPOINT;
  #marketplaces = FindlyWeb.#MARKETPLACES;

  #toastTimeoutId = null;
  #currentQuery = '';
  #currentMarketplace = 'MMG';
  #searchResults = {};
  #maxSize = FindlyWeb.#DEFAULT_MAX_SIZE;
  #filters = {
    onlyNew: false,
    nameFilter: false,
    priceFilter: false,
    excludeWords: [],
  };

  #elements = {};

  constructor() {
    this.#loadStateFromLocalStorage();
    this.#initElements();
    this.#syncUiWithState();
    this.#bindEvents();
    this.#initMaxSizeDropdown();
    this.#animateTitle();
  }

  #initElements() {
    const ids = [
      'settings-button', 'settings-menu', 'home-page', 'results-page', 'toast-notification',
      'search-form', 'search-input', 'results-search-form', 'results-search-input',
      'loading-indicator', 'error-message', 'error-text', 'marketplace-tabs',
      'search-results', 'no-results', 'exclude-word-input', 'add-exclude-word',
      'exclude-words-list', 'max-size-dropdown', 'max-size-btn', 'max-size-list',
      'main-search-button', 'second-search-button', 'search-time', 'search-tags'
    ];
    ids.forEach(id => {
      this.#elements[id] = document.getElementById(id);
    });
    this.#elements.filterCheckboxes = document.querySelectorAll('#settings-menu .filter-checkbox');
    this.#elements.tabButtons = document.querySelectorAll('.tab-button');
    this.#elements.resultsLogo = document.querySelector('.results-logo');
    this.#elements.maxSizeOptionEls = document.querySelectorAll('#max-size-list .max-size-option');
  }

  #bindEvents() {
    this.#elements['settings-button']?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.#elements['settings-menu'].classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!this.#elements['settings-menu']?.contains(e.target) && e.target !== this.#elements['settings-button']) {
        this.#elements['settings-menu']?.classList.add('hidden');
      }
      if (!this.#elements['max-size-dropdown']?.contains(e.target)) {
        this.#elements['max-size-list']?.classList.remove('open');
        this.#elements['max-size-btn']?.setAttribute('aria-expanded', 'false');
      }
    });

    this.#elements.filterCheckboxes?.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const filter = e.target.dataset.filter;
        this.#filters[filter] = e.target.checked;
        this.#saveStateToLocalStorage();
      });
    });

    const mainInput = this.#elements['search-input'];
    const resultsInput = this.#elements['results-search-input'];

    if (mainInput && resultsInput) {
      mainInput.addEventListener('input', () => {
        this.#syncSearchInputs(mainInput, resultsInput);
      });

      resultsInput.addEventListener('input', () => {
        this.#syncSearchInputs(resultsInput, mainInput);
      });
    }

    this.#elements['add-exclude-word']?.addEventListener('click', () => this.#addExcludeWord());
    this.#elements['exclude-word-input']?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.#addExcludeWord();
      }
    });

    this.#elements['exclude-words-list']?.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        e.stopPropagation();
        const word = e.target.dataset.word;
        this.#removeExcludeWord(word);
      }
    });

    this.#elements['search-form']?.addEventListener('submit', (e) => this.#handleSearchSubmit(e, this.#elements['search-input']));
    this.#elements['results-search-form']?.addEventListener('submit', (e) => this.#handleSearchSubmit(e, this.#elements['results-search-input']));

    this.#elements.tabButtons?.forEach(button => {
      button.addEventListener('click', () => {
        this.#switchMarketplace(button.dataset.marketplace);
      });
    });

    this.#elements.resultsLogo?.addEventListener('click', () => {
      this.#elements['home-page'].scrollIntoView({ behavior: 'smooth' });
    });
  }

  #saveStateToLocalStorage() {
    const state = {
      maxSize: this.#maxSize,
      filters: this.#filters,
    };
    localStorage.setItem('findlyAppState', JSON.stringify(state));
  }

  #loadStateFromLocalStorage() {
    const savedStateJSON = localStorage.getItem('findlyAppState');
    if (savedStateJSON) {
      const savedState = JSON.parse(savedStateJSON);
      this.#maxSize = savedState.maxSize ?? FindlyWeb.#DEFAULT_MAX_SIZE;
      this.#filters = savedState.filters ?? { onlyNew: false, nameFilter: false, priceFilter: false, excludeWords: [] };
    }
  }


  async #handleSearchSubmit(event, inputElement) {
    event.preventDefault();
    const query = inputElement.value.trim();

    if (!query){
      this.#showToast('Query cannot be empty', 2000)
      return
    }

    if (!FindlyWeb.#QUERY_VALIDATION_REGEX.test(query)){
      this.#showToast('The request can contain only numbers and letters', 2000)
      return
    }

    if (query.length < 3 || query.length > 20){
      this.#showToast('The request must be >=3 and <=20 characters', 2000);
      return
    }

    if (this.#filters.nameFilter && this.#filters.excludeWords.length > 0) {
      const queryWords = query.toLowerCase().split(/\s+/);
      const excludeWordsLower = this.#filters.excludeWords.map(w => w.toLowerCase());
      const forbiddenWord = queryWords.find(qw => excludeWordsLower.includes(qw));

      if (forbiddenWord) {
        this.#showToast(`The query cannot contain the exception word "${forbiddenWord}", because "Filter by name" is enabled.`, 4000);
        return;
      }
    }

    this.#elements['main-search-button'].disabled = true;
    this.#elements['second-search-button'].disabled = true;
    this.#elements['search-time']?.classList.add('hidden');
    this.#elements['search-tags']?.classList.add('hidden');
    await this.performSearch(query);
  }

  #animateTitle() {
    const title = this.#elements['home-page']?.querySelector('h1');
    if (!title) return;

    const text = title.innerText.trim();
    title.innerHTML = '';

    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.className = 'letter';
        span.style.animationDelay = `${index * 0.12}s`;
        title.appendChild(span);
    });
  }

  #initMaxSizeDropdown() {
    const { 'max-size-btn': btn, 'max-size-list': list, maxSizeOptionEls: options } = this.#elements;
    if (!btn || !list) return;

    btn.childNodes[0].nodeValue = `${this.#maxSize} `;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = list.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
    });

    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        this.#maxSize = parseInt(option.dataset.value, 10);
        btn.childNodes[0].nodeValue = `${this.#maxSize} `;
        this.#saveStateToLocalStorage();
        list.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  #syncUiWithState() {
    this.#elements.filterCheckboxes.forEach(cb => {
      cb.checked = this.#filters[cb.dataset.filter];
    });
    this.#renderExcludeWords();
  }

  #addExcludeWord() {
    const input = this.#elements['exclude-word-input'];
    const word = input.value.trim();
    if (!word){
      this.#showToast('Exclude word cannot be empty', 1500);
      return
    } else if (word.length > 8){
      this.#showToast('Exclude word must be <=8 characters', 1500)
      return
    } else if (!FindlyWeb.#EXCLUDE_WORD_VALIDATION_REGEX.test(word)){
      this.#showToast('Exclude word can contain only numbers and letters', 2000)
      return
    } else if (this.#filters.excludeWords.includes(word)){
      this.#showToast('Excluded word has already been added', 1500)
      return
    } else if (this.#filters.excludeWords.length >= FindlyWeb.#MAX_EXCLUDE_WORDS) {
      this.#showToast(`Exclude word limit reached`, 2000);
    } else {
      this.#filters.excludeWords.push(word);
      this.#renderExcludeWords();
      this.#saveStateToLocalStorage();
    }
    input.value = '';
  }

  #removeExcludeWord(word) {
    this.#filters.excludeWords = this.#filters.excludeWords.filter(w => w !== word);
    this.#renderExcludeWords();
    this.#saveStateToLocalStorage();
  }

  #renderExcludeWords() {
    const list = this.#elements['exclude-words-list'];
    if (!list) return;
    list.innerHTML = '';
    this.#filters.excludeWords.forEach(word => {
      const chip = document.createElement('span');
      chip.className = 'exclude-word-chip';
      chip.textContent = word;
      const btn = document.createElement('button');
      btn.innerHTML = '&times;';
      btn.title = 'Удалить';
      btn.dataset.word = word;
      chip.appendChild(btn);
      list.appendChild(chip);
    });
  }

  #syncSearchInputs(source, target) {
    target.value = source.value;
  }


  async performSearch(query) {
    const startTime = performance.now();
    this.#currentQuery = query;

    this.#showResultsPage();
    this.#elements['results-page']?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    this.#showLoading();
    this.#hideError();
    this.#hideResults();

    this.#elements['search-input'].value = query;
    this.#elements['results-search-input'].value = query;

    try {
      const results = await this.#fetchSearchResults(query);
      const searchDuration = performance.now() - startTime;

      this.#displaySearchTime(searchDuration);
      this.#displaySearchTags();
      this.#searchResults = results;
      this.#displayResults(results);
    } catch (error) {
      console.error('Search error:', error);
      let errorMessage = 'Error while searching';
      if (error.name === 'AbortError') {
        errorMessage = 'Timeout';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = `Unable to connect to the server at ${this.#apiBaseUrl}`;
      }
      this.#showError(errorMessage);
    } finally {
      this.#elements['main-search-button'].disabled = false;
      this.#elements['second-search-button'].disabled = false;
      this.#hideLoading();
    }
  }

  async #fetchSearchResults(query) {
    const url = new URL(this.#apiBaseUrl + this.#searchEndpoint);

    const payload = {
        query: query,
        max_size: this.#maxSize,
        filters: {
            only_new: this.#filters.onlyNew,
            name_filter: this.#filters.nameFilter,
            price_filter: this.#filters.priceFilter,
            exclude_words: this.#filters.excludeWords
        }
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FindlyWeb.#SEARCH_TIMEOUT);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } finally {
        clearTimeout(timeoutId);
    }
  }

  #displayResults(results) {
    if (!results?.products_data) {
      this.#showError('Invalid format of response from server');
      return;
    }

    const { products_data } = results;
    let hasAnyResults = false;

    const visibleMarketplaces = [];

    this.#marketplaces.forEach(mp => {
      const products = products_data[mp] || [];
      const count = products.length;
      const tabElement = document.querySelector(`[data-marketplace="${mp}"]`);
      const countElement = document.getElementById(`count-${mp}`);

      if (tabElement) {
          tabElement.classList.toggle('hidden', count === 0);
      }
      if (countElement) {
          countElement.textContent = count > 0 ? count : '';
      }

      if (count > 0) {
        hasAnyResults = true;
        visibleMarketplaces.push(mp);
        this.#renderMarketplaceProducts(mp, products);
      }
    });

    if (hasAnyResults) {
      this.#showResultsContainer();
      const firstVisible = visibleMarketplaces[0] ?? this.#marketplaces[0];
      this.#switchMarketplace(firstVisible);
    } else {
      this.#showNoResults();
    }
  }

  #renderMarketplaceProducts(marketplace, products) {
    const container = document.getElementById(`products-${marketplace}`);
    if (!container) return;
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    products.forEach(product => fragment.appendChild(this.#createProductCard(product)));
    container.appendChild(fragment);
  }

  #createProductCard(product) {
    const card = document.createElement('a');
    card.className = 'product-card';
    card.href = product.link || '#';
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image ?? ''}" alt="${product.name ?? 'Товар'}" onerror="this.parentElement.innerHTML = 'Image not available';">
      </div>
      <div class="product-info">
        <div class="product-title">${product.name ?? 'Название товара'}</div>
        <div class="product-price">${product.price ?? 'Цена не указана'} BYN</div>
      </div>
    `;
    if (!product.image) {
        card.querySelector('.product-image').innerHTML = 'Image not available';
    }
    return card;
  }

  #displaySearchTime(duration) {
    const el = this.#elements['search-time'];
    if (!el) return;
    el.textContent = `Searching time: ${duration.toFixed(0)} мс`;
    el.classList.remove('hidden');
  }

  #displaySearchTags() {
    const tagsContainer = this.#elements['search-tags'];
    if(!tagsContainer) return;

    const tags = [];
    if (this.#filters.onlyNew) tags.push('Only new');
    if (this.#filters.priceFilter) tags.push('Filter by price');
    if (this.#filters.nameFilter) tags.push('Filter by name');

    tagsContainer.innerHTML = '';
    tags.forEach(tag => {
      const tagEl = document.createElement('span');
      tagEl.className = 'search-tag';
      tagEl.textContent = tag;
      tagsContainer.appendChild(tagEl);
    });
    tagsContainer.classList.remove('hidden');
  }

  #switchMarketplace(marketplace) {
    this.#currentMarketplace = marketplace;

    this.#elements.tabButtons.forEach(button => {
      button.classList.toggle('active', button.dataset.marketplace === marketplace);
    });

    document.querySelectorAll('.marketplace-results').forEach(container => {
      container.classList.toggle('active', container.id === `results-${marketplace}`);
    });
  }

  #showResultsPage() { this.#elements['results-page']?.classList.remove('hidden'); }
  #showLoading() { this.#elements['loading-indicator']?.classList.remove('hidden'); }
  #hideLoading() { this.#elements['loading-indicator']?.classList.add('hidden'); }
  #showError(message) {
    if (this.#elements['error-text']) this.#elements['error-text'].textContent = message;
    this.#elements['error-message']?.classList.remove('hidden');
  }
  #showToast(message, timeout) {
    const toast = this.#elements['toast-notification'];
    if (!toast) return;

    if (this.#toastTimeoutId) {
      clearTimeout(this.#toastTimeoutId);
    }

    toast.textContent = message;
    toast.classList.add('show');

    this.#toastTimeoutId = setTimeout(() => {
      toast.classList.remove('show');
      this.#toastTimeoutId = null;
    }, timeout);
  }

  #hideError() { this.#elements['error-message']?.classList.add('hidden'); }
  #showResultsContainer() {
    this.#elements['marketplace-tabs']?.classList.remove('hidden');
    this.#elements['search-results']?.classList.remove('hidden');
    this.#elements['no-results']?.classList.add('hidden');
  }
  #hideResults() {
    this.#elements['marketplace-tabs']?.classList.add('hidden');
    this.#elements['search-results']?.classList.add('hidden');
    this.#elements['no-results']?.classList.add('hidden');
  }
  #showNoResults() {
    this.#elements['marketplace-tabs']?.classList.add('hidden');
    this.#elements['search-results']?.classList.add('hidden');
    this.#elements['no-results']?.classList.remove('hidden');
  }
}

class ThemeSwitcher {
  #toggleBtn;

  constructor() {
    this.#toggleBtn = document.getElementById('theme-toggle');
    this.#initTheme();
    this.#bindEvents();
  }

  #initTheme() {
    const savedTheme = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  #bindEvents() {
    this.#toggleBtn?.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new ThemeSwitcher();
  window.findlyWeb = new FindlyWeb();
});
