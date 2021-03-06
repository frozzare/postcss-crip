var objectMerge = require('object-merge');
var postcss     = require('postcss');

module.exports = postcss.plugin('postcss-crip', function (options) {

    options = options || {};

    var DEFAULTS = require('./crip-properties.json');

    var PROPS = objectMerge(DEFAULTS, options);

    return function (css) {

        css.eachRule(function (rule) {
            rule.each(function(decl) {

                var prop = decl.prop;

                if (!PROPS.hasOwnProperty(prop)) return;

                var properties = PROPS[prop];

                properties.forEach(function (property, index) {
                    decl.cloneBefore({
                        prop: properties[index],
                        value: decl.value
                    });
                });

                decl.removeSelf();

            });
        });

    };
});
