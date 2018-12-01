# Getting Started

This project currently requires the following:

1. On Windows, install NVM manager.
2. Ensure that Node version 8.11.2 is installed through nvm.
3. Use the command `nvm use 8.11.2` to switch to this version of Node.
4. This code for this application stems from the work on the Pluralsight course _Getting Started With Angular_ which assumes that the Angular version is 6.0.8, thus we need to install this version of Angular using the command `npm install -s @angular/cli@6.0.8`.
5. For reasons unknown, it might be necessary to forceably install `ngf-bootstrap` despite the fact that, it is already listed in the `package.json`. It would appear that `npm` is not installing all the sub-dependencies.

# NgFundamentals

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

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
