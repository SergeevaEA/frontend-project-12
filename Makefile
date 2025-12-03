# Установка зависимостей корня (если есть)
install-root:
	npm ci

# Установка зависимостей фронтенда
install-frontend:
	cd frontend && npm ci --legacy-peer-deps

# Установка всех зависимостей сразу
install: install-root install-frontend

# Запуск dev-сервера фронтенда
dev:
	cd frontend && npm run dev

# Запуск чат-сервера
start:
	npx start-server -s ./frontend/dist

# Сборка проекта для продакшена
build:
	cd frontend && npm run build

# Предпросмотр сборки
preview:
	cd frontend && npm run preview

# Линтинг фронтенда (автоматически исправляет ошибки при помощи --fix)
lint:
	cd frontend && npx eslint . --ext .js,.jsx --fix

# Очистка сборки фронтенда
clean:
	rm -rf frontend/dist
