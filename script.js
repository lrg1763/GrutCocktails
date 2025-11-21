// Данные о коктейлях с путями к изображениям
const cocktails = [
    {
        name: "АПЕРОЛЬ ШПРИНЦ",
        image: "images/1.jpg"
    },
    {
        name: "МАРТИНИ ПОРНСТАР",
        image: "images/2.jpg"
    },
    {
        name: "МАРТИНИ РОЯЛЕ", 
        image: "images/3.jpg"
    },
    {
        name: "МАТИЛЬДА",
        image: "images/4.jpg"
    },
    {
        name: "КИР РОЯЛЬ",
        image: "images/5.jpg"
    },
    {
        name: "БРАМБЛ",
        image: "images/6.jpg"
    },
    {
        name: "КЛОВЕР КЛАБ",
        image: "images/7.jpg"
    },
    {
        name: "НЕГРОНИ",
        image: "images/8.jpg"
    },
    {
        name: "МАЛИНОВЫЙ НЕГРОНИ",
        image: "images/9.jpg"
    },
    {
        name: "ЯБЛОЧНЫЙ ТИНИ",
        image: "images/10.jpg"
    },
    {
        name: "ГРЮТ МУЛ",
        image: "images/11.jpg"
    },
    {
        name: "ЛИМОННЫЙ ПИРОГ",
        image: "images/12.jpg"
    },
    {
        name: "МАРГАРИТА",
        image: "images/13.jpg"
    },
    {
        name: "САНДЕНС",
        image: "images/14.jpg"
    },
    {
        name: "ВИСКИ САУЭР",
        image: "images/15.jpg"
    },
    {
        name: "ОЛД ФЭШН",
        image: "images/16.jpg"
    },
    {
        name: "БУЛЬВАРДЬЕ",
        image: "images/17.jpg"
    },
    {
        name: "ДАЙКИРИ",
        image: "images/18.jpg"
    },
    {
        name: "КО-ПАНГАН",
        image: "images/19.jpg"
    },
    {
        name: "МАЙ ТАЙ",
        image: "images/20.jpg"
    },
    {
        name: "МОХИТО",
        image: "images/21.jpg"
    },
    {
        name: "ЛОНГ АЙЛЕНД",
        image: "images/22.jpg"
    }
];

let currentCocktailIndex = 0;

// Функция для обновления отображения
function updateDisplay() {
    // Обновляем счетчик
    document.getElementById('currentNumber').textContent = currentCocktailIndex + 1;
    document.getElementById('totalNumber').textContent = cocktails.length;
    
    // Обновляем изображение
    const cocktailImage = document.getElementById('cocktailImage');
    const currentCocktail = cocktails[currentCocktailIndex];
    
    // Создаем элемент img для лучшего контроля
    cocktailImage.innerHTML = '';
    const img = document.createElement('img');
    img.src = currentCocktail.image;
    img.alt = currentCocktail.name;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    img.style.borderRadius = '8px';
    img.style.backgroundColor = '#000000';
    
    // Добавляем обработчик ошибки загрузки
    img.onerror = function() {
        console.error('Ошибка загрузки изображения:', currentCocktail.image);
        cocktailImage.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; font-size: 16px; background: #1a1a1a; border-radius: 8px; font-family: 'Martian Mono', monospace;">
                Ошибка: ${currentCocktail.name}
            </div>
        `;
    };
    
    cocktailImage.appendChild(img);
}

// Функция для скачивания текущего фото
function downloadCurrentPhoto() {
    const currentCocktail = cocktails[currentCocktailIndex];
    const link = document.createElement('a');
    link.href = currentCocktail.image;
    link.download = `cocktail_${currentCocktailIndex + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Функция для перехода к следующему коктейлю
function nextCocktail() {
    currentCocktailIndex = (currentCocktailIndex + 1) % cocktails.length;
    updateDisplay();
}

// Функция для перехода к предыдущему коктейлю
function prevCocktail() {
    currentCocktailIndex = (currentCocktailIndex - 1 + cocktails.length) % cocktails.length;
    updateDisplay();
}

// Функция для обработки клавиатуры
function handleKeyboard(e) {
    if (e.key === 'ArrowLeft') {
        prevCocktail();
    } else if (e.key === 'ArrowRight') {
        nextCocktail();
    }
}

// Инициализация при загрузке страницы
function init() {
    updateDisplay();
    
    // Добавляем обработчики событий для кнопок
    document.getElementById('prevBtn').addEventListener('click', prevCocktail);
    document.getElementById('nextBtn').addEventListener('click', nextCocktail);
    document.getElementById('downloadBtn').addEventListener('click', downloadCurrentPhoto);
    
    // Добавляем обработчик для клавиатуры
    document.addEventListener('keydown', handleKeyboard);
    
    // Добавляем обработчик для свайпов на мобильных устройствах
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextCocktail();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            prevCocktail();
        }
    }
}

// Запускаем инициализацию при загрузке DOM
document.addEventListener('DOMContentLoaded', init);