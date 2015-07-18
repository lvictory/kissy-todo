KISSY.add(function(S, require, exports, module) {
	var Base = require('base');
	var Node = require('node');
	var Dom = require('dom');
	var Event = require('event');
	var TodoItem = require('./todo-item');

	var TodoList = Base.extend({
		// 初始化
		initializer: function() {
			//声明this.el
			this.el = new Node("<ul>");
			Dom.addClass(this.el, "todo-list");
			this.subViews = [];
		},

		// 渲染根据todoList数据渲染todoItem
		render: function(todoList) {
			this.todoList = todoList;
			// 如果subViews不为空，清除所有subViews，包括事件
			if(this.subViews.length > 0) {
				S.each(this.subViews, function(item) {
					item.close();
				});
			}
	
			// 使用todoList构建subViews
			S.each(todoList, S.bind(function(item, index) {
				// 对每个subView绑定事件，包括修改、删除、选中
				var todoItem = new TodoItem(item);

				todoItem.on('editTodo', this.onTodoItemEdit, this);
				todoItem.on('deleteTodo', this.onTodoItemDelete, this);
				todoItem.on('checkTodo', this.onTodoItemChecked, this);

				todoItem.render();
				// 添加每个subView的节点到this.el中
				todoItem.el.appendTo(this.el);
				this.subViews.push(todoItem);
			}, this));
		},

		// todoItem修改响应事件
		onTodoItemEdit: function(todoTarget) {
			// 修改todoList
			for(var i = 0, length = this.todoList.length; i < length; i++) {
				if(todoTarget.todoData.uid == this.todoList[i].uid) {
					this.todoList[i].todo = todoTarget.todoData.todo;
					break;
				}
			}
			// 触发editTodoItem事件，由父view todo监听
			this.fire("editTodoItem", {todoList: this.todoList});
		},

		// todoItem删除响应事件
		onTodoItemDelete: function(todoTarget) {
			// 修改todoList
			for(var i = 0, length = this.todoList.length; i < length; i++) {
				if(todoTarget.todoData.uid == this.todoList[i].uid) {
					this.todoList.splice(i, 1);
					break;
				}
			}
			// 触发deleteTodoItem事件，由父view todo监听，传递出最新的todoList
			this.fire("deleteTodoItem", {todoList: this.todoList});
		},

		// todoItem选中时响应事件，未来完成
		onTodoItemChecked: function(todoTarget) {
			var checkedNum = 0;
			// 修改todoList
			for(var i = 0, length = this.todoList.length; i < length; i++) {
				if(todoTarget.todoData.uid == this.todoList[i].uid) {
					this.todoList[i].checked = todoTarget.todoData.checked;
				}
				if(this.todoList[i].checked) {
					checkedNum++;
				}
			}
			// 触发toggleTodoItem事件，由父view todo监听，传递出最新的todoList
			this.fire("toggleTodoItem", {checkedNum: checkedNum});
		}
	});

	return TodoList;
});