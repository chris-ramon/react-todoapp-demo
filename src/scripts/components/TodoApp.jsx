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

    onRemove: function(e) {
        e.preventDefault();
        this.props.handleTodoRemove({todo: this.props.todo});
    },

    render: function() {
        return (
            <li>
                <input
                    type="checkbox"
                    checked={this.state.done}
                    onChange={this.onToggle}
                    ref="todoDone" />
                <span> - </span>
                {this.props.todo.text}
                <span> - <a href="#" onClick={this.onRemove}>x</a></span>
            </li>
        );
    }
});

var Todos = React.createClass({
    render: function() {
        var todos = [];
        this.props.todos.forEach(_.bind(function(todo) {
            todos.push(<Todo
                key={todo.id}
                todo={todo}
                handleTodoRemove={this.props.handleTodoRemove}
            />);
        }, this));
        return (<ul>{todos}</ul>);
    }
});



var TodoForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var text = this.refs.todoText.getDOMNode().value.trim();
        if(_.isEmpty(text)) return;
        this.props.handleTodoSubmit({text: text});
        this.refs.todoText.getDOMNode().value = "";
    },

    render: function() {
        return (
            <form className="todo-form" onSubmit={this.handleSubmit}>
                <input type="text" ref="todoText"/>
                <input type="submit" />
            </form>
        );
    }
});

var TodoApp = React.createClass({
    getInitialState: function() {
        return {
            todos: this.props.todos
        }
    },

    handleTodoSubmit: function(todoText) {
        this.props.todos.push({id: _.uniqueId(), text: todoText, done: false});
        this.setState({
            todos: this.props.todos
        });
    },

    handleTodoRemove: function(payload) {
        var i = this.props.todos.indexOf(payload.todo);
        this.props.todos.splice(i, 1);
        this.setState({
            todos: this.props.todos
        });
    },

    render: function() {
        return (
            <div>
                <TodoForm handleTodoSubmit={this.handleTodoSubmit} />
                <Todos todos={this.state.todos} handleTodoRemove={this.handleTodoRemove} />
            </div>
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
