// Храним текущий индекс объявления для каждого маркетплейса
let currentAdIndex = {};

function scrollAd(marketplace, direction) {
    // Получаем все объявления для данного маркетплейса
    const ads = window.ads[marketplace];

    // Если нет текущего индекса для маркетплейса, инициализируем его
    if (!currentAdIndex[marketplace]) {
        currentAdIndex[marketplace] = 0;
    }

    // Обновляем индекс объявления
    currentAdIndex[marketplace] += direction;

    // Если выходим за пределы массива объявлений, возвращаемся в начало или конец
    if (currentAdIndex[marketplace] < 0) {
        currentAdIndex[marketplace] = ads.length - 1;
    }
    if (currentAdIndex[marketplace] >= ads.length) {
        currentAdIndex[marketplace] = 0;
    }

    // Обновляем содержимое карточки
    const ad = ads[currentAdIndex[marketplace]];
    document.getElementById(`ad-number-${marketplace}`).innerText = currentAdIndex[marketplace] + 1;
    document.getElementById(`ad-image-${marketplace}`).src = ad.image;
    document.getElementById(`ad-name-${marketplace}`).innerText = ad.name;
    document.getElementById(`ad-price-${marketplace}`).innerText = ad.price + ' BYN';
    document.querySelector(`#ad-${marketplace} a`).href = ad.link;
}
