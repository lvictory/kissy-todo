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
            buffer += '';
            var config0 = {};
            var params1 = [];
            var id2 = getPropertyUtil(engine, scope, "checkedNum", 0, 1);
            params1.push(id2 > (0));
            config0.params = params1;
            config0.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n\t<a href="javascript:void(0)" class="clear-checked">clear ';
                var id3 = getPropertyOrRunCommandUtil(engine, scope, {}, "checkedNum", 0, 2);
                buffer += renderOutputUtil(id3, true);
                buffer += ' todos</a>\r\n';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config0, "if", 1);
            buffer += '\r\n';
            var config4 = {};
            var params5 = [];
            var id6 = getPropertyUtil(engine, scope, "totalNum", 0, 4);
            params5.push(id6 > (0));
            config4.params = params5;
            config4.fn = function (scope) {
                var buffer = "";
                buffer += '\r\n\t<a href="javascript:void(0);" class="clear-all">clear all</a>\r\n';
                return buffer;
            };
            buffer += runBlockCommandUtil(engine, scope, config4, "if", 4);
            return buffer;
        };
});