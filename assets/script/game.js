/*** Global Variables
***/

// Message Templates
var MESSAGE_WELCOME = "Welcome to the World Lucha Championship"
var MESSAGE_PRESS_START = "CLICK HERE TO START";
var MESSAGE_SELECT_PLAYER_CHARACTER = "Select your champion!";
var MESSAGE_SELECT_OPPONENT_CHARACTER = "Choose your opponent!";
var MESSAGE_ROUND = "Round $ROUND, FIGHT!";
var MESSAGE_PLAYER_ATTACKS = "$NAME attacks! $DAMAGE damage!";
var MESSAGE_OPPONENT_COUNTER_ATTACKS = "$NAME counter attacks! $DAMAGE damage!";
var MESSAGE_PLAYER_POWER_UP = "$NAME powers up! Attack power is now $ATTACK_POWER!";
var MESSAGE_KO = "$LOSER_NAME is out! $WINNER_NAME is the winner!";
var MESSAGE_WIN_GAME = "YOU WIN THE TOURNAMENT! CONGRATULATIONS!"
var MESSAGE_GAME_OVER = "GAME OVER"

// Game Status (last action performed)
GAME_STATUS_INITIALIZED = 0;
GAME_STATUS_STARTED = 1;
GAME_STATUS_SELECT_PLAYER_CHARACTER = 2;
GAME_STATUS_SELECTED_PLAYER_CHARACTER = 3;
GAME_STATUS_SELECT_OPPONENT_CHARACTER = 4;
GAME_STATUS_SELECTED_OPPONENT_CHARACTER = 5;
GAME_STATUS_FIGHT = 6;
GAME_STATUS_WON_MATCH = 7;
GAME_STATUS_LOST_MATCH = 8;
GAME_STATUS_WON_GAME = 9;
GAME_STATUS_GAME_OVER = 10;

// Character Status
CHARACTER_STATUS_OK = 0;
CHARACTER_STATUS_OUT = 1;

// Game
var game;    // [object Game]


/*** CONSTRUCTOR Character
***/

var Character = function( name , title , photo , healthPoints , baseAttackPower , attackPower , counterAttackPower ) {
    console.group( "CONSTRUCTOR Character" );
    
    this.name = name;
    this.title = title;
    this.photo = photo;
    this.status = CHARACTER_STATUS_OK;
    this.healthPoints = healthPoints;
    this.baseAttackPower = baseAttackPower;
    this.attackPower = attackPower;
    this.counterAttackPower = counterAttackPower;
    
    console.groupEnd();
};


/*** CONSTRUCTOR Game
***/

var Game = function( character0 , character1 , character2 , character3 ) {
    console.group( "CONSTRUCTOR Game" );

    this.status = GAME_STATUS_INITIALIZED;
    this.round = 0;
    this.characters = [ character0 , character1 , character2 , character3 ]
    this.playerCharacter = undefined;
    this.playerCharacterElementId = undefined;
    this.opponentCharacter = undefined;
    this.opponentCharacterElementId = undefined;
    this.messages = [ MESSAGE_WELCOME , MESSAGE_PRESS_START ];

    console.groupEnd();
}







/*** FUNCTION updateUIDisableFight 
***/

var updateUIDisableFight = function() {
    console.group( "FUNCTION updateUIDisableFight()" );

    $( "#game-fight" ).attr( "disabled" , "" );

    console.groupEnd();
}


/*** FUNCTION updateUIEnableFight 
***/

var updateUIEnableFight = function() {
    console.group( "FUNCTION updateUIEnableFight()" );

    $( "#game-fight" ).removeAttr( "disabled" );

    console.groupEnd();
}


/*** FUNCTION updateUISelectOpponentCharacter 
***/

var updateUISelectOpponentCharacter = function() {
    console.group( "FUNCTION updateUISelectOpponentCharacter()" );

    var selector = ( "#" + game.opponentCharacterElementId );
    console.logValue( "selector" , selector );
    $( "#game-vs" ).after( $( selector ) );

    console.groupEnd();
}


/*** FUNCTION updateUISelectPlayerCharacter 
***/

var updateUISelectPlayerCharacter = function() {
    console.group( "FUNCTION updateUISelectPlayerCharacter()" );

    var selector = ( "#" + game.playerCharacterElementId );
    console.logValue( "selector" , selector );
    $( "#game-vs" ).before( $( selector ) );

    console.groupEnd();
}


/*** FUNCTION updateUICharacter()
***/

var updateUICharacter = function( characterIndex ) {
    console.group( "FUNCTION updateUICharacter()" );
    // console.logValue( "characterIndex" , characterIndex );

    var character = game.characters[ characterIndex ];
    var characterSelector = "#game-character-$INDEX".replace( "$INDEX" , characterIndex );
    var nameSelector = ( characterSelector + "-name" );
    var titleSelector = ( characterSelector + "-title" );
    var photoSelector = ( characterSelector + "-photo" );
    var healthPointsSelector = ( characterSelector + "-healthPoints" );
    var attackPowerSelector = ( characterSelector + "-attackPower" );
    var counterAttackPowerSelector = ( characterSelector + "-counterAttackPower" );
    // console.logValue( "characterSelector" , characterSelector );
    // console.logValue( "nameSelector" , nameSelector );
    // console.logValue( "titleSelector" , titleSelector );
    // console.logValue( "healthPointsSelector" , healthPointsSelector );
    // console.logValue( "attackPowerSelector" , attackPowerSelector );
    // console.logValue( "counterAttackPowerSelector" , counterAttackPowerSelector );

    $( nameSelector ).text( character.name );
    $( titleSelector ).text( character.title );
    $( photoSelector ).attr( "src" , character.photo ).attr( "alt" , character.name );
    $( healthPointsSelector ).text( character.healthPoints.toString() );
    $( attackPowerSelector ).text( character.attackPower.toString() );
    $( counterAttackPowerSelector ).text( character.counterAttackPower.toString() );

    if ( character.status === CHARACTER_STATUS_OUT ) {
        $( characterSelector ).css( "display" , "none" );
    }

    console.groupEnd();
}


/*** FUNCTION updateUICharacters()
***/

var updateUICharacters = function( characterIndex ) {
    console.group( "FUNCTION updateUICharacters()" );

    game.characters.forEach(
        ( character , characterIndex ) => {
            updateUICharacter( characterIndex );
        }
    );

    console.groupEnd();
}


/*** FUNCTION updateUIMessages()
***/

var updateUIMessages = function() {
    console.group( "FUNCTION updateUIMessages()" );

    for(
        var messageIndex = ( game.messages.length - 4 ) , selectorIndex = 0 ;
        messageIndex < game.messages.length ;
        messageIndex++ , selectorIndex++
    ) {
        // console.logValue( "messageIndex" , messageIndex );
        // console.logValue( "selectorIndex" , selectorIndex );

        var message = game.messages[ messageIndex ];
        var selector = "#game-message-$INDEX".replace( "$INDEX" , selectorIndex );
        // console.logValue( "message" , message );
        // console.logValue( "selector" , selector );

        if ( message === undefined ) {
            $( selector ).html( "&nbsp;" );
        }
        else {
            $( selector ).text( message );
        }
    }

    console.groupEnd();
}


/*** FUNCTION updateUI()
***/

var updateUI = function() {
    console.group( "FUNCTION updateUI()" );

    updateUIMessages();
    updateUICharacters();

    console.groupEnd();
}







/*** FUNCTION isAllOpponentsOut()
***/

var isAllOpponentsOut = function() {
    console.group( "FUNCTION isAllOpponentsOut()" );

    result =
        game.characters.every(
            ( character , characterIndex ) => {
                console.logValue( "characterIndex" , characterIndex );
                console.logValue( "( character === game.playerCharacter )" , ( character === game.playerCharacter ) );
                console.logValue( "( character.status === CHARACTER_STATUS_OUT )" , ( character.status === CHARACTER_STATUS_OUT ) );
                return (
                    ( character === game.playerCharacter ) ||
                    ( character.status === CHARACTER_STATUS_OUT )
                );
            }
        )

    console.groupEnd();
    return result;
}


/*** FUNCTION doFight
***/

var doFight = function() {
    console.group( "FUNCTION doFight()" );

    // player attacks
    game.opponentCharacter.healthPoints =
        Math.max(
            0 ,
            ( game.opponentCharacter.healthPoints - game.playerCharacter.attackPower )
        );

    // add message
    var message =
        MESSAGE_PLAYER_ATTACKS.slice()
        .replace( '$NAME' , game.playerCharacter.name )
        .replace( '$DAMAGE' , game.playerCharacter.attackPower );
    game.messages.push( message );

    // check opponent
    if ( game.opponentCharacter.healthPoints === 0 ) {
        // set opponent status
        game.opponentCharacter.status = CHARACTER_STATUS_OUT;

        // add message
        var message =
            MESSAGE_KO.slice()
            .replace( '$LOSER_NAME' , game.opponentCharacter.name )
            .replace( '$WINNER_NAME' , game.playerCharacter.name );
        game.messages.push( message );
            
        // set game status
        game.status = GAME_STATUS_WON_MATCH;
    }

    // check game status
    if ( game.status === GAME_STATUS_WON_MATCH ) {
        // check opponents
        if ( isAllOpponentsOut() ) {
            // set game status
            game.status = GAME_STATUS_WON_GAME;
        }

        if ( game.status === GAME_STATUS_WON_GAME ) {
            // add message
            var message = MESSAGE_WIN_GAME.slice();
            game.messages.push( message );
        }
    }
    else {
        // opponent counter attacks
        game.playerCharacter.healthPoints =
            Math.max(
                0 ,
                ( game.playerCharacter.healthPoints - game.opponentCharacter.counterAttackPower )
            );

        // add message
        var message =
            MESSAGE_OPPONENT_COUNTER_ATTACKS.slice()
            .replace( '$NAME' , game.opponentCharacter.name )
            .replace( '$DAMAGE' , game.opponentCharacter.counterAttackPower );
        game.messages.push( message );

        // check player
        if ( game.playerCharacter.healthPoints === 0 ) {
            // set player status
            game.playerCharacter.status = CHARACTER_STATUS_OUT;

            // add message
            message =
                MESSAGE_KO.slice()
                .replace( '$LOSER_NAME' , game.playerCharacter.name )
                .replace( '$WINNER_NAME' , game.opponentCharacter.name );   
            game.messages.push( message );

            // set game status
            game.status = GAME_STATUS_LOST_MATCH;
        }

        // check game status
        if ( game.status === GAME_STATUS_LOST_MATCH ) {
            // add message
            message = MESSAGE_GAME_OVER.slice();
            game.messages.push( message );

            // set game status
            game.status = GAME_STATUS_GAME_OVER;
        }
        else {
            // player power ups
            game.playerCharacter.attackPower = ( game.playerCharacter.attackPower + game.playerCharacter.baseAttackPower );
            
            // add message
            message =
                MESSAGE_PLAYER_POWER_UP.slice()
                .replace( "$NAME" , game.playerCharacter.name )
                .replace( "$ATTACK_POWER" , game.playerCharacter.attackPower.toString() );
            game.messages.push( message );
        }
    }

    console.logValue( game );
    console.groupEnd();
};


/*** FUNCTION doStartMatch()
***/

var doStartMatch = function() {
    console.group( "FUNCTION doStartMatch()" );

    // set round number
    game.round = 1;
    
    // add message
    var message =
        MESSAGE_ROUND.slice()
        .replace( "$ROUND" , game.round.toString() );
    game.messages.push( message );

    // set game status
    game.status = GAME_STATUS_FIGHT;

    console.logValue( "game" , game );
    console.groupEnd();
}


/*** FUNCTION doSelectOpponentCharacter
***/

var doSelectOpponentCharacter = function( elementId ) {
    console.group( "FUNCTION doSelectOpponentCharacter()" );
    
    // set opponent character
    var characterIndex = parseInt( elementId.split( "game-character-" )[1] );
    console.logValue( "characterIndex" , characterIndex );
    game.opponentCharacter = game.characters[ characterIndex ];
    game.opponentCharacterElementId = elementId;

    // set game status
    game.status = GAME_STATUS_SELECTED_OPPONENT_CHARACTER;

    console.logValue( "game" , game );
    console.groupEnd();
}


/*** FUNCTION doPromptSelectOppnentCharacter()
***/

var doPromptSelectOppnentCharacter = function() {
    console.group( "FUNCTION doPromptSelectOppnentCharacter()" );

    // add message
    var message = MESSAGE_SELECT_OPPONENT_CHARACTER.slice();
    game.messages.push( message );
    
    // set game status
    game.status = GAME_STATUS_SELECT_OPPONENT_CHARACTER;

    console.logValue( "game" , game );
    console.groupEnd();

}


/*** FUNCTION doSelectPlayerCharacter()
***/

var doSelectPlayerCharacter = function( elementId ) {
    console.group( "FUNCTION doSelectPlayerCharacter()" );
    
    // set player character
    var characterIndex = parseInt( elementId.split( "game-character-" )[ 1 ] );
    console.logValue( "characterIndex" , characterIndex );
    game.playerCharacter = game.characters[ characterIndex ];
    game.playerCharacterElementId = elementId;

    // set game status
    game.status = GAME_STATUS_SELECTED_PLAYER_CHARACTER;

    console.logValue( "game" , game );
    console.groupEnd();
}


/*** FUNCTION doPromptSelectPlayerCharacter()
***/

var doPromptSelectPlayerCharacter = function() {
    console.group( "FUNCTION doPromptSelectPlayerCharacter()" );

    // add message
    var message = MESSAGE_SELECT_PLAYER_CHARACTER.slice();
    game.messages.push( message );
    
    // set game status
    game.status = GAME_STATUS_SELECT_PLAYER_CHARACTER;

    console.logValue( "game" , game );
    console.groupEnd();

}


/*** FUNCTION doStartGame()
***/

var doStartGame = function() {
    console.group( "FUNCTION doStartGame()" );

    // set game status
    game.status = GAME_STATUS_STARTED;

    console.logValue( "game" , game );
    console.groupEnd();
}


/*** FUNCTION doInitialize()
***/

var doInitialize = function() {
    console.group( "FUNCTION doInitialize()" );

    var laSombraCharacter = new Character(
        "La Sombra" ,
        "El Centinela del Espacio" ,
        "assets/images/la-sombra.jpg" ,
        110 ,
        5 ,
        9 ,
        9
    );
    var mascaraDoradaCharacter = new Character(
        "Máscara Dorada" ,
        "El Chico de 100 Kilates" ,
        "assets/images/mascara-dorada.jpg" ,
        90 ,
        3 ,
        8 ,
        10
    );
    var rushCharacter = new Character(
        "Ulitmo Guerrero" ,
        "El Ultimo de su Extirpe" ,
        "assets/images/ultimo-guerrero.jpg" ,
        120 ,
        7 ,
        10 ,
        8
    );
    var voladorCharacter = new Character(
        "Atlantis" ,
        "El Idolo de los Niños" ,
        "assets/images/atlantis.jpg" ,
        110 ,
        4 ,
        8 ,
        11
    );
    game = new Game(
        laSombraCharacter ,
        mascaraDoradaCharacter ,
        rushCharacter ,
        voladorCharacter
    );
    
    console.logValue( "game" , game );
    console.groupEnd();
}










/*** FUNCTION handleClickFight()
***/

var handleClickFight = function( event ) {
    console.group( "FUNCTION handleClickFight()" );

    if ( game.status === GAME_STATUS_FIGHT ) {
        doFight();
        updateUI();

        if ( game.status === GAME_STATUS_WON_MATCH ) {
            updateUIDisableFight();
            doPromptSelectOppnentCharacter();
            updateUI();
        }
        else if ( game.status === GAME_STATUS_WON_GAME ) {
            updateUIDisableFight();
            updateUI();
        }
    }

    console.groupEnd();
}


/*** FUNCTION handleClickCharacter()
***/

var handleClickCharacter = function( event ) {
    console.group( "FUNCTION handleClickCharacter()" );

    var elementId = $( this ).attr( "id" );
    console.logValue( "elementId" , elementId );

    if ( game.status === GAME_STATUS_SELECT_PLAYER_CHARACTER ) {
        doSelectPlayerCharacter( elementId );
        updateUISelectPlayerCharacter();
        doPromptSelectOppnentCharacter();
        updateUI();
    }

    if (
        ( game.status === GAME_STATUS_SELECT_OPPONENT_CHARACTER ) &&
        ( elementId !== game.playerCharacterElementId )
    ) {
        doSelectOpponentCharacter( elementId );
        updateUISelectOpponentCharacter();
        updateUIEnableFight();
        doStartMatch();
        updateUI();
    }

    console.groupEnd();
}


/*** FUNCTION handleClickMessages()
***/

var handleClickMessages = function( event ) {
    console.group( "FUNCTION handleClickMessages()" );

    if ( game.status === GAME_STATUS_INITIALIZED ) {
        doStartGame();
        doPromptSelectPlayerCharacter();
        updateUI();
    }

    console.groupEnd();
}


/*** FUNCTION handleReady()
***/

var handleReady = function() {
    console.group( "FUNCTION handleReady()" );

    doInitialize();
    updateUI();

    $( "#game-messages" ).on( "click" , handleClickMessages );
    $( ".game-character" ).on( "click" , handleClickCharacter );
    $( "#game-fight").on( "click" , handleClickFight );
    
    console.groupEnd();
}


/*** Execute when DOM is fully loaded
***/

$( handleReady );
