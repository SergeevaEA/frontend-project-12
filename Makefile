# Установка зависимостей фронтенда
install-frontend:
	cd frontend && npm ci

# Установка зависимостей корня (если есть)
install-root:
	npm ci

# Установка всех зависимостей сразу
install: install-frontend install-root

# Запуск dev-сервера фронтенда
dev:
	cd frontend && npm run dev

# Запуск чат-сервера
start:
	npx start-server -s ./frontend/dist &   # запуск в фоне
	npx wait-port 3000                      # ждём, пока порт 3000 станет доступен


# Сборка проекта для продакшена
build:
	cd frontend && npm run build

# Предпросмотр сборки
preview:
	cd frontend && npm run preview

# Линтинг фронтенда
lint:
	cd frontend && npx eslint .

# Очистка сборки фронтенда
clean:
	rm -rf frontend/dist
