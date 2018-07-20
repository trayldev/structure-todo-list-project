# Structure React Express Todo List Project

This project was designed to help you build a small React/Express todo list project that you can expend on and deploy to [Structure](https://structure.sh). We will go through setting up React, WebPack, Babel, and Express from scratch. We will build a basic API with Express, which our React project will interact with.

# Part 1: Basic Hello World React App

## Environment Setup

Let's start by installing what we need.. For this project, our only dependency is [Structure](https://structure.sh).

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

You will see that a `package.json` folder appeared inside the /client folder. You can create a public and src folder now as well.

```
mkdir public
mkdir src
```

Let's jump ahead and install all of the packages we will need for the first part of this project. Do so with

```
// Babel Packages
npm install --save-dev babel-core babel-cli babel-preset-env babel-preset-react
// Webpack Packages
npm install --save-dev webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader
// React Hot Reloader
npm install --save react-hot-loader react react-dom
```

Don't worry about these for now, these packages will be explained more in depth as we use them.

#### HTML

We will put the below html inside a new file called `index.html` inside our /public folder. Note that the line `<div id="root"></div>` is how our React App (we will write this in a moment) is inserting itself into our HTML. The other important line in this file is `<script src="../bundle.js"></script>`. This line includes the bundle.js file that will be built from our project files. More on this later.

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
    <script src="../bundle.js"></script>
  </body>
</html>
```

If you look at your project tree now with `tree -a` it should look something like this. If you installed your node_modules, the tree will be much larger!

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

Babel is our next big step. Babel is essentially a translator that will convert our React/JSX into something the browser can understand and render (display). Make sure you installed the babel packages in the Environment Setup section, then add this to `.babelrc`.

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

All you need to know about how this works is in the [Webpack Docs](https://webpack.js.org/concepts/)

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
    "react": "^16.4.1",
    "react-dom": "^16.4.1",
    "react-hot-loader": "^4.3.3"
  }
}
```

We can make the changes below to setup our npm **scripts** to run our React App (that's next). Go ahead and add the start and build

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

# Part 2: Express Serve Content

## Express

Great! Now let's setup our express application.

#### NPM

The next portion of this tutorial is going to be in the root project folder. Mine is called `structure-todo-list-project`. Let's run `npm init` here.

Install express with `npm install --save express`

Paste this code into your package.json file in your project directory.

```
{
  "name": "server",
  "version": "1.0.0",
  "scripts": {
    "start": "npm run client && npm run server",
    "client": "cd client && npm run build && cd ..",
    "server": "node server.js",
    "dev": "export PORT=5000 npm run client && npm run server"
  },
  "dependencies": {
    "express": "^4.16.3"
  }
}
```

The scripts in this file are increadibly important, so pay attention to them. If we run `npm start` (which is what Structure will do when we deploy), we run `client` which goes into our client directory and builds our static react app. Then it moves back to the root project folder and starts the node server. Running `npm run dev` does the same thing but on port 5000.

#### Server

Now create a file called `server.js` inside the project root directory. All this does is return the static files from your built react app.

_Note:_ Structure requires your port to be **80** but we will use **5000** for development, set inside package.json under the dev command.

```
const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 80;

// Serve any static files
app.use(express.static(path.join(__dirname, "client/dist")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "client/public", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
```

Now try running `npm run dev` from your project root directory and look at `http://localhost:5000`. You should see your React hello world app running there. In the next section we will work on deploying our React/Express hello world app to [Structure](https://structure.sh).

# Part 3: Structure Deploy

Now we will deploy to [Structure](https://structure.sh).

Make sure you're already logged into Structure. [Instructions for CLI login can be found here](https://docs.structure.sh/getting-started-with-the-cli).

Let's deploy our app by running

```
structure deploy my-todo-list
```

If everything worked, you should see your hello world app live at `https://todo-list-<your-structure-username>.structure.sh/`.

Something important to note is we did not have to run `npm install` anywhere. When you deploy your project to Structure, the server runs two processes. First it recursively searches your project for package.json files and runs `yarn install` for you. Then it runs `npm start` in your project root directory's `package.json`. Look back at the Express section, specifically our `package.json` we wrote, and note how we wrote our `npm start` command to build the client app then start the server.

# Part 4: Todo List Development

At this point we have a fully functioning and live React/Express app hosted on Structure. This final part of the tutorial will focus on the development of our Todo list including Express API endpoints and React Components.

### Express API

We are going to develop two API endpoints with three functions (GET, POST, and DELETE).

Let's create our mock database. This is just a variable we'll store on our server that will hold stare for our server. Normally this would be done with a database, but for the purpose of this tutorial, we will use a variable.

Go ahead and paste the following in your `server.js` file before the `app.listen` line.

```
var todo_list = {
  as4trsfd: {
    title: "Wake up",
    complete: true
  },
  k5icmwof: {
    title: "Make a todo list",
    complete: true
  },
  ka6mgjaf: {
    title: "Deploy to Structure",
    complete: true
  },
  aysgc5d5: {
    title: "Sleep",
    complete: false
  },
  kcos6ktov: {
    title: "Repeat!",
    complete: false
  }
};
```

##### /list GET

Next we will create an API endpoint `/list`. This GET endpoint will simply return our `todo_list` object as a json object.

```
app.get("/list", (req, res) => {
  res.send(todo_list);
});
```

##### /list POST

This API endpoint will create a 8 character random key and store an object for the new item inside our `todo_list` variable.

```
app.post("/list", (req, res) => {
  const key = Math.random()
    .toString(36)
    .substr(2, 9);

  const new_item = {
    title: req.query.title,
    complete: false
  };

  todo_list[key] = new_item;
  res.send(todo_list);
});
```

##### /list DELETE

This API endpoint will get the key of the item we are trying to delete and remove it from the `todo_list` object.

```
app.delete("/list", (req, res) => {
  const key = req.query.key;
  delete todo_list[key];
  res.send(todo_list);
});
```

##### /update-checkmark POST

This API endpoint flips the state of a checkbox.

```
app.post("/update-checkmark", (req, res) => {
  const key = req.query.key;
  todo_list[key]["complete"] = !todo_list[key]["complete"];
  res.send(todo_list);
});
```

### Summary

At this point your `server.js` file should look something like this.

```
const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 80;

// Serve any static files
app.use(express.static(path.join(__dirname, "client/dist")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "client/public", "index.html"));
});

var todo_list = {
  as4trsfd: {
    title: "Wake up",
    complete: true
  },
  k5icmwof: {
    title: "Make a todo list",
    complete: true
  },
  ka6mgjaf: {
    title: "Deploy to Structure",
    complete: true
  },
  aysgc5d5: {
    title: "Sleep",
    complete: false
  },
  kcos6ktov: {
    title: "Repeat!",
    complete: false
  }
};

// API calls
app.get("/list", (req, res) => {
  res.send(todo_list);
});

app.post("/list", (req, res) => {
  const key = Math.random()
    .toString(36)
    .substr(2, 9);

  const new_item = {
    title: req.query.title,
    complete: false
  };

  todo_list[key] = new_item;
  res.send(todo_list);
});

app.delete("/list", (req, res) => {
  const key = req.query.key;
  delete todo_list[key];
  res.send(todo_list);
});

app.post("/update-checkmark", (req, res) => {
  const key = req.query.key;
  todo_list[key]["complete"] = !todo_list[key]["complete"];
  res.send(todo_list);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
```

### React Style

Go ahead and start off by copying this style into your `App.css` file.

```
html {
  background-color: lightgreen;
  height: 100%;
  width: 100%;
  text-align: center;
}

.App {
  margin: 1rem;
  padding-top: 30px;
  font-family: Arial, Helvetica, sans-serif;
}

.container {
  display: flex;
}

.page-title {
  color: #ffffff;
  width: 300px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.new-todo-wrapper {
  width: 430px;
  height: 40px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
}

.todo-input {
  height: 100%;
  width: 80%;
  border: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 10px;
  border-bottom-left-radius: 12px;
  border-top-left-radius: 12px;
  outline: none;
}

.add-todo-btn {
  height: 100%;
  width: 20%;
  border: 0px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  background-color: #ffbb91;
  outline: none;
}

.todo-list-wrapper {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
  max-height: 70vh;
  overflow-x: none;
  overflow-y: scroll;
}

.todo-item-wrapper {
  background-color: #ffffff;
  width: 80%;
  height: 40px;
  padding-left: 30px;
  margin-top: 3px;
  margin-bottom: 3px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 12px;
  line-height: 40px;
}

.title {
  padding-left: 10px;
  font-size: 24px;
}

.delete-btn {
  position: absolute;
  right: 50px;
  line-height: 40px;
  font-size: 28px;
}
```

### React

Now to the React! Let's start off by updating our App component.

```
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { list: {} };
  }

  componentDidMount() {
    fetch("/list")
      .then(res => {
        return res.json();
      })
      .then(list => {
        this.setState({ list: list });
      });
  }

  render() {
    return (
      <div className="App">
        <h1> TODO LIST </h1>

        {Object.keys(this.state.list).map(key => {
          return (
            <CheckBoxItem
              title={this.state.list[key].title}
              checked={this.state.list[key].complete}
              id={key}
              key={key}
            />
          );
        })}
      </div>
    );
  }
}
```

What is this doing? Essentially, our `constructor` sets our component's state with an empty object called list. Then our `componentDidMount()` makes a request to our server asking for the the JSON object that the `/list` API endpoint returns. Finally, our render function displays some basic HTML. It also uses the `Object.keys()` function to get a list of keys in our list object (the ids of all the list items) and uses the `map` function to loop through those keys and return a `CheckBoxItem` for each key. We will create the CheckBoxItem component next. Notice that we pass the title, checked status, and id value as props down to our `CheckBoxItem`. The `key` word is used whenever we map through a list so the browser can differentiate between items in lists (helpful for browser accessibility tools like page readers).

Next, let's create a component called CheckBoxItem. This will be a checkbox displayed next to a title for each todo item.

```
class CheckBoxItem extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: this.props.checked };
  }

  checkboxClicked(event) {
    this.setState({ checked: !this.state.checked });
    // send POST to /update-checkbox/?key={this.props.id}
    const url = "/update-checkmark/?key=" + this.props.id;
    fetch(url, {
      method: "POST"
    });
  }

  render() {
    return (
      <div className="container">
        <div className="checkbox">
          {this.state.checked ? (
            <input
              type="checkbox"
              onClick={event => this.checkboxClicked(event)}
              checked
            />
          ) : (
            <input
              type="checkbox"
              onClick={event => this.checkboxClicked(event)}
            />
          )}
        </div>
        <div className="title">{this.props.title}</div>
      </div>
    );
  }
}
```

We'll walk through this component too! Starting with the constructor, we set the initial checked state to be what was passed down from the `App` component. The `checkboxClicked` function runs when a checkbox is clicked. This updates the state of this checkbox and then makes a POST request to our `/update-checkmark` API endpoint. Remember this endpoint just toggles the checked state of the checkbox in the `todo_list` variable. In a bigger application, this might update a database, but for now we will just use a variable.

Finally, the render function returns HTML, including a conditional render of a checked or unchecked checkbox. This is how we show two states of the checkbox. Notice that the `onClick()` function passes the click event to the `checkboxClicked` function.

### Checkpoint

At this point our `App.js` file should look something like this.

```
import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { list: {} };
  }

  componentDidMount() {
    fetch("/list")
      .then(res => {
        return res.json();
      })
      .then(list => {
        this.setState({ list: list });
      });
  }

  render() {
    return (
      <div className="App">
        <h1> TODO LIST </h1>

        {Object.keys(this.state.list).map(key => {
          return (
            <CheckBoxItem
              title={this.state.list[key].title}
              checked={this.state.list[key].complete}
              id={key}
              key={key}
            />
          );
        })}
      </div>
    );
  }
}

class CheckBoxItem extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: this.props.checked };
  }

  checkboxClicked(event) {
    this.setState({ checked: !this.state.checked });
    // send POST to /update-checkbox/?key={this.props.id}
    const url = "/update-checkmark/?key=" + this.props.id;
    fetch(url, {
      method: "POST"
    });
  }

  render() {
    return (
      <div className="container">
        <div className="checkbox">
          {this.state.checked ? (
            <input
              type="checkbox"
              onClick={event => this.checkboxClicked(event)}
              checked
            />
          ) : (
            <input
              type="checkbox"
              onClick={event => this.checkboxClicked(event)}
            />
          )}
        </div>
        <div className="title">{this.props.title}</div>
      </div>
    );
  }
}

export default hot(module)(App);
```

If everything worked properly, we should have a todo list with no way to add or delete items, just check/uncheck them. Go ahead and run `npm run dev` in the project root directory and checkout out at `localhost:5000`.

### Add Item

To add an item we will add the following right below our todo header and above our list wrapper inside our App component.

```
<div className="new-todo-wrapper">
  <input
    className="todo-input"
    type="text"
    placeholder="Add new todo..."
  />
  <button className="add-todo-btn">Add</button>
</div>
```

Add event handlers to the text field and button:

```
<input
  className="todo-input"
  type="text"
  placeholder="Add new todo..."
  onChange={() => this.onType(event)}
  value={this.state.new_title}
/>
<button className="add-todo-btn" onClick={() => this.addClicked()}>
```

And some JavaScript to run when we type or click them, respectively. Put this above your `render()` function in the App component.

```
onType(event) {
  this.setState({ new_title: event.target.value });
}
addClicked() {
  if (this.state.new_title === "") {
    return;
  }
  // Update server
  const url = "/list/?title=" + this.state.new_title;
  fetch(url, {
    method: "POST"
  })
    .then(res => {
      return res.json();
    })
    .then(list => {
      this.setState({ list: list, new_title: "" });
    });
}
```

That's it. As you type, we set state inside the App component to store the typed text. When we click Add, we make a POST request to our server updating the todo_list variable, then update our list variable and clear the typed text in our text input.

### Delete Item

Let's add a simple `X` delete button after our title.

```
<div
  className="delete-btn"
  onClick={() => {
    this.deleteClicked();
  }}>
  X
</div>
```

Then we'll write `deleteClicked()`.

```
deleteClicked() {
  const url = "/list/?key=" + this.props.id;
  fetch(url, {
    method: "DELETE"
  });
}
```

What's wrong with this setup? Why doesn't our DOM update when we click that `X` button? The reason is, we haven't updated our list in the App component. To do this, we're going to pass a callback function down from the App component to the CheckBoxItem component. When the X is called and our server responds successfully, we will run this callback and update our list.

In the App component, add this below the `componentDidMount()` function

```
removeFromList(keyToRemove) {
  const listWithoutDeletedItem = {};
  Object.keys(this.state.list).forEach(key => {
    if (keyToRemove != key) {
      listWithoutDeletedItem[key] = this.state.list[key];
    }
  });
  this.setState({ list: listWithoutDeletedItem });
}
```

And this property to the `<CheckBoxItem />` HTML components in the `.map()` in App.

```
removeFromListCallback={() => this.removeFromList(key)}
```

We also need to update the CheckBoxItem component function `deleteClicked()`. Go ahead and change the whole function to

```
deleteClicked() {
  const url = "/list/?key=" + this.props.id;
  fetch(url, {
    method: "DELETE"
  }).then(() => {
    this.props.removeFromListCallback();
  });
}
```

Your React should now be complete with add, delete, check, and uncheck functionality as well as a clean UI. Go ahead and try running `npm run dev` if you haven't been to make sure everything looks great!

If you are having any issues, this is what all of your react code should look like.

```
import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { list: {}, new_title: "" };
  }

  componentDidMount() {
    fetch("/list")
      .then(res => {
        return res.json();
      })
      .then(list => {
        this.setState({ list: list });
      });
  }

  removeFromList(keyToRemove) {
    const listWithoutDeletedItem = {};
    Object.keys(this.state.list).forEach(key => {
      if (keyToRemove != key) {
        listWithoutDeletedItem[key] = this.state.list[key];
      }
    });
    this.setState({ list: listWithoutDeletedItem });
  }

  onType(event) {
    this.setState({ new_title: event.target.value });
  }
  addClicked() {
    if (this.state.new_title === "") {
      return;
    }
    // Update server
    const url = "/list/?title=" + this.state.new_title;
    fetch(url, {
      method: "POST"
    })
      .then(res => {
        return res.json();
      })
      .then(list => {
        this.setState({ list: list, new_title: "" });
      });
  }

  render() {
    return (
      <div className="App">
        <h1 className="page-title"> TODO LIST </h1>
        <div className="new-todo-wrapper">
          <input
            className="todo-input"
            type="text"
            placeholder="Add new todo..."
            onChange={() => this.onType(event)}
            value={this.state.new_title}
          />
          <button className="add-todo-btn" onClick={() => this.addClicked()}>
            Add
          </button>
        </div>
        <div className="todo-list-wrapper">
          {Object.keys(this.state.list).map(key => {
            return (
              <div className="todo-item-wrapper">
                <CheckBoxItem
                  title={this.state.list[key].title}
                  checked={this.state.list[key].complete}
                  id={key}
                  key={key}
                  removeFromListCallback={() => this.removeFromList(key)}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

class CheckBoxItem extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: this.props.checked };
  }

  checkboxClicked(event) {
    this.setState({ checked: !this.state.checked });
    // send POST to /update-checkbox/?key={this.props.id}
    const url = "/update-checkmark/?key=" + this.props.id;
    fetch(url, {
      method: "POST"
    });
  }

  deleteClicked() {
    const url = "/list/?key=" + this.props.id;
    fetch(url, {
      method: "DELETE"
    }).then(() => {
      this.props.removeFromListCallback();
    });
  }

  render() {
    return (
      <div className="container">
        <div className="checkbox">
          {this.state.checked ? (
            <input
              type="checkbox"
              className="checkbox"
              onClick={event => this.checkboxClicked(event)}
              checked
            />
          ) : (
            <input
              type="checkbox"
              className="checkbox"
              onClick={event => this.checkboxClicked(event)}
            />
          )}
        </div>
        <div className="title">{this.props.title}</div>
        <div
          className="delete-btn"
          onClick={() => {
            this.deleteClicked();
          }}>
          X
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
```

## Final Structure deploy

Let's finish off this tutorial by typing `structure deploy todo-list`.

That was easy! Your beautiful app should be running at `https://todo-list-<your-structure-username>.structure.sh/`.

## Contact

If you have any questions regarding the material in this tutorial, feel free to reach out to [Structure](https://structure.sh) at **help@structure.sh**.
