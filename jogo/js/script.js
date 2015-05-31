(function(){

  var hacksOn = false;

  function between( x , a , b ) {

    if ( x > a && x < b ) {
      return x;
    }

    if ( x < a ) {
      return a;
    }

    if ( x > b ) {
      return b;
    }

  }

  function baseRad( x ) {
    return Math.floor( Math.random() * x + 1 );
  }

  function init() {
    $obj.css( {
      left: 10,
      top: 600/2 - $obj.height()/2
    } );
  }

  var end1 = function() {
    init();
    $( "#dialog3" ).dialog();
  };

  var end2 = function() {

    init();

    var r = baseRad( 8 );

    console.log( r === 3 ? true : r );

    if ( r === 3 ) {
      $( "#dialog4" ).dialog();
    } else {
      $( "#dialog2" ).dialog();
    }

  };

  var $obj = $( "#obj" ).draggable( {
    containment: "parent",
    drag: function( e ) {

      var elemFromP;
      var rect = this.getClientRects()[ 0 ];

      var arr = [
        [ rect.left + rect.width , rect.top ],
        [ rect.left + rect.width , rect.top + rect.height ],
        [ rect.left              , rect.top ],
        [ rect.left              , rect.top + rect.height ],
      ];

      for ( var i = 0 ; i < arr.length ; i++ ) {
        elemFromP = document.elementFromPoint(
          arr[ i ][ 0 ], arr[ i ][ 1 ]
        );
        if ( elemFromP ) {
          if ( elemFromP.className === "obstacle" && !hacksOn ) {
            setTimeout( end1 );
            return false;
          }
          if ( elemFromP.id === "end" ) {
            setTimeout( end2 );
            return false;
          }
        }
      }

    },
    stop: init
  } );

  init();

  document.body.onselectstart = function( e ) {
    e.preventDefault();
  };

  $( "#dialog" ).dialog();

  this.hacks = function( on ) {
    return ( hacksOn = !!on );
  };

})();

// http://jsfiddle.net/knam8/
/*if (
  rect.left < rect2.left + rect2.width &&
  rect.left + rect.width > rect2.left &&
  rect.top < rect2.top + rect2.height &&
  rect.height + rect.top > rect2.top
) {
  console.log( "collision detected!" );
}*/
