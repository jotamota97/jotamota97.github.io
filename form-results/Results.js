var reEscape = /([.+*?=^!:${}()[\]|\/])/g;
function createRegExp( option ) {
  return new RegExp( option.replace( reEscape, "\\$1" ) + "(?=,|$)" );
}

function extractOptions( text, options ) {
  var results = [], option, prevText = text, didAnswer = false;
  for ( var i = 0; i < options.length - 1; i++ ) { // Loop for each option except the "no answer" option
    option = options[ i ];
    text = prevText.replace( createRegExp( option ), "" );
    if ( text !== prevText ) {
      results.push( true );
      didAnswer = true;
    } else {
      results.push( false );
    }
    prevText = text;
  }
  results.push( !didAnswer );
  return results;
}

function normalizeOptions( arr ) {

  var newArr = [];
  var value;

  for ( var i = 1; i < arr.length; i++ ) {
    for ( var j = 0; j < arr[ i ].length; j++ ) {
      if ( !newArr[ j ] ) {
        newArr[ j ] = [];
      }
      value = arr[ i ][ j ].trim();
      if ( value ) {
        newArr[ j ].push( value );
      }
    }
  }

  // Add "no answer" option
  for ( var k = 0; k < newArr.length; k++ ) {
    newArr[ k ].push( null );
  }

  return newArr;

}

function Results() {
  this.data = null;
  this.options = null;
  this.headers = null;
}

Results.prototype = {

  constructor: Results,

  isReady: function() {
    return !!( this.data && this.options );
  },

  addData: function( file ) {
    this.data = file.data;
  },

  addOptions: function( file ) {
    this.options = normalizeOptions( file.data );
    this.headers = file.data[ 0 ];
  },

  processAnswers: function() {

    var data = this.data;
    var options = this.options;
    var answers = new Array( data.length - 1 );

    for ( var i = 1; i < data.length; i++ ) {

      answers[ i - 1 ] = new Array( options.length );

      for ( var j = 0; j < options.length; j++ ) {
        answers[ i - 1 ][ j ] = extractOptions( data[ i ][ j ], options[ j ] );
      }

    }

    this.answers = answers;

  },

  filter: function( fn ) {

    var headers = this.headers;
    var options = this.options;
    var answers = this.answers;

    var total = answers.length;
    var arr = answers.filter( fn );
    var many = arr.length;

    function eachOption( name ) {
      return { name: name + "", i: 0 };
    }

    var counts = headers.map( function( title, i ) {
      return {
        name: title,
        options: options[ i ].map( eachOption )
      };
    } );

    for ( var i = 0; i < many; i++ ) {
      for ( var j = 0; j < arr[ i ].length; j++ ) {
        for ( var k = 0; k < arr[ i ][ j ].length; k++ ) {
          if ( arr[ i ][ j ][ k ] ) {
            counts[ j ].options[ k ].i++;
          }
        }
      }
    }

    return {
      many: many,
      total: total,
      percentage: ( ( many / total ) * 100 ).toFixed( 2 ),
      arr: arr,
      counts: counts
    };
  }

};
