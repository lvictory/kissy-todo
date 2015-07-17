KISSY.use('node, ../../../scripts/todo/todo', function(S, Node, Todo) {
	var todo = new Todo();
	todo.render().appendTo(Node.one("body"));
});