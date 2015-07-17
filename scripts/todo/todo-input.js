KISSY.add(function(S, require, exports, module) {
	var Node = require('node');
	var Dom = require('dom');
	var XTemplate = require('xtemplate/runtime');
	var Event = require('event');
	var Base = require('base');

	var TodoInput = Base.extend({
		initializer: function() {
			this.template = require('../../templates/todo-input-xtpl');
			this.el = new Node("<div>");
			this.delegateEvents();
		},

		render: function() {
			var htmlFragment = new XTemplate(this.template).render();
			this.el.append(htmlFragment);
		},

		delegateEvents: function() {
			Event.delegate(this.el, 'keydown', '.todo-input', function(e) {
				if(e.keyCode !== 13) {
					return null;
				}
				var todoItem = e.target.value;
				this.fire("saveTodoItem", {
					todoItem: {
						todo: todoItem,
						checked: false,
						uid: S.guid()
					}
				});
				this.clearInput();
			}, this);
		},

		clearInput: function() {
			Dom.val(this.el.one(".todo-input"), '');
		}
	});

	return TodoInput;
});