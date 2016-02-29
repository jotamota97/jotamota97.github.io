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

  selectText: function() {
    var text = document.getElementById( "result" ), range, selection;
    if ( document.body.createTextRange ) {
      range = document.body.createTextRange();
      range.moveToElementText( text );
      range.select();
    } else if ( window.getSelection ) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents( text );
      selection.removeAllRanges();
      selection.addRange( range );
    }
  },

  render: function( p ) {
    var show = !!this.result.length;
    return p( "div", null, [
      p( ViewInputFile, { callback: this.fileSelect } ),
      show && p( "button", { onclick: this.sort }, "Ordenar aleatóriamente" ),
      show && p( "i", null, "Vai usar o resultado obtido e não o conteúdo do ficheiro." ),
      p( "div", null, this._loading ? "A carregar..." : "\n" ),
      show && p( "button", { onclick: this.selectText }, "Selecionar texto" ),
      show && p( "pre", {
        id: "result", style: { width: 500, height: 300 }
      }, this.result.join( "\n" ) )
    ] );
  }

} );
