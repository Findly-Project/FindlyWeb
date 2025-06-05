class FindlyWeb {
    constructor() {
        this.apiBaseUrl = 'http://127.0.0.1:8000';
        this.searchEndpoint = '/api/search';
        this.marketplaces = ['MMG', 'Onliner', 'Kufar', '21vek'];
        this.currentQuery = '';
        this.currentMarketplace = 'MMG';
        this.searchResults = {};

        this.maxSizeSelect = document.getElementById('max-size-select');
        this.maxSize = 10;

        this.filters = {
            onlyNew: false,
            nameFilter: false,
            priceFilter: false,
            excludeWords: []
        }

        this.initElements();
        this.initEvents();
        this.restoreFiltersFromUrl();
        this.bindEvents();
        this.renderExcludeWords();
    }

    initElements() {
        // Настройки
        this.settingsButton = document.getElementById('settings-button');
        this.settingsMenu = document.getElementById('settings-menu');
        this.filterCheckboxes = this.settingsMenu.querySelectorAll('.filter-checkbox');

        // Поиск
        this.homePage = document.getElementById('home-page');
        this.resultsPage = document.getElementById('results-page');

        // Поисковые формы и поля
        this.homeSearchForm = document.getElementById('search-form');
        this.homeSearchInput = document.getElementById('search-input');
        this.resultsSearchForm = document.getElementById('results-search-form');
        this.resultsSearchInput = document.getElementById('results-search-input');

        // Элементы результатов
        this.loadingIndicator = document.getElementById('loading-indicator');
        this.errorMessage = document.getElementById('error-message');
        this.errorText = document.getElementById('error-text');
        this.marketplaceTabs = document.getElementById('marketplace-tabs');
        this.searchResultsContainer = document.getElementById('search-results');
        this.noResults = document.getElementById('no-results');

        // Вкладки
        this.tabButtons = document.querySelectorAll('.tab-button');

        // Логотип для возврата на главную
        this.resultsLogo = document.querySelector('.results-logo');

        // Элементы для excludeWords
        this.excludeWordInput = document.getElementById('exclude-word-input');
        this.addExcludeWordBtn = document.getElementById('add-exclude-word');
        this.excludeWordsList = document.getElementById('exclude-words-list');
    }

    initEvents() {
        // Открытие/закрытие меню
        this.settingsButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.settingsMenu.classList.toggle('hidden');
        });
        // Клик вне меню - закрыть
        document.addEventListener('click', (e) => {
            if (!this.settingsMenu.contains(e.target) && e.target !== this.settingsButton) {
                this.settingsMenu.classList.add('hidden');
            }
        });
        // Чекбоксы фильтров
        this.filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const filter = e.target.dataset.filter;
                this.filters[filter] = e.target.checked;
                this.updateUrlParams();
            });
        });

        // Обработка добавления исключаемого слова
        if (this.addExcludeWordBtn && this.excludeWordInput) {
            this.addExcludeWordBtn.addEventListener('click', () => this.addExcludeWord());
            this.excludeWordInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.addExcludeWord();
                }
            });
        }

        // Пример: обработка поиска
        if (this.homeSearchForm) {
            this.homeSearchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = this.homeSearchInput.value.trim();
                if (query) {
                    this.currentQuery = query;
                    this.handleSearch(query);
                }
            });
        }
        if (this.resultsSearchForm) {
            this.resultsSearchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = this.resultsSearchInput.value.trim();
                if (query) {
                    this.currentQuery = query;
                    this.handleSearch(query);
                }
            });
        }
        this.maxSizeSelect.addEventListener('change', (e) => {
            this.maxSize = parseInt(e.target.value, 10);
            this.updateUrlParams();
        });
    }

    restoreFiltersFromUrl() {
        const params = new URLSearchParams(window.location.search);
        this.filters.onlyNew = params.get('on') === 'on';
        this.filters.nameFilter = params.get('nf') === 'on';
        this.filters.priceFilter = params.get('pf') === 'on';

        // ew (exclude words)
        const ew = params.get('ew');
        if (ew) {
            this.filters.excludeWords = ew.split('|').filter(Boolean);
        } else {
            this.filters.excludeWords = [];
        }

        const ms = parseInt(params.get('ms'), 10);
        if ([10, 20, 30, 40].includes(ms)) {
            this.maxSize = ms;
            this.maxSizeSelect.value = ms;
        } else {
            this.maxSize = 10;
            this.maxSizeSelect.value = 10;
        }

        // Синхронизировать чекбоксы
        this.filterCheckboxes.forEach(cb => {
            cb.checked = this.filters[cb.dataset.filter];
        });

        this.renderExcludeWords();
    }

    updateUrlParams() {
        const params = new URLSearchParams(window.location.search);
        if (this.filters.onlyNew) params.set('on', 'on'); else params.set('on', 'off');
        if (this.filters.nameFilter) params.set('nf', 'on'); else params.set('nf', 'off');
        if (this.filters.priceFilter) params.set('pf', 'on'); else params.set('pf', 'off');
        params.set('ms', this.maxSize);

        // ew
        if (this.filters.excludeWords.length > 0) {
            params.set('ew', this.filters.excludeWords.join('|'));
        } else {
            params.delete('ew');
        }

        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }

    addExcludeWord() {
        const word = this.excludeWordInput.value.trim();
        if (word && !this.filters.excludeWords.includes(word)) {
            this.filters.excludeWords.push(word);
            this.renderExcludeWords();
            this.updateUrlParams();
        }
        this.excludeWordInput.value = '';
    }

    removeExcludeWord(word) {
        this.filters.excludeWords = this.filters.excludeWords.filter(w => w !== word);
        this.renderExcludeWords();
        this.updateUrlParams();
    }

    renderExcludeWords() {
        if (!this.excludeWordsList) return;
        this.excludeWordsList.innerHTML = '';
        this.filters.excludeWords.forEach(word => {
            const chip = document.createElement('span');
            chip.className = 'exclude-word-chip';
            chip.textContent = word;
            const btn = document.createElement('button');
            btn.innerHTML = '&times;';
            btn.title = 'Удалить';
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeExcludeWord(word);
            });

            chip.appendChild(btn);
            this.excludeWordsList.appendChild(chip);
        });
    }

    bindEvents() {
        // Обработка поиска с главной страницы
        this.homeSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch(this.homeSearchInput.value.trim());
            const searchTime = document.getElementById("search-time")
            searchTime.classList.add("hidden")
        });

        // Обработка поиска со страницы результатов
        this.resultsSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch(this.resultsSearchInput.value.trim());
            const searchTime = document.getElementById("search-time")
            searchTime.classList.add("hidden")
        });

        // Переключение вкладок маркетплейсов
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const marketplace = button.dataset.marketplace;
                this.switchMarketplace(marketplace);
            });
        });

        // Возврат на главную по клику на логотип
        this.resultsLogo.addEventListener('click', () => {
            this.homePage.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    async handleSearch(query) {
        if (!query) {
            this.showError('Введите поисковый запрос');
            return;
        }

        const startTime = performance.now();
        console.log(`Начало поиска: ${startTime.toFixed(2)} мс`);

        this.currentQuery = query;
        this.showResultsPage();
        setTimeout(() => {
            const loadingIndicator = document.getElementById('loading-indicator');
            if (loadingIndicator) {
                loadingIndicator.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
        this.showLoading();
        this.hideError();
        this.hideResults();

        // Обновляем поисковые поля
        this.homeSearchInput.value = query;
        this.resultsSearchInput.value = query;

        try {
            const results = await this.searchProducts(query);
            const endTime = performance.now();
            const searchDuration = endTime - startTime;

            this.displaySearchTime(searchDuration);
            const searchTime = document.getElementById("search-time")
            searchTime.classList.remove("hidden")
            this.displayResults(results);
            console.log('Search results:', results);
            this.searchResults = results;
            this.displayResults(results);
        } catch (error) {
            console.error('Search error:', error);

            // Определяем тип ошибки для более точного сообщения
            let errorMessage = 'Ошибка при поиске товаров';

            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                errorMessage = 'Не удается подключиться к серверу. Убедитесь, что API запущен на 127.0.0.1:8000';
            } else if (error.message.includes('CORS')) {
                errorMessage = 'Ошибка CORS. Проверьте настройки сервера';
            } else if (error.message.includes('404')) {
                errorMessage = 'API endpoint не найден';
            } else if (error.message.includes('500')) {
                errorMessage = 'Внутренняя ошибка сервера';
            }

            this.showError(errorMessage);
        } finally {
            this.hideLoading();
        }
    }

    displaySearchTime(duration) {
        const timeContainer = document.getElementById('search-time');
        timeContainer.textContent = `Поиск занял: ${duration.toFixed(0)} мс`;
    }

    async searchProducts(query) {
        const url = new URL(this.apiBaseUrl + this.searchEndpoint);
        url.searchParams.set('q', query);
        url.searchParams.set('ms', this.maxSize);
        if (this.filters.onlyNew) {
            url.searchParams.set('on', 'on');
        } else {
            url.searchParams.set('on', 'off');
        }

        if (this.filters.nameFilter) {
            url.searchParams.set('nf', 'on');
        } else {
            url.searchParams.set('nf', 'off');
        }

        if (this.filters.priceFilter) {
            url.searchParams.set('pf', 'on');
        } else {
            url.searchParams.set('pf', 'off');
        }

        if (this.filters.excludeWords && this.filters.excludeWords.length > 0) {
            url.searchParams.set('ew', this.filters.excludeWords.join('|'));
        }

        console.log('Fetching from URL:', url);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 секунд таймаут

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    displayResults(results) {
        if (!results || !results.products_data) {
            this.showError('Неверный формат ответа от сервера');
            return;
        }

        const productsData = results.products_data;
        let hasAnyResults = false;

        // Обновляем счетчики во вкладках и отображаем товары
        const marketplaceStatus = {};
        this.marketplaces.forEach(mp => {
            const count = (productsData[mp] || []).length;
            marketplaceStatus[mp] = count > 0;
        });

        // Обновление интерфейса
        this.marketplaces.forEach(marketplace => {
            const products = productsData[marketplace] || [];
            const count = products.length;
            const tabElement = document.querySelector(`[data-marketplace="${marketplace}"]`);
            const countElement = document.getElementById(`count-${marketplace}`);

            if (count > 0) {
                hasAnyResults = true;
                tabElement.classList.remove('hidden');
                countElement.textContent = count;
                this.renderMarketplaceProducts(marketplace, products);
            } else {
                tabElement.classList.add('hidden');
                countElement.textContent = '';
            }
        });

        if (hasAnyResults) {
            this.showResults();
            setTimeout(() => {
                const resultsHeader = document.getElementById('results-header')
                resultsHeader.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
            const firstVisible = this.marketplaces.find(mp =>
                marketplaceStatus[mp] && !document.querySelector(`[data-marketplace="${mp}"]`).classList.contains('hidden')
            );
            this.switchMarketplace(firstVisible || 'MMG');
        } else {
            this.showNoResults();
        }
    }

    renderMarketplaceProducts(marketplace, products) {
        const container = document.getElementById(`products-${marketplace}`);
        if (!container) return;

        container.innerHTML = '';

        products.forEach(product => {
            const productCard = this.createProductCard(product);
            container.appendChild(productCard);
        });
    }

    createProductCard(product) {
        const card = document.createElement('a');
        card.className = 'product-card';
        card.href = product.link || '#';
        card.target = '_blank';
        card.rel = 'noopener noreferrer';

        const imageContainer = document.createElement('div');
        imageContainer.className = 'product-image';

        if (product.image && product.image.trim()) {
            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name || 'Товар';
            img.onerror = () => {
                img.style.display = 'none';
                imageContainer.textContent = 'Изображение недоступно';
            };
            imageContainer.appendChild(img);
        } else {
            imageContainer.textContent = 'Изображение недоступно';
        }

        const productInfo = document.createElement('div');
        productInfo.className = 'product-info';

        const title = document.createElement('div');
        title.className = 'product-title';
        title.textContent = product.name || 'Название товара';

        const price = document.createElement('div');
        price.className = 'product-price';
        price.textContent = product.price + ' BYN' || 'Цена не указана';

        productInfo.appendChild(title);
        productInfo.appendChild(price);

        card.appendChild(imageContainer);
        card.appendChild(productInfo);

        return card;
    }

    switchMarketplace(marketplace) {
        const visibleMarketplaces = this.marketplaces.filter(mp =>
            !document.querySelector(`[data-marketplace="${mp}"]`).classList.contains('hidden')
        );

        if (!visibleMarketplaces.includes(marketplace)) {
            marketplace = visibleMarketplaces[0] || 'MMG';
        }
        this.currentMarketplace = marketplace;

        // Обновляем активную вкладку
        this.tabButtons.forEach(button => {
            if (button.dataset.marketplace === marketplace) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // Обновляем отображение результатов
        const resultContainers = document.querySelectorAll('.marketplace-results');
        resultContainers.forEach(container => {
            if (container.id === `results-${marketplace}`) {
                container.classList.add('active');
            } else {
                container.classList.remove('active');
            }
        });
    }

    showResultsPage() {
        this.resultsPage.classList.remove('hidden');
    }

    showLoading() {
        this.loadingIndicator.classList.remove('hidden');
    }

    hideLoading() {
        this.loadingIndicator.classList.add('hidden');
    }

    showError(message) {
        this.errorText.textContent = message;
        this.errorMessage.classList.remove('hidden');
    }

    hideError() {
        this.errorMessage.classList.add('hidden');
    }

    showResults() {
        this.marketplaceTabs.classList.remove('hidden');
        this.searchResultsContainer.classList.remove('hidden');
        this.noResults.classList.add('hidden');
    }

    hideResults() {
        this.marketplaceTabs.classList.add('hidden');
        this.searchResultsContainer.classList.add('hidden');
        this.noResults.classList.add('hidden');
    }

    showNoResults() {
        this.marketplaceTabs.classList.add('hidden');
        this.searchResultsContainer.classList.add('hidden');
        this.noResults.classList.remove('hidden');
    }
}

(function redirectToDefaultParams() {
    const params = new URLSearchParams(window.location.search);

    // Укажите здесь дефолтные значения (например, on=off, nf=off, pf=off)
    const defaults = { on: 'off', nf: 'off', pf: 'off', ms: '30' };
    let needRedirect = false;

    for (const key in defaults) {
        if (!params.has(key)) {
            params.set(key, defaults[key]);
            needRedirect = true;
        }
    }

    if (needRedirect) {
        // Заменяем текущий URL (без добавления в историю)
        window.location.replace(`${window.location.pathname}?${params.toString()}`);
    }
})();

// Инициализация приложения
window.addEventListener('DOMContentLoaded', () => {
    window.findlyWeb = new FindlyWeb();
});
