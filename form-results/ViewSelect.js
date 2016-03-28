window.ViewSelect = mota.view.createClass( {

  initialize: function() {
    this.index = -1;
    this.bindMethodsToThis();
  },

  componentWillReceiveProps: function( props ) {
    this.index = props.index;
    this.el.selectedIndex = this.index;
  },

  onChange: function( e ) {
    this.index = e.target.selectedIndex;
    this.props.onchange.call( null, this.index );
  },

  componentDidMount: function() {
    this.el.selectedIndex = this.index;
  },

  render: function( p, props ) {
    return p( "select", { selectedIndex: this.index, onchange: this.onChange }, props.children );
  }

} );
