// Данные о коктейлях с путями к изображениям
const cocktails = [
    {
        name: "АПЕРОЛЬ ШПРИНЦ",
        image: "images/1.png"
    },
    {
        name: "МАРТИНИ ПОРНСТАР",
        image: "images/2.png"
    },
    {
        name: "МАРТИНИ РОЯЛЕ", 
        image: "images/3.png"
    },
    {
        name: "МАТИЛЬДА",
        image: "images/4.png"
    },
    {
        name: "КИР РОЯЛЬ",
        image: "images/5.png"
    },
    {
        name: "БРАМБЛ",
        image: "images/6.png"
    },
    {
        name: "КЛОВЕР КЛАБ",
        image: "images/7.png"
    },
    {
        name: "НЕГРОНИ",
        image: "images/8.png"
    },
    {
        name: "МАЛИНОВЫЙ НЕГРОНИ",
        image: "images/9.png"
    },
    {
        name: "ЯБЛОЧНЫЙ ТИНИ",
        image: "images/10.png"
    },
    {
        name: "ГРЮТ МУЛ",
        image: "images/11.png"
    },
    {
        name: "ЛИМОННЫЙ ПИРОГ",
        image: "images/12.png"
    },
    {
        name: "МАРГАРИТА",
        image: "images/13.png"
    },
    {
        name: "САНДЕНС",
        image: "images/14.png"
    },
    {
        name: "ВИСКИ САУЭР",
        image: "images/15.png"
    },
    {
        name: "ОЛД ФЭШН",
        image: "images/16.png"
    },
    {
        name: "БУЛЬВАРДЬЕ",
        image: "images/17.png"
    },
    {
        name: "ДАЙКИРИ",
        image: "images/18.png"
    },
    {
        name: "КО-ПАНГАН",
        image: "images/19.png"
    },
    {
        name: "МАЙ ТАЙ",
        image: "images/20.png"
    },
    {
        name: "МОХИТО",
        image: "images/21.png"
    },
    {
        name: "ЛОНГ АЙЛЕНД",
        image: "images/22.png"
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