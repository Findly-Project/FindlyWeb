initMaxSizeDropdown() {
    if (!this.maxSizeBtn || !this.maxSizeList) return;

    // Отобразить текущее значение
    this.maxSizeBtn.childNodes[0].nodeValue = this.maxSize + ' ';

    let isOpen = false;

    this.maxSizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isOpen = !isOpen;
        if (isOpen) {
            this.maxSizeList.classList.add('open');
            this.maxSizeBtn.setAttribute('aria-expanded', true);
            this.maxSizeList.focus();
        } else {
            this.maxSizeList.classList.remove('open');
            this.maxSizeBtn.setAttribute('aria-expanded', false);
        }
    });

    this.maxSizeOptionEls.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const value = parseInt(option.dataset.value, 10);
            this.maxSize = value;
            this.maxSizeBtn.childNodes[0].nodeValue = value + ' ';
            this.updateUrlParams();
            this.maxSizeList.classList.remove('open');
            isOpen = false;
            this.maxSizeBtn.setAttribute('aria-expanded', false);
        });
    });

    // Закрытие при клике вне меню
    document.addEventListener('click', (e) => {
        if (isOpen && !this.maxSizeDropdown.contains(e.target)) {
            this.maxSizeList.classList.remove('open');
            isOpen = false;
            this.maxSizeBtn.setAttribute('aria-expanded', false);
        }
    });

    // Клавиатурная навигация (по желанию)
    this.maxSizeBtn.addEventListener('keydown', (e) => {
        if ((e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') && !isOpen) {
            e.preventDefault();
            this.maxSizeList.classList.add('open');
            isOpen = true;
            this.maxSizeBtn.setAttribute('aria-expanded', true);
            this.maxSizeList.focus();
        }
    });
}
