function Expression() {
  this.arr = [];
  this.str = [];
}

Expression.prototype = {

  open: function() {
    this.arr.push( "(" );
    this.str.push( "(" );
  },

  close: function() {
    this.arr.push( ")" );
    this.str.push( ")" );
  },

  addOr: function() {
    this.arr.push( "||" );
    this.str.push( "OR" );
  },

  addAnd: function() {
    this.arr.push( "&&" );
    this.str.push( "AND" );
  },

  addValue: function( idx1, idx2 ) {

    if ( idx1 > -1 && idx2 > -1 ) {
      this.arr.push( "(a[%1]&&a[%1][%2])".replace( /%1/g, idx1 ).replace( /%2/g, idx2 ) );
      this.str.push( "a[%1][%2]".replace( /%1/g, idx1 + 1 ).replace( /%2/g, idx2 + 1 ) );
    }

  },

  not: function() {
    this.arr.push( "!" );
    this.str.push( "NOT" );
  },

  all: function() {
    this.arr.length = 0;
    this.arr.push( "true" );
    this.str.length = 0;
    this.str.push( "SHOW ALL" );
  },

  backspace: function() {
    this.arr.pop();
    this.str.pop();
  },

  reset: function() {
    this.arr.length = 0;
    this.str.length = 0;
  },

  toString: function() {
    return this.str.join( " " ) || "SHOW NONE";
  },

  toFunction: function() {
    var fn, body = this.arr.join( "" ) || "false";
    try {
      fn = new Function( "a", "return " + body  + ";" );
    } catch ( err ) {}
    return fn;
  }

};
