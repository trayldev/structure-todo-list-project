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
