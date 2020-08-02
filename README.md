# Тестовое задание для удаленного программиста в команду easyprbot.com

## Описание задачи
Сделать сервис событий. Сервис должен быть реализован как SPA-приложение.

* Пользователь может создавать событие (встреча, звонок и т.д.) с заголовком, содержанием и датой проведения.
* Пользователь имеет возможность совершать CRUD-операции над своими событиями. Искать по заголовку и фильтровать по дате (события за последние месяц, неделю, день) 
* За час до проведения события, сервис отправляет напоминание по e-mail автору.

## Использованные технологии
* Python
* Django
* DRF
* Celery
* Redis
* VueJS
* Postgresql
* Docker
* Nginx

## Настройка сервера
Установить:

* [docker](https://www.digitalocean.com/community/tutorials/docker-ubuntu-18-04-1-ru)
* [docker-compose](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04-ru)

Указать в `src/devAndProdVariables.js` адрес сервера

Выполнить команды:
* `$sudo apt install npm`
* `$npm install`
* `$npm run build`

Создать файл `.env` с настройками:
* `DEBUG`
* `SECRET_KEY`
* `DJANGO_ALLOWED_HOSTS`
* `SQL_ENGINE`
* `SQL_DATABASE`
* `SQL_USER`
* `SQL_PASSWORD`
* `SQL_HOST`
* `SQL_PORT`
* `DATABASE`
* `REDIS_HOST`
* `REDIS_PORT`
* `EMAIL_HOST`
* `EMAIL_HOST_USER`
* `EMAIL_HOST_PASSWORD`
* `EMAIL_PORT`

Файл `.env.db` с настройками для БД postrges
* `POSTGRES_USER`
* `POSTGRES_PASSWORD`
* `POSTGRES_DB`


# Запуск # 
`$docker-compose up --build`
