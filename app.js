class FindlyWeb {
    constructor() {
        this.apiBaseUrl = 'http://127.0.0.1:8000';
        this.searchEndpoint = '/api/search';
        this.marketplaces = ['MMG', 'Onliner', 'Kufar', '21vek'];
        this.currentQuery = '';
        this.currentMarketplace = 'MMG';
        this.searchResults = {};
        
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        // Страницы
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
    }

    bindEvents() {
        // Обработка поиска с главной страницы
        this.homeSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch(this.homeSearchInput.value.trim());
        });

        // Обработка поиска со страницы результатов
        this.resultsSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch(this.resultsSearchInput.value.trim());
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
            this.showHomePage();
        });
    }

    async handleSearch(query) {
        if (!query) {
            this.showError('Введите поисковый запрос');
            return;
        }

        console.log('Starting search for:', query);
        
        this.currentQuery = query;
        this.showResultsPage();
        this.showLoading();
        this.hideError();
        this.hideResults();

        // Обновляем поисковые поля
        this.homeSearchInput.value = query;
        this.resultsSearchInput.value = query;

        try {
            const results = await this.searchProducts(query);
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
            
            // Показываем демонстрационные результаты для тестирования интерфейса
            this.showDemoResults(query);
        } finally {
            this.hideLoading();
        }
    }

    async searchProducts(query) {
        const url = `${this.apiBaseUrl}${this.searchEndpoint}?q=${encodeURIComponent(query)}&ms=40`;
        console.log('Fetching from URL:', url);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 секунд таймаут
        
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

    // Демонстрационные результаты для тестирования интерфейса
    showDemoResults(query) {
        console.log('Showing demo results for:', query);
        
        const demoResults = {
            request_metadata: {
                query: query,
                marketplaces: this.marketplaces
            },
            products_data: {
                MMG: [
                    {
                        title: `${query} - Демо товар MMG 1`,
                        price: '1500 BYN',
                        image: '',
                        url: 'https://mmg.by'
                    },
                    {
                        title: `${query} - Демо товар MMG 2`,
                        price: '2000 BYN',
                        image: '',
                        url: 'https://mmg.by'
                    }
                ],
                Onliner: [
                    {
                        title: `${query} - Демо товар Onliner`,
                        price: '1800 BYN',
                        image: '',
                        url: 'https://onliner.by'
                    }
                ],
                Kufar: [],
                '21vek': [
                    {
                        title: `${query} - Демо товар 21vek`,
                        price: '1600 BYN',
                        image: '',
                        url: 'https://21vek.by'
                    }
                ]
            }
        };
        
        this.displayResults(demoResults);
    }

    displayResults(results) {
        if (!results || !results.products_data) {
            this.showError('Неверный формат ответа от сервера');
            return;
        }

        const productsData = results.products_data;
        let hasAnyResults = false;

        // Обновляем счетчики в вкладках и отображаем товары
        this.marketplaces.forEach(marketplace => {
            const products = productsData[marketplace] || [];
            const count = products.length;
            
            if (count > 0) {
                hasAnyResults = true;
            }

            // Обновляем счетчик
            const countElement = document.getElementById(`count-${marketplace}`);
            if (countElement) {
                countElement.textContent = count;
            }

            // Отображаем товары
            this.renderMarketplaceProducts(marketplace, products);
        });

        if (hasAnyResults) {
            this.showResults();
            // Переключаемся на первый маркетплейс с результатами
            const firstMarketplaceWithResults = this.marketplaces.find(mp => 
                productsData[mp] && productsData[mp].length > 0
            );
            if (firstMarketplaceWithResults) {
                this.switchMarketplace(firstMarketplaceWithResults);
            } else {
                this.switchMarketplace('MMG');
            }
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

    showHomePage() {
        this.homePage.classList.remove('hidden');
        this.resultsPage.classList.add('hidden');
        this.homeSearchInput.value = '';
        this.resultsSearchInput.value = '';
        this.currentQuery = '';
    }

    showResultsPage() {
        this.homePage.classList.add('hidden');
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

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing FindlyWeb application...');
    new FindlyWeb();
});