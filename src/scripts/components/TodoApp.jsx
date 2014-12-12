/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var _ = require("underscore");

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var imageURL = require('../../images/yeoman.png');

var Todo = React.createClass({
    getInitialState: function() {
        return {
            done: this.props.todo.done
        }
    },

    onToggle: function() {
        this.setState({
            done: this.refs.todoDone.getDOMNode().checked
        });
    },

    render: function() {
        return (
            <li>
                <input
                    type="checkbox"
                    checked={this.state.done}
                    onChange={this.onToggle}
                    ref="todoDone" />
                -
                {this.props.todo.text}
            </li>
        );
    }
});

var Todos = React.createClass({
    render: function() {
        var todos = [];
        this.props.todos.forEach(function(todo) {
            todos.push(<Todo
                key={todo.id}
                todo={todo}
            />);
        });
        return (<ul>{todos}</ul>);
    }
});

var TodoApp = React.createClass({
  render: function() {
    return (
      <Todos todos={this.props.todos} />
    );
  }
});

var todos = [
    {id: _.uniqueId(), text: "some todo", done: true},
    {id: _.uniqueId(), text: "other todo", done: false},
    {id: _.uniqueId(), text: "cool todo", done: false},
    {id: _.uniqueId(), text: "small todo", done: false}
];

React.renderComponent(<TodoApp todos={todos} />, document.getElementById('content')); // jshint ignore:line

module.exports = TodoApp;
