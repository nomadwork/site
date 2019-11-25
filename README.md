# Nomadwork

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Docker run 

Primeiro buildar o projeto através do comando ng build --prod

Segundo você precisa criar a imagem do container através do comando

docker build -t "nome_do_repositorio_no_docker_hub/nome_do_projeto" -f dockerfile .

depois adicionar a tag do projeto 

docker tag "nome_do_repositorio_no_docker_hub/nome_do_projeto" "nome_do_projeto:versão_do_projeto"

docker push "nome_do_repositorio_no_docker_hub/nome_do_projeto"

depois disso, você pode utilizar sua imagem criada do nomadwork em qualquer ambiente que tenha suporter para containers. 

