/*** Global Variables
***/

// Message Templates
var MESSAGE_GAME_NEW = "CLICK HERE TO START";
var MESSAGE_CHOOSE_PLAYER = "Welcome to the World Lucha Championship! Select your champion!"
var MESSAGE_CHOOSE_OPPONENT = "Choose your opponent!"
var MESSAGE_PLAYER_ATTACKS = "$NAME attacks! $DAMAGE damage!";
var MESSAGE_OPPONENT_COUNTER_ATTACKS = "$NAME counter attacks! $DAMAGE damage!";
var MESSAGE_PLAYER_POWER_UP = "$NAME powers up! Attack power is now $ATTACK_POWER!";
var MESSAGE_KO = "$LOSER_NAME is out! $WINNER_NAME is the winner!";

// Game Status
GAME_NEW = 0;
GAME_STATUS_START = 1;
GAME_STATUS_CHOOSE_PLAYER_CHARACTER = 2;
GAME_STATUS_CHOOSE_OPPONENT_CHARACTER = 3;
GAME_STATUS_FIGHT = 4;
GAME_STATUS_WIN_FIGHT = 5;
GAME_STATUS_LOSE_FIGHT = 6;
GAME_STATUS_WIN = 7;

// Character Status
CHARACTER_STATUS_OK = 0;
CHARACTER_STATUS_OUT = 1;

/*** CONSTRUCTOR Character
***/

var Character = function( name , title , healthPoints , baseAttackPower , attackPower , counterAttackPower ) {
    this.name = name;
    this.title = title;
    this.status = CHARACTER_STATUS_OK;
    this.healthPoints = healthPoints;
    this.baseAttackPower = baseAttackPower;
    this.attackPower = attackPower;
    this.counterAttackPower = counterAttackPower;
};


/*** CONSTRUCTOR Game
***/

var Game = function( character1 , character2 , character3 , character4 ) {
    this.status = GAME_NEW;
    this.character1 = character1;
    this.character2 = character2;
    this.character3 = character3;
    this.character4 = character4;
    this.playerCharacter = undefined;
    this.opponentCharacter = undefined;
    this.messages = [ MESSAGE_GAME_NEW ];
}


/*** FUNCTION doChoosePlayerCharacter
***/

var doChoosePlayerCharacter = function( game , playerCharacter ) {
    console.group( "FUNCTION doChoosePlayerCharacter()" );
    console.logValue( "game" , game );
    console.logValue( "playerCharacter" , playerCharacter );
    
    game.status = GAME_STATUS_CHOOSE_PLAYER_CHARACTER;
    game.playerCharacter = playerCharacter;

    console.logValue( "game" , game );
    console.groupEnd();
}


/*** FUNCTION doChooseOpponentCharacter
***/

var doChooseOpponentCharacter = function( game , opponentCharacter ) {
    console.group( "FUNCTION doChooseOpponentCharacter()" );
    console.logValue( "game" , game );
    console.logValue( "opponentCharacter" , opponentCharacter );
    
    game.status = GAME_STATUS_CHOOSE_OPPONENT_CHARACTER;
    game.opponentCharacter = opponentCharacter;
    
    console.logValue( "game" , game );
    console.groupEnd();
}


/*** FUNCTION doFight
***/

var doFight = function( game ) {
    console.group( "FUNCTION doFight()" );
    console.logValue( game );

    // variables
    var message;

    // check game status
    if ( 
        ( game.status === GAME_STATUS_CHOOSE_OPPONENT_CHARACTER ) ||
        ( game.status === GAME_STATUS_FIGHT )
    )
    {
        // set game status
        game.status = GAME_STATUS_FIGHT;

        // player attacks
        message =
            MESSAGE_PLAYER_ATTACKS
            .replace( '$NAME' , game.playerCharacter.name )
            .replace( '$DAMAGE' , game.playerCharacter.attackPower );
        console.log( message );
        game.messages.push( message );
        game.opponentCharacter.healthPoints =
            Math.max(
                0 ,
                ( game.opponentCharacter.healthPoints - game.playerCharacter.attackPower )
            );
        console.logValue( "game.opponentCharacter.healthPoints" , game.opponentCharacter.healthPoints );

        // check opponent status
        if ( game.opponentCharacter.healthPoints ===  0 ) {
            // player wins fight
            message =
                MESSAGE_KO
                .replace( '$LOSER_NAME' , game.opponentCharacter.name )
                .replace( '$WINNER_NAME' , game.playerCharacter.name );
            console.log( message );
            game.messages.push( message );
            // set opponent status
            game.opponentCharacter.status = CHARACTER_STATUS_OUT;
            // set game status
            game.status = GAME_STATUS_WIN_FIGHT;
        }
        else {
            // opponent counter attacks
            message =
                MESSAGE_OPPONENT_COUNTER_ATTACKS
                .replace( '$NAME' , game.opponentCharacter.name )
                .replace( '$DAMAGE' , game.opponentCharacter.counterAttackPower );
            console.log( message );
            game.messages.push( message );
            game.playerCharacter.healthPoints =
                Math.max(
                    0 ,
                    ( game.playerCharacter.healthPoints - game.opponentCharacter.counterAttackPower )
                );
            console.logValue( "game.playerCharacter.healthPoints" , game.playerCharacter.healthPoints );

            // check player status
            if ( game.playerCharacter.healthPoints === 0 ) {
                // player loses fight
                message =
                    MESSAGE_KO
                    .replace( '$LOSER_NAME' , game.playerCharacter.name )
                    .replace( '$WINNER_NAME' , game.opponentCharacter.name );   
                console.log( message );
                game.messages.push( message );
                // set player status
                game.playerCharacter.status = CHARACTER_STATUS_OUT;
                // set game status
                game.status = GAME_STATUS_LOSE_FIGHT;
            }
            else {
                // player powers up
                newAttackPower = ( game.playerCharacter.attackPower + game.playerCharacter.baseAttackPower );
                message =
                    MESSAGE_PLAYER_POWER_UP
                    .replace( "$NAME" , game.playerCharacter.name )
                    .replace( "$ATTACK_POWER" , newAttackPower.toString() );
                console.log( message );
                game.messages.push( message );
                game.playerCharacter.attackPower = newAttackPower;
            }
        }
    }

    // check game status
    /*
    if (
        ( game.status = GAME_STATUS_WIN_FIGHT ) &&
        ( )
    ) {
        // all opponents are defeated
    }
    */

    console.logValue( game );
    console.groupEnd();
};


/*** FUNCTION handleFightEvent
***/
var handleFightEvent = function( event ) {
    console.group( "FUNCTION handleFightEvent()" );
    console.logValue( "event" , event );

    console.groupEnd;
}


/*** FUNCTION updateUIMessage
***/


/*** FUNCTION updateUI
***/


/*** Initialize
***/

var laSombraCharacter = new Character(
    "La Sombra" ,
    "El Centinela del Espacio" ,
    110 ,
    5 ,
    9 ,
    9
);

var atlantisCharacter = new Character(
    "Atlantis" ,
    "El Idolo de los Niños" ,
    90 ,
    6 ,
    8 ,
    10
);

var rushCharacter = new Character(
    "Rush" ,
    "El Toro Blanco" ,
    120 ,
    7 ,
    10 ,
    8
);

var voladorCharacter = new Character(
    "Volador" ,
    "El Depredador del Aire" ,
    110 ,
    4 ,
    8 ,
    11
);

var game = new Game(
    laSombraCharacter ,
    atlantisCharacter ,
    rushCharacter ,
    voladorCharacter
);


/*** Text
***/

console.logValue( "laSombraCharacter" , laSombraCharacter );
console.logValue( "atlantisCharacter" , atlantisCharacter );
console.logValue( "rushCharacter" , rushCharacter );
console.logValue( "voladorCharacter" , voladorCharacter );
console.logValue( "game" , game );
// doChoosePlayerCharacter( game , laSombraCharacter );
// doChooseOpponentCharacter( game , atlantisCharacter );
// doFight( game );
// doFight( game );
// doFight( game );
// console.logValue( "game.messages" , game.messages );
