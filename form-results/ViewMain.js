window.ViewMain = mota.view.createClass( {

  initialize: function() {
    this.info = "";
    this.filtered = null;
    this.results = new Results();
    this.filtrando = false;
    this.bindMethodsToThis();
  },

  setInfo: function( info ) {
    this.info = info;
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

    setTimeout( function() {

      var filterFn = self.exp.toFunction();

      self.results.processAnswers();
      var f = self.filtered = self.results.filter( filterFn );

      self.filtrando = false;
      self.setInfo( "Filtragem feita. Mostrando " + f.many + " de " + f.total + " (" + f.percentage + "%)." );

    } );

    this.filtrando = true;
    this.setInfo( "Filtrando..." );

  },

  expression: function( exp ) {
    this.exp = exp;
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

          html = "<tr><td>" + option.name + "</td><td>" + percentage( option.i, many ) + "</td></tr>" + html;

        }

        html = "<tr style=\"font-weight: bold;\"><td>" + question.name + "</td></tr>" + html;

      }

    }

    return p( "div", null, [
      p( "div", null, "Ficheiro com dados:" ),
      p( ViewInputFile, { callback: this.fileSelect.bind( this, 0 ) } ),
      p( "div", null, "Ficheiro com as opções:" ),
      p( ViewInputFile, { callback: this.fileSelect.bind( this, 1 ) } ),
      p( "div", null, this.info ),
      p( ViewBooleanExpression, { results: this.results, expression: this.expression } ),
      p( "button", { onclick: this.filter, disabled: this.filtrando }, "Filtrar" ),
      p( "table", null,
        p( "tbody", {
          dangerousInnerHTML: { __html: html }
        } )
      )
    ] );
  }

} );
