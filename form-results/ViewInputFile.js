window.ViewInputFile = mota.view.createClass( {

  initialize: function() {
    this.bindMethodsToThis();
  },

  shouldComponentUpdate: function() {
    return false;
  },

  styles: {
    dropFile: mota.view.styleSet( {
      border: "1px red solid",
      padding: 5
    } )
  },

  handleFileSelect: function( e ) {
    this.props.callback( ( e.dataTransfer || e.target ).files[ 0 ] );
  },

  handleDragOver: function( e ) {
    e.dataTransfer.dropEffect = "copy";
  },

  handleClick: function( e ) {
    e.target.value = null;
  },

  render: function( p ) {

    if ( !window.File || !window.FileReader || !window.FileList || !window.Blob ) {
      return p( "div", null, "The File APIs are not fully supported in this browser." );
    }

    var style = this.styles.dropFile;

    return p( "div", { ondragover: this.handleDragOver, ondrop: this.handleFileSelect, style: style },
      "Drop here or select: ",
      p( "input", { type: "file", onclick: this.handleClick, onchange: this.handleFileSelect } )
    );

  }

} );
