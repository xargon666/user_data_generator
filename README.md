# User Data Generator
This simple app generates fake user data in a table which can be exported to a .csv file. 

## 🎯 Project Objectives
- Create a simple but practical tool
- Experiment using the faker.js package.
- Familiarize myself with Browserify, creating a local dev environment to work with npm packages
- Solve new challenges, such as exporting data to CSV with JavaScript

## 🚀 Deployment
[![Netlify Status](https://api.netlify.com/api/v1/badges/0ce16fb3-4576-4d58-bb53-f837d5078ab5/deploy-status)](https://app.netlify.com/sites/userdata-generator/deploys)

## 🛠 Install for local development
Clone this repo and jump into index.html right away to see some randomly generated dynamic text content.

In a terminal enter the following commands:
```
https://github.com/xargon666/fakerjs_with_browserify.git
cd fakerjs_with_browserify
npm i
npm run dev
```

### How does it work?
Using Browserify I created the script.js file, allowing us to access the faker library without the need for node.

### What is Browserify?
the faker-test.js script uses the require keyword to access the library from local node_modules/, which requires node to work.

Browserify takes your code and bundles it up with your dependencies into one .js file. If you link the html to _that_ script file instead, you avoid the require() issue.

The only downside is if you want to edit faker-test.js, you will need to re-run browserify.

### What's the minTest.html file about?

I also created minTest.html which links to a minified version of the package, accomplishing the same thing with even fewer complications - no need for browserify!

## Dependencies
- browserify
- nodemon

## Testing

If you want to make changes in faker-test.js, you will need to re-bundle the output into script.js using browserify.

run the following commands:
```
npm i
npm run bundle
```

Alternatively just make your changes in script.js!
