# DevicehiveAdminPanel

Run `npm install` to install all project dependencies.

## Development server

Run `npm start` for a dev server. The [configuration](src/environments/environment.ts) should contain paths a running
instance of the DH Java Server.

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
Running `npm run build-dev` will build the project for the dev environment.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Configuration
* mainServiceURL - URL of DeviceHive Frontend service
* authServiceURL - URL of DeviceHive Auth service
* pluginServiceURL - URL of DeviceHive Plugin management service

If the configured URL starts with 'http', it will be treated as an absolute url, otherwise it should start
with '/' and will be considered relative.
