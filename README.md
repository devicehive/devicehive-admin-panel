# DevicehiveAdminPanel

Run `npm install` to install all project dependencies.

## Development server

Run `npm start` for a dev server. The [configuration](src/environments/environment.ts) should contain paths a running
instance of the DH Java Server.

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
Running `npm run build-dev` will build the project for the dev environment.

## Configuration
* mainServiceURL - URL of DeviceHive Frontend service
* authServiceURL - URL of DeviceHive Auth service
* pluginServiceURL - URL of DeviceHive Plugin management service

If the configured URL starts with 'http', it will be treated as an absolute url, otherwise it should start
with '/' and will be considered relative.

* autoUpdateSession - if true, the admin panel will retrieve a new access token when an old one expires. If false,
user will be logged out once access token expires.

* googleClientId - client id for google oauth. If left empty, the "Login with Google" button will not be displayed.

* facebookAppId - client id for facebook oauth. If left empty, the "Login with Facebook" button will not be displayed.

* githubClientId - client id for github oauth. If left empty, the "Login with Github" button will not be displayed.
