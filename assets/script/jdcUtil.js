/*** FUNCTION Array.equals()
***/

if ( Array.prototype.equals ) {
    console.warn( "Overriding existing implementation of `Array.prototype.equals()`." );
}
Array.prototype.equals = function( other ) {
    return (
        ( this.length === other.length ) &&
        this.every(
            ( element , index ) => {
                return element === other[ index ];
            }
        )
    )
}


/*** FUNCTION console.logValue()
***/

if ( console.logValue ) {
    console.warn( "Overriding existing implementation of `console.logValue()`." );
}
console.logValue = function( label , value ) {
    var valueString;

    if ( typeof value === "object" ) {
        valueString = value;
        // valueString = JSON.parse( JSON.stringify( value ) );
    }
    else if ( typeof value === "string" ) {
        valueString = ( "\"" + value + "\"" );
    }
    else {
        valueString = value;
    }
    console.log(
        Object.prototype.toString.call( value ) ,
        label ,
        valueString
    );
}


/*** FUNCTION getRqndomNumber()
***/

var getRandomNumber = function( cardinality ) {
    var result = ( Math.floor( Math.random() * cardinality ) );
    return result;
}


// export { getRandomNumber };