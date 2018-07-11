# Structure React Express Todo List Project

This project was designed to help you build a small React/Express todo list project that you can expend on and deploy to [Structure](https://structure.sh). We will go through setting up React, WebPack, Babel, and Express from scratch. We will build a basic API with Express, which our React project will interact with.

## Environment Setup

Let's start by installing . For this project, our only dependency is [Structure](https://structure.sh).

```
pip install structure
```

## Project Setup

Start by creating your project folder. Mine is called `structure-todo-list-project`. Then make a `client` folder within your project.

```
mkdir structure-todo-list-project
cd structure-todo-list-project
mkdir client
cd client
```

Once in our /client (front-end) folder, let's run `npm init`. You can click enter through all of the options for now.

You will see that a `package.json` folder appeared inside /client. You can create a public and src folder now as well.

```
mkdir public
mkdir src
```

Lastly, let's jump ahead and install all of the packages we will need for the first part of this project. Do so within

```
// Babel Packages
npm install --save-dev babel-core babel-cli babel-preset-env babel-preset-react
// Webpack Packages
npm install --save-dev webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader
// React Hot Reloader
npm install --save react-hot-loader
```

Don't worry about these for now, these packages will be explained more in depth as we use them.

#### HTML

We will put the below html inside a new file called `index.html` inside our /public folder. Note that the line `<div id="root"></div>` is how our React App (we will write this in a moment) is inserting itself into our HTML. The other important line in this file is `<script src="../dist/bundle.js"></script>`. This line includes the bundle.js file that will be built from our project files. More on this later.

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Structure React Express Todo List</title>
  </head>
  <body>
    <div id="root"></div>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <script src="../dist/bundle.js"></script>
  </body>
</html>
```

If you look at your project tree now with `tree -a` it should look something like this.

```
.
├── .babelrc
├── .gitignore
├── dist
│   └── bundle.js
├── package-lock.json
├── package.json
├── public
│   └── index.html
├── src
│   ├── App.css
│   ├── App.js
│   └── index.js
└── webpack.config.js
```

#### Babel

Babel is our next big step. Babel is essentially a translator that will convert our React/JSX code into something the browser can understand and render. Make sure you installed the babel packages in the Environment Setup section.

```
{
  "presets": ["env", "react"]
}
```

This short config file simply tells babel to use the env and react packages.

#### Webpack

Webpack is next! Let's paste the config below into a new file in the /client folder called `webpack.config.js`.

```
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['env'] }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [ new webpack.HotModuleReplacementPlugin() ]
};
```

Find out more about how this works in the [Webpack Docs](https://webpack.js.org/concepts/)

#### NPM

Your package.json file should currently look something like this.

```
{
  "name": "client",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^1.0.0",
    "style-loader": "^0.21.0",
    "webpack": "^4.16.0",
    "webpack-cli": "^3.0.8",
    "webpack-dev-server": "^3.1.4"
  },
  "dependencies": {
    "react-hot-loader": "^4.3.3"
  }
}
```

We can make the changes below to setup our npm scripts to run our React App (that's next).

```
{
  "name": "client",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --mode development",
    "build": "webpack --mode production"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.4",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.11",
    "style-loader": "^0.21.0",
    "webpack": "^4.12.0",
    "webpack-cli": "^3.0.8",
    "webpack-dev-server": "^3.1.4"
  },
  "dependencies": {
    "react": "^16.4.1",
    "react-dom": "^16.4.1",
    "react-hot-loader": "^4.3.3"
  }
}
```

## React

The last big thing to do for the first part of this tutorial is create our React app. We will be working in the /src folder for this part.

Create a file called `index.js` in /src and paste the following code. All this code does is import the react and react-dom libraries and then render the App component (we'll create that next) to the `root` div tag in our file `/public/index.html`.

```
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
ReactDOM.render(
  <App />,
  document.getElementById("root")
);
```

`App.js` is going to be our very first React component. You can think of this whole component structure as a tree, with App being the very 'root' of that tree. Make a file in /src called `App.js` and paste this inside.

```
import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";

class App extends Component{
  render(){
    return(
      <div className="App">
        <h1> Hello, World! </h1>
      </div>
    );
  }
}

export default hot(module)(App);
```

This returns a React component with the text "Hello World!" Notice the `export default hot(module)(App)` line on the bottom of App.js. This line returns the App component to index.js and allows it to hot reload if it or any of its children (sub-components of App.js) are changed. Hot reloading saves us from needing to refresh our browser every time we make a code change.

**That's it!** We now have a basic react app ready to be run. Go ahead and run `npm start` and checkout `http://localhost:3030`.

Note: If you are stuck on this at all, feel free to check out the code for this repository at https://github.com/trayldev/structure-todo-list-project and go to the commit `complete-hello-world-app`.
