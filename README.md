# README

## Installation

run `npm install` to instal Node modules.

run `bower install` to install client-side dependencies.

## Everyday

run `grunt` to verify code style (set to Google) and concatenate scripts.

run `grunt watch` to continuously verify sintax and concatenate scripts while you work.

Don't forget to `--save` or `--save-dev` when installing new packages with NPM or Bower.

`server.js` contains server configuration and routes.

`/app` contains server-side application code.

`/public/app` contains client-side application (Angular) code.

`/public/index.html` is the entry-point to the client-side app.

`/public/lib` is for Bower to use, it puts managed dependencies there.

Don't forget to update `Gruntfile.js` `concat: {...` section with required distribution scripts Bower fetches for you.

When adding new stylesheets include them in `Gruntfile.js` `less: {...`. For `less` files, you can use `@import` directives in `main.less` to include other `.less` files.

`public/dist` is where concatenated scripts and styles are saved and requested.

