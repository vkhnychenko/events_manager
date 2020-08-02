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

Создать файл `.env` с настройками:
* `DEBUG`
* `SECRET_KEY`
* `DJANGO_ALLOWED_HOSTS`
* `SQL_ENGINE=django.db.backends.postgresql`
* `SQL_DATABASE=db_name`
* `SQL_USER=db_user`
* `SQL_PASSWORD=db_password`
* `SQL_HOST=db`
* `SQL_PORT=5432`
* `DATABASE=postgres`
* `REDIS_HOST=redis`
* `REDIS_PORT=6379`
* `EMAIL_HOST=smtp.google.com`
* `EMAIL_HOST_USER=user_email`
* `EMAIL_HOST_PASSWORDuser_password`
* `EMAIL_PORT=smtp_port`

Файл `.env.db` с настройками для БД postrges
* `POSTGRES_DB=db_name`
* `POSTGRES_USER=db_user`
* `POSTGRES_PASSWORD=db_password`

## Запуск 
* `$npm run build`
* `$docker-compose up --build`

