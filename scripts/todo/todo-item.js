KISSY.add(function(S, require, exports, module) {
	var Base = require('base');
	var Node = require('node');
	var Dom = require('dom');
	var tpl = require('../../templates/todo-item-xtpl');
	var XTemplate = require('xtemplate/runtime');
	var Event = require('event');

	var TodoItem = Base.extend({
		// 初始化
		initializer: function() {
			// 创建this.el
			this.el = new Node("<li>");
			// 添加模板
			this.template = tpl;
			// 初始化model状态, 包括edit状态和hover状态
			this.addAttrs({
				"todo": {},
				"checked": {},
				"index": {},
				"editing": {}
			}, {
				"todo": this.userConfig.todo,
				"checked": this.userConfig.checked,
				"index": this.userConfig.index,
				"editing": false
			});
			// 绑定事件
			this.delegateEvents();
			// model绑定事件
			// 双击编辑改变model时, input失焦保存时
			this.on("afterEditingChange", this.render, this);
		},

		// 渲染todoItem
		render: function() {
			var todo = this.getAttrVals();
			var htmlFragment = new XTemplate(this.template).render(todo);
			this.el.empty();
			this.el.append(htmlFragment);			
		},

		// 绑定事件
		delegateEvents: function() {
			// 删除
			Event.delegate(this.el, 'click', '.ico-delete', this.deleteTodo, this);
			//修改
			Event.delegate(this.el, 'dblclick', '.todo-content', this.toggleEdit, this);
			//失焦保存
			Event.delegate(this.el, 'focusout', '.todo-edit', this.saveTodo, this);
		},

		// 双击编辑响应方法
		toggleEdit: function() {
			// 改变model状态
			this.set("editing", true);
		},

		// input失焦保存方法
		saveTodo: function(e) {
			var todo = e.target.value;
			// 抛出事件给todo-list，更新todoList
			if(todo !== this.get("todo")) {
				this.fire("editTodo", {
					todoData: this.getAttrVals()
				});
			}

			this.set({
				todo: todo,
				editing: false
			});
		},

		// 点击删除按钮响应方法
		deleteTodo: function() {
			// 抛出事件，更新todo-list中todoList数据
			this.fire('deleteTodo', {
				todoData: this.getAttrVals()
			});
			// 删除该对象
			this.close();
		},

		// checkbox选中响应方法

		// 删除时的close方法
		close: function() {
			Dom.remove(this.el);
			this.destroy();
		}	
	});

	return TodoItem;
});