KISSY.add(function(S, require, exports, module) {
	var Node = require('node');
	var Base = require('base');
	var Dom = require('dom');
	var Event = require('event');
	var TodoInput = require('./todo-input');
	var TodoList = require('./todo-list');
	var XTemplate = require('xtemplate/runtime');
	var todoTpl = require('../../templates/todo-xtpl');

	var Todo = Base.extend({
		initializer: function() {
			this.el = new Node("<div>");
			this.addAttr("todoList", {
				value: []
			});

			this.on("afterTodoListChange", function(ev) {
				this.todoList.render(this.get("todoList"));
			}, this);

			this.initTodoInput();
			this.initTodoList();
		},

		initTodoInput: function() {
			this.todoInput = new TodoInput();

			this.todoInput.on('saveTodoItem', function(eventData) {
				var todoList = this.get("todoList");
				todoList = todoList.concat([eventData.todoItem]);
				this.set("todoList", todoList);
			}, this);
		},

		initTodoList: function() {
			this.todoList = new TodoList(this.get("todoList"));

			// 监听todoItem的修改、删除，保持数据一致性，修改状态栏
			this.todoList.on("editTodoItem deleteTodoItem", function(eventData) {
				var todoList = eventData.todoList;
				this.set("todoList", todoList);
			}, this);

			// 监听todoItem的选中/取消选中，修改状态栏
			this.todoList.on("toggleTodoItem", function(eventData) {
				// 修改状态栏数据
			}, this);
		},

		render: function() {
			this.renderSelf();
			this.renderTodoInput();
			this.renderTodoList();
			return this.el;
		},

		renderSelf: function() {
			var htmlFragment = new XTemplate(todoTpl).render();
			this.el.append(htmlFragment);
		},

		renderTodoInput: function() {
			this.todoInput.render();
			this.todoInput.el.appendTo(this.el.one(".todo-header"));
		},

		renderTodoList: function() {
			// 渲染todoList模板，替换原来的todoList
			this.todoList.render(this.get("todoList"));
			this.todoList.el.appendTo(this.el.one(".todo-container"));
		}
	});

	return Todo;
});