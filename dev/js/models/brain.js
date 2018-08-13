function Brain(config) {
    this.cache = {};
}

var p = Brain.prototype;

p.publish = function(topic, args) {
    if (!this.cache[topic]) 
        return;

    for (var i = 0, el; el = this.cache[topic][i]; i++) 
        el.fn.apply(el.scope, args || []);
}

p.subscribe = function(topic, callback, scope) {  
    if (!this.cache[topic]) 
        this.cache[topic] = [];

    this.cache[topic].push({fn: callback, scope: scope || callback});

    return [topic, callback, scope];
}

p.unsubscribe = function(handle) {
    var i = 0, el, topic = handle[0];

    if (!this.cache[topic]) 
        return;

    for (; el = this.cache[topic][i]; i++) 
        if (el.fn === handle[1]) 
            this.cache[topic].splice(i, 1);
}

export default Brain;