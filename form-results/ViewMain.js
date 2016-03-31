window.ViewMain = mota.view.createClass( {

  initialize: function() {
    this.info = "";
    this.filtered = null;
    this.results = new Results();
    this.filtrando = false;
    this.bindMethodsToThis();
  },

  styleInfoBox: {
    position: "fixed",
    bottom: 30,
    right: 30,
    width: 500,
    height: 90,
    background: "#eee",
    border: "2px solid #ddd"
  },

  setInfo: function( info ) {
    this.info = info + " (" + new Date().toGMTString() + ")";
    this.update();
  },

  onParseComplete: function( num, results ) {
    if ( results.errors.length ) {
      console.log( results.errors );
      // return;
    }
    if ( num === 0 ) {
      this.results.addData( results );
    } else {
      this.results.addOptions( results );
    }
    this.setInfo( "Ficheiro carregado e lido." );
  },

  onParseError: function( e ) {
    console.log( e );
    this.setInfo( "Error parsing CSV file." );
  },

  fileSelect: function( num, file ) {
    this.setInfo( "Carregando ficheiro..." );
    Papa.parse( file, {
      error: this.onParseError,
      complete: this.onParseComplete.bind( this, num ),
      skipEmptyLines: true
    } );
  },

  filter: function() {

    var self = this;
    var filterFn = this.exp.toFunction();

    if ( !filterFn ) {
      this.setInfo( "Expressão inválida." );
      return;
    }

    this.filtrando = true;
    this.setInfo( "Filtrando..." );

    setTimeout( function() {

      var f, failed = false;

      self.results.processAnswers();

      try {
        f = self.filtered = self.results.filter( filterFn );
      } catch ( err ) {
        failed = true;
      }

      self.filtrando = false;

      if ( failed ) {
        self.setInfo( "Ocorreu um erro. É provável que a expressão esteja mal formatada." );
        return;
      }

      self.setInfo( "Filtragem feita. Mostrando " + f.many + " de " + f.total + " (" + f.percentage + "%)." );

    } );

  },

  expression: function( exp ) {
    this.exp = exp;
  },

  closeInfoBox: function( e ) {
    e.preventDefault();
    this.info = "";
    this.update();
  },

  render: function( p ) {

    function percentage( many, total ) {
      return total ? ( ( many / total ) * 100 ).toFixed( 1 ) : "0";
    }

    var filtered = this.filtered;
    var html = "";

    if ( filtered ) {

      var many = filtered.many;
      var counts = filtered.counts;
      var i = counts.length;

      while ( i-- ) {

        var question = counts[ i ];
        var options = question.options;
        var j = options.length;

        while ( j-- ) {

          var option = options[ j ];

          html = "<tr><td>" + option.name + "</td><td>" + option.i + " (" + percentage( option.i, many ) + "%)</td></tr>" + html;

        }

        html = "<tr style=\"font-weight: bold;\"><td>" + question.name + "</td></tr>" + html;

      }

    }

    return p( "div", null, [
      p( "div", null, "Ficheiro com dados:" ),
      p( ViewInputFile, { callback: this.fileSelect.bind( this, 0 ) } ),
      p( "div", null, "Ficheiro com as opções:" ),
      p( ViewInputFile, { callback: this.fileSelect.bind( this, 1 ) } ),
      p( ViewBooleanExpression, { results: this.results, expression: this.expression } ),
      this.results.isReady() && p( "button", { onclick: this.filter, disabled: this.filtrando }, "Filtrar" ),
      p( "table", null,
        p( "tbody", {
          dangerousInnerHTML: { __html: html }
        } )
      ),
      this.info && p( "div", { style: this.styleInfoBox }, [
        p( "p", null, this.info ),
        p( "a", { onclick: this.closeInfoBox, style: { fontWeight: "bold" } }, "Close" )
      ] )
    ] );
  }

} );
