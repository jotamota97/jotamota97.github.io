window.ViewBooleanExpression = mota.view.createClass( {

  initialize: function() {
    this.questionIdx = -1;
    this.optionIdx = -1;
    this.expression = new Expression();
    this.props.expression( this.expression );
    this.bindMethodsToThis();
  },

  style: { border: "1px red solid" },

  componentWillReceiveProps: function( props ) {

    var options = props.results.options;

    if ( this.questionIdx === -1 ) {
      this.questionIdx = -1;
      this.optionIdx = -1;
    } else if ( this.questionIdx >= options.length || this.optionIdx >= options[ this.questionIdx ].length ) {
      this.questionIdx = -1;
      this.optionIdx = -1;
      this.expression.reset();
    }

  },

  questionChange: function( idx ) {
    this.questionIdx = idx;
    this.optionIdx = -1;
    this.update();
  },

  optionChange: function( idx ) {
    this.optionIdx = idx;
    this.update();
  },

  submit: function() {
    this.expression.addValue( this.questionIdx, this.optionIdx );
    console.log( {
      questionIdx: this.questionIdx,
      optionIdx: this.optionIdx
    } );
    this.update();
  },

  open: function() {
    this.expression.open();
    this.update();
  },

  close: function() {
    this.expression.close();
    this.update();
  },

  addAnd: function() {
    this.expression.addAnd();
    this.update();
  },

  addOr: function() {
    this.expression.addOr();
    this.update();
  },

  not: function() {
    this.expression.not();
    this.update();
  },

  showAll: function() {
    this.expression.all();
    this.update();
  },

  backspace: function() {
    this.expression.backspace();
    this.update();
  },

  reset: function() {
    this.expression.reset();
    this.update();
  },

  renderEachOption: function( option ) {
    return mota.view.create( "option", null, option + "" );
  },

  render: function( p, props ) {

    var r = props.results;
    var options = r.options;
    var headers = r.headers;

    if ( !r.isReady() ) {
      return p( "div" );
    }

    var idx = this.questionIdx;
    var opts = options[ idx ];

    return p( "div", { style: this.style }, [
      p( ViewSelect, { index: this.questionIdx, onchange: this.questionChange }, headers.map( this.renderEachOption ) ),
      opts && p( ViewSelect, { key: "q" + idx, index: this.optionIdx, onchange: this.optionChange }, opts.map( this.renderEachOption ) ),
      p( "button", { onclick: this.submit }, "Add it" ),
      p( "button", { onclick: this.addAnd }, "AND" ),
      p( "button", { onclick: this.addOr }, "OR" ),
      p( "button", { onclick: this.not }, "NOT" ),
      p( "button", { onclick: this.open }, " ( " ),
      p( "button", { onclick: this.close }, " ) " ),
      p( "button", { onclick: this.showAll }, "Show all" ),
      p( "button", { onclick: this.backspace }, "BackSpace" ),
      p( "button", { onclick: this.reset }, "Reset" ),
      p( "div", null, "Expression: " + this.expression.toString() )
    ] );

  }

} );
