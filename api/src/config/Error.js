function CastException (message) {
    this.name = 'Cast Exception';
    this.message = message;
    this.stack = (new Error()).stack;
}
CastException.prototype = new Error; 
exports.CastException = CastException;