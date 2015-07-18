KISSY.add(function(S, require, exports, module) {
	var Node = require('node');
	var Base = require('base');
	var Dom = require('dom');
	var Event = require('event');
	var XTemplate = require('xtemplate/runtime');
	var todoTpl = require('../../templates/todo-xtpl');
	var TodoInput = require('./todo-input');
	var TodoList = require('./todo-list');
	var TodoState = require('./todo-state');

	var Todo = Base.extend({
		initializer: function() {
			this.el = new Node("<div>");
			this.addAttr("todoList", {
				value: []
			});

			this.on("afterTodoListChange", function(ev) {
				this.todoList.render(this.get("todoList"));
				this.renderTodoState();
			}, this);

			this.initTodoInput();
			this.initTodoList();
			this.initTodoState();

			S.augment(this, Event.Target);
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
				this.set("todoList", todoList, {force: true});
			}, this);

			// 监听todoItem的选中/取消选中，修改状态栏
			this.todoList.on("toggleTodoItem", function(eventData) {
				// 修改状态栏数据
				var checkedNum = eventData.checkedNum;
				// 重新渲染状态栏
				this.todoState.render({
					checkedNum: checkedNum,
					totalNum: this.get("todoList").length
				});
			}, this);
		},

		initTodoState: function() {
			this.todoState = new TodoState();
			this.todoState.addTarget(this);

			// 监听删除选中的todo的事件
			this.on("clearCheckedTodos", function() {
				var todoList = this.get("todoList");
				var newTodoList = [];
				for (var i = 0, length = todoList.length; i < length; i++) {
					if(!todoList[i].checked) {
						newTodoList.push(todoList[i]);
					}
				}
				this.set("todoList", newTodoList);
			}, this);
			// 监听删除所有的todo的事件
			this.on("clearAllTodos", function() {
				this.set("todoList", []);
			}, this);
		},

		render: function() {
			this.renderSelf();
			this.renderTodoInput();
			this.renderTodoList();
			this.appendTodoState();
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
		},

		appendTodoState: function() {
			this.renderTodoState();
			this.todoState.el.appendTo(this.el.one(".todo-state"));
		},

		renderTodoState: function() {
			var todoList = this.get("todoList"),
				checkedNum = 0;
			// 计算初始化时checkedNum
			for (var i = 0, length = todoList.length; i < length; i++) {
				if(todoList[i].checked) {
					checkedNum++;
				}
			}

			this.todoState.render({
				checkedNum: checkedNum,
				totalNum: todoList.length
			});
		}
	});

	return Todo;
});