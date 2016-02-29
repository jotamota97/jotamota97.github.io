var ViewMain = mota.view.createClass( {

  initialize: function() {
    this.bindMethodsToThis();
    this._loading = false;
    this.result = [];
    this.data = [];
  },

  updateResult: function( result ) {
    this.result = result;
    this.loading( false );
    this.update();
  },

  loading: function( l ) {
    this._loading = l;
    this.update();
  },

  onParseComplete: function( results ) {
    /*if ( results.errors.length ) {
      return this.updateResult( "Errors." );
    }*/
    var self = this, data = results.data;
    setTimeout( function() {
      var extract = [];
      for ( var i = 0; i < data.length; i++ ) {
        extract[ i ] = data[ i ][ 0 ];
      }
      self.data = extract;
      self.sort();
    } );
  },

  onParseError: function() {
    this.updateResult( [ "Error parsing CSV file." ] );
  },

  fileSelect: function( file ) {
    this.loading( true );
    Papa.parse( file, {
      error: this.onParseError,
      complete: this.onParseComplete,
      skipEmptyLines: true
    } );
  },

  sort: function() {
    this.updateResult( this.data = sort( this.data ) );
  },

  render: function( p ) {
    return p( "div", null, [
      p( ViewInputFile, { callback: this.fileSelect } ),
      this.data.length ? p( "button", { onclick: this.sort }, "Sort again" ) : null,
      p( "div", null, this._loading ? "Loading..." : "\n" ),
      this.result.length ? p( "pre", { style: { width: 500, height: 300 } }, this.result.join( "\n" ) ) : null
    ] );
  }

} );
