# fakerjs_with_browserify
I made this repo to experiment with the package faker.js. My objective was to get it working as simply as possible, without the need for launching node.js.

## Install
Clone this repo and jump into index.html right away to see some randomly generated dynamic text content.

## But How?
Using Browserify I created the script.js file, allowing us to access the faker library without the need for node.

### Browserify?
the faker-test.js script uses the require keyword to access the library from local node_modules/, which requires node to work.

Whats the big problem with that? Well... I don't know, but it gets in the way.

Anyhow, you can get around this insoluble problem using the browserify package, which takes your code and bundles it up with the dependent code all in one file for you, then if you redirect your browser to _that_ script instead, voila.

The only downside is if you want to edit faker-test.js, you will need to re-run browserify.

## What's the minTest.html file about?

I also created minTest.html which links to a minified version of the package, accomplishing the same thing with even fewer complications - no need for browserify!

## Dependencies
- browserify
- nodemon

If you want to make changes in faker-test.js, you will need to re-bundle the output into script.js using browserify.

run the following commands:
```
npm i
npm run bundle
```

Alternatively just make your changes in script.js!
