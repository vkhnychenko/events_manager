# Тестовое задание для удаленного программиста в команду easyprbot.com

Сервис событий.

* Пользователь может создавать событие (встреча, звонок и т.д.) с заголовком, содержанием и датой проведения.
* Пользователь имеет возможность совершать CRUD-операции над своими событиями. Искать по заголовку и фильтровать по дате (события за последние месяц, неделю, день) 
* За час до проведения события, сервис отправляет напоминание по e-mail автору.

## Использованные технологии
* Python
* Django
* DRF
* Celery
* Redis
* VueJs
* Postgresql
* Docker


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
