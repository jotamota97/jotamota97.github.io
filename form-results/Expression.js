function Expression() {
  this.arr = [];
}

Expression.prototype = {

  reset: function() {
    this.arr.length = 0;
  },

  addOr: function() {
    this.arr.push( "||" );
  },

  addAnd: function() {
    this.arr.push( "&&" );
  },

  addValue: function( idx1, idx2 ) {

    if ( idx1 > -1 && idx2 > -1 ) {
      this.arr.push( "( a[%1] && a[%1][%2] )".replace( /%1/g, idx1 ).replace( /%2/g, idx2 ) );
    }

  },

  toString: function() {
    return this.arr.join( " " ) || "false";
  },

  toFunction: function() {
    return new Function( "a", "return " + this.toString()  + ";" );
  }

};
