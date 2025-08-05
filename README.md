# Veslevo Project

## Настройка переменных окружения

### Яндекс.Карты API

1. Создайте файл `.env` в корне проекта
2. Добавьте ваш API ключ:

```bash
YANDEX_MAPS_API_KEY=your_yandex_maps_api_key_here
```

3. Обновите файл `app/js/env.js`:

```javascript
window.ENV = {
  YANDEX_MAPS_API_KEY: process.env.YANDEX_MAPS_API_KEY || 'your_api_key_here'
};
```

### Получение API ключа

1. Перейдите на [Яндекс.Карты API](https://developer.tech.yandex.ru/)
2. Создайте приложение
3. Получите API ключ
4. Добавьте его в `.env` файл

### Безопасность

- Файл `.env` добавлен в `.gitignore`
- Не коммитьте API ключи в репозиторий
- Используйте разные ключи для разработки и продакшена 