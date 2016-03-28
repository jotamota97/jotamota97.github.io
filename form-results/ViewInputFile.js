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
    e.stopPropagation();
    e.preventDefault();
    this.props.callback( ( e.dataTransfer || e.target ).files[ 0 ] );
  },

  handleDragOver: function( e ) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  },

  handleClick: function( e ) {
    e.target.value = null;
  },

  render: function( p ) {

    if ( !window.File || !window.FileReader || !window.FileList || !window.Blob ) {
      return p( "div", null, "The File APIs are not fully supported in this browser." );
    }

    var ondragover = this.handleDragOver;
    var onclick = this.handleClick;
    var fileSelect = this.handleFileSelect;
    var style = this.styles.dropFile;

    return p( "div", { ondragover: ondragover, ondrop: fileSelect, style: style },
      "Drop here or select: ",
      p( "input", { type: "file", onclick: onclick, onchange: fileSelect } )
    );

  }

} );
