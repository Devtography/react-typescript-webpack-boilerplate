# React TypeScript Webpack Boilerplate

Boilerplate for React, TypeScript, and Webpack integrated.

*Caution - Babel has not been set up in this boilerplate. `ts-loader` is being
used for `.ts` & `.tsx` files.*

## Getting started
```sh
# clone this repo
git clone https://github.com/Devtography/react-typescript-webpack-boilerplate.git
```
Or generate a new repo on GitHub using this template [here](https://github.com/Devtography/react-typescript-webpack-boilerplate/generate)

```json
// edit the following fields in package.json for your own project
{
  "name": your-project-name,
  "version": whatever-you-like,
  "description": your-own-description,
  "author": who's-the-author?,
  "license": if-you-don't-want-to-use-MIT,
  "repository": type-and-link-of-your-repo,
  "keywords": keywords-of-your-project,
  "bugs": issue-page-of-your-repo,
  "homepage": homepage-of-your-repo
}
```

Then install all the `node_modules` needed by executing the following command:
```sh
cd folder-containing-the-cloned-boilerplate
npm install --also-dev
```

Manually create folders `src/types` & `src/utils` as Git doesn't include empty
folders.

That's it. You're ready to rock.

## Usage
There're currently 4 NPM commands preconfigured in `package.json`, they are:

`npm run build` - Removes everything from `dist/`, then compile & bundle your
app to `dist/` using `Webpack 5`.

`npm run dev` - runs the `webpack-dev-server` with `NODE_ENV=development` for
debug & development.

`npm run test` - runs your `Jest` tests under `tests/` with coverage reports.

`npm run watch-test` - same as `npm run test` but execute on file saved
automatically.

For `vscode` users, launch configs - `Attach to Chrome`, `Launch Chrome`,
and `Jest tests` are included in this boilerplate. Use those launch configs to 
run your app / `Jest` tests if you need the breakpoints to work.

## Author
[Wing Chau](https://github.com/iamWing) [@Devtography]

## Support the project
Contributions via pull requests are welcome and encouraged. If there's anything
you consider essential that should be included in this boilerplate, please don't
hesitate to implement yourself and make a pull request :)

Same as the other open sources projects in [@Devtography], I maintain & further
develop this boilerplate with my free time. If you found my work useful and
wanna support me keep on doing all these, please consider
[donate/sponsor](https://github.com/sponsors/iamWing) me.

## License
React TypeScript Webpack Boilerplate is open source software 
[licensed as MIT](LICENSE).

[@Devtography]: https://github.com/Devtography
