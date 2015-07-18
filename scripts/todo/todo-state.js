KISSY.add(function(S, require, exports, module) {
	var Base = require('base'),
		Node = require('node'),
		Dom = require('dom'),
		Event = require('event'),
		XTemplate = require('xtemplate/runtime'),
		tpl = require('../../templates/todo-state-xtpl');

	var TodoState = Base.extend({
		// 初始化
		initializer: function() {
			this.el = new Node("<div>");
			// 代理事件
			this.delegateEvents();

			this.template = tpl;

			S.augment(this, Event.Target);
		},
			
		// 渲染
		render: function(state) {
			Dom.html(this.el, new XTemplate(this.template).render({
				checkedNum: state.checkedNum,
				totalNum: state.totalNum
			}));
		},
		// 绑定事件
		delegateEvents: function() {
			Event.delegate(this.el, 'click', '.clear-checked', function() {
				this.fire("clearCheckedTodos");
			}, this);
			Event.delegate(this.el, 'click', '.clear-all', function() {
				this.fire("clearAllTodos");
			}, this);
		}
	});

	return TodoState;
});