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

  var tmp = {
    left: 0,
    top: 0
  };

  function random( a , b ) {

    if ( a ) {
      return between( baseRad( 160 ) * tmp.left++ , 65 , 720 );
    } else {
      return between( baseRad( 120 ) * tmp.top++ , 10 , 520 );
    }

  }

  // 800/5 = 160
  // 160, 320, 480, 640, 800
  // 600/5 = 120
  // 120, 240, 360, 480, 600

  function init() {
    $obj.css( {
      left: 10,
      top: 600/2 - $obj.height()/2
    } );
  }

  /*var rects = [
    { left: random( true ), top: random( false , 480 ), width: 60, height: 50 },
    { left: random( true , 160 ), top: random( false , 360 ), width: 60, height: 50 },
    { left: random( true , 320 ), top: random( false , 240 ), width: 60, height: 50 },
    { left: random( true , 480 ), top: random( false , 120 ), width: 60, height: 50 },
    { left: random( true , 640 ), top: random( false ), width: 60, height: 50 },

    { left: random( true , 640 ), top: random( false , 480 ), width: 60, height: 50 },
    { left: random( true , 480 ), top: random( false , 360 ), width: 60, height: 50 },
    { left: random( true , 320 ), top: random( false , 240 ), width: 60, height: 50 },
    { left: random( true , 160 ), top: random( false , 120 ), width: 60, height: 50 },
    { left: random( true ), top: random( false ), width: 60, height: 50 }
  ];

  var i = rects.length;
  var rectsElems = Array( i );

  while ( i-- ) {
    rectsElems[ i ] = $( "<div class=\"obstacle\"></div>" )
      .css( rects[ i ] ).appendTo( "#container" )[ 0 ];
  }*/

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

    }
  } );

  init();

  document.body.onselectstart = function( e ) {
    e.preventDefault();
  };

  $( "#dialog" ).dialog();

  /*$( ".obstacle" ).draggable( {
    containment: "parent"
  } );*/

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
