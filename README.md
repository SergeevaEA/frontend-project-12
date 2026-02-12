### Hexlet tests and linter status:
[![Actions Status](https://github.com/SergeevaEA/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/SergeevaEA/frontend-project-12/actions)

### CodeClimate
[![Maintainability](https://qlty.sh/gh/SergeevaEA/projects/frontend-project-12/maintainability.svg)](https://qlty.sh/gh/SergeevaEA/projects/frontend-project-12)

# Мессенджер

Мессенджер на React с авторизацией, чатами и WebSocket.

## Технологический стек

React, Redux Toolkit, React Redux, React Router, axios, Socket.IO Client, React Bootstrap, Formik, yup, REST API, WebSocket, React Toastify, React i18next, Leo Profanity, Pluralize-ru, Vite, ESLint

## Выполненные задачи

* реализовала авторизацию и регистрацию пользователя
* реализовала вывод каналов и сообщений
* реализовала создание, отправку и получение сообщений в чате
* реализовала переключение по каналам
* реализовала добавление нового канала, валидацию имени канала, перемещение создателя канала в добавленный канал
* реализовала выпадающее меню с кнопками управления каналом. Удаление канала (С подтверждением. Пользователи, находящиеся в удаляемом канале, перемещаются в дефолтный канал). Переименование канала (внутри модального окна)
* реализовала всплывающие уведомления при возникновении ошибок в загрузке данных или отсутствии сети, при успешном создании, переименовывании и удалении канала
* реализовала вывод всех текстов интерфейса через библиотеку react-i18next
* реализовала фильтрацию нецензурных слов в чате при помощи библиотеки leo-profanity

## Демонстрация работы проекта

Страница авторизации:

![Страница авторизации](frontend/src/assets/images/LogIn.png)

Страница регистрации:

![Страница регистрации](frontend/src/assets/images/SignUp.png)

Страница с каналами:

![Страница с чатами](frontend/src/assets/images/MainPage.png)

Добавить канал:

![Добавить чат](frontend/src/assets/images/AddChannel.png)

Управление каналом:

![Управление чатом](frontend/src/assets/images/Menu.png)

Переименовать канал:

![Переименовать чат](frontend/src/assets/images/EditChannel.png)

Отправка сообщений в чате:

![Отправка сообщений в чате](frontend/src/assets/images/Message.png)

## Установка

Клонировать репозиторий:

```bash
git clone https://github.com/SergeevaEA/frontend-project-12.git
cd frontend-project-12
```

Установить зависимости:

```bash
make install
```

## Запуск проекта для разработки

Для начала необходимо собрать frontend.

```bash
make build
```

Команда создаст папку dist, без которой backend не сможет работать с файлами фронтенда.

Запуск frontend:

```bash
make dev
```

Запуск backend-сервера в другом терминале:

```bash
make start
```