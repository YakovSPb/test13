# Favorit-parts: тестовое (React + Redux)

Двухэтапный подбор номенклатуры по API «Проценка».

## Стек

React, Redux Toolkit, Bootstrap. Без TypeScript.

## Запуск

```bash
npm install
npm run dev
```

## Ключ API

1. Открой `src/config.js` и вставь ключ покупателя в `API_KEY`.
2. Или создай файл `.env` рядом с `package.json`:

```
VITE_API_KEY=твой_ключ
```

Без ключа приложение работает на моках (можно проверить UI).

## Как устроен поток

1. Вводишь артикул и жмёшь поиск.
2. Запрос без `brand` возвращает список производителей.
3. Клик по бренду: запрос с `brand` и `analogues=on`.
4. Таблица: название/производитель, цена и остаток из `warehouses`.

Документация API: https://lk.favorit-parts.ru/static/wsprice.pdf

В dev-режиме запросы идут через proxy Vite (`/hsprice`), чтобы обойти CORS.
