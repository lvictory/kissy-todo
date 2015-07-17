/** Compiled By kissy-xtemplate */
KISSY.add(function (S, require, exports, module) {
        /*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true*/
        return function (scope, S, undefined) {
            var buffer = "",
                config = this.config,
                engine = this,
                moduleWrap, utils = config.utils;
            if (typeof module !== "undefined" && module.kissy) {
                moduleWrap = module;
            }
            var runBlockCommandUtil = utils.runBlockCommand,
                renderOutputUtil = utils.renderOutput,
                getPropertyUtil = utils.getProperty,
                runInlineCommandUtil = utils.runInlineCommand,
                getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
            buffer += '<input type="checkbox" class="todo-check" ';
            var config0 = {};
            var params1 = [];
            var id2 = getPropertyUtil(engine, scope, "checked", 0, 1);
            params1.push(id2);
            config0.params = params1;
            config0.fn = function (scope) {
                var buffer = "";
                buffer += ' checked ';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config0, "if", 1);
            buffer += ' >\r\n<div class="container ';
            var config3 = {};
            var params4 = [];
            var id5 = getPropertyUtil(engine, scope, "editing", 0, 2);
            params4.push(id5);
            config3.params = params4;
            config3.fn = function (scope) {
                var buffer = "";
                buffer += 'editing';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config3, "if", 2);
            buffer += '">\r\n\t<div class="todo-preview">\r\n\t\t<p class="todo-content">';
            var id6 = getPropertyOrRunCommandUtil(engine, scope, {}, "todo", 0, 4);
            buffer += renderOutputUtil(id6, true);
            buffer += '</p>\r\n\t\t<a href="javascript:void(0);" class="ico-delete">X</a>\r\n\t</div>\r\n\t<div class="edit-wrapper">\r\n\t\t<input type="text" value="';
            var id7 = getPropertyOrRunCommandUtil(engine, scope, {}, "todo", 0, 8);
            buffer += renderOutputUtil(id7, true);
            buffer += '" class="todo-edit" autoFocus selected>\r\n\t</div>\r\n</div>\r\n';
            return buffer;
        };
});