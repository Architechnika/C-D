var FastClone = {

    /**
     * This is a factory method that creates clone constructor function
     * for a specified object
     *
     * @param {Object} source - source object that need to be cloned next
     * @param {Boolean} isDeep - flag that represents should be clone deep or not (default: true)
     * @returns {Function}
     */
    factory: function (source, isDeep) {
        if (typeof source != 'object' || Array.isArray(source)) {
            throw new Error('Source is not an object');
        }
        var deep = isDeep === undefined ? true : isDeep;

        return new Function('src', FastClone._getKeyMap(source, deep));
    },

    /**
     * This method is for array cloning
     *
     * @param {Array} source - source array to clone
     * @param {Boolean} isDeep - flag that represents should be clone deep or not (default: true)
     * @returns {Array}
     */
    cloneArray: function(source, isDeep) {
        if (!Array.isArray(source)) {
            throw new Error('Source should be an array');
        }
        var deep = isDeep === undefined ? true : isDeep;

        var clonedArray = [];
        if (source.length) {
            var Clone = FastClone.factory(source[0], deep);
            for (var i = 0; i < source.length; i++) {
                clonedArray.push(new Clone(source[i]));
            }
        }
        return clonedArray;
    },

    /**
     * This method create map of object fields
     * for eval in clone function
     *
     * @param {Object|Array} source - source object that need to be cloned next
     * @param {Boolean} deep - flag that represents should be clone deep or not
     * @param {String} baseKey - current sequence of object keys
     * @param {Number} arrIndex - current sequence of array indexes
     * @returns {string}
     */
    _getKeyMap: function (source, deep, baseKey, arrIndex) {
        var base = baseKey || '';
        var index = (arrIndex || 0) + 1;

        var keysMap = base ? 'this' + base : '';

        if (Array.isArray(source)) {
            var iterVal = 'i' + index; // name of the current counter value
            var iterPath = base + '[' + iterVal + ']'; // path of the current array value

            if (typeof source[0] == 'object') {
                // This cycle will write code for copy array values
                keysMap += base ? ' = [];' : '';
                keysMap += 'for (var ' + iterVal + ' = 0; ' + iterVal + ' < src' + base + '.length; ' + iterVal + '++) {';
                keysMap += FastClone._getKeyMap(source[0], deep, iterPath, index);
                keysMap += '}';
            } else {
                keysMap += ' = src' + base + '.slice();';
            }
        } else {
            keysMap += base ? ' = {};' : '';

            // Iterate over object keys
            for (var key in source) {
                if (!source.hasOwnProperty(key)) {
                    continue;
                }

                var value = source[key];
                var path = base + '.' + key; // current key path

                if (deep && typeof value == 'object') {
                    keysMap += FastClone._getKeyMap(value, deep, path, index);
                } else {
                    keysMap += 'this' + path + ' = src' + path + ';';
                }
            }
        }

        return keysMap;
    }
};

if (typeof module == 'object' && typeof module.exports == 'object') {
    module.exports = FastClone;
}