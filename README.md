# Learn You a Redux

> A Redux clone in 100 lines of JS

I felt that I already had a pretty good grasp of Redux, but I figured I'd build it myself to get a sense of what's involved. [This article][redux article] inspired me.

[redux article]: https://zapier.com/engineering/how-to-build-redux/

**Quick Start:**

* `npm install`
* `npm start` to run a dev server
* `npm run build` to minify, package and generate static HTML files from your routes

## Troubleshooting

### Babel Env

 Make sure `BABEL_ENV` is not set to `development` when building. If it is babel will likely throw a hot module replacement error since HMR transformations are getting run on everything that goes through babel.

[React]: http://facebook.github.io/react/
[Webpack]: https://webpack.js.org/
[Babel]: https://babeljs.io/
[Stylus]: https://learnboost.github.io/stylus/
[CSS Modules]: https://github.com/css-modules/css-modules
[css-loader-modules]: https://github.com/webpack/css-loader#css-modules
[Express]: http://expressjs.com/
[Waterline]: https://github.com/balderdashy/waterline
[Flux]: https://facebook.github.io/flux/docs/overview.html
[React Router]: https://github.com/rackt/react-router
[Redux]: https://github.com/rackt/redux
[Docker Compose]: https://docs.docker.com/compose/
