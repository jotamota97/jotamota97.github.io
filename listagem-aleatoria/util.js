// Math.random() [ 0, 1 [
// rand() [ a, b [
function rand( max, min ) {
  return Math.floor( Math.random() * ( max - min ) ) + min;
}

function sort( arr ) {

  var len = arr.length;
  var result = [];

  var i = len, tmp;
  while ( i-- ) {
    tmp = rand( 0, i + 1 );
    result.push( arr[ tmp ] );
    arr.splice( tmp, 1 );
  }

  return result;

}
