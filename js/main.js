var score;
var cardsmatched;
var ui = $("#gameUI");
var uiIntro = $("#gameIntro");
var uiStats = $("#gameStats");
var uiComplete = $("#gameComplete");
var uiCards = $("#cards");
var uiScore = $(".gameScore");
var uiReset = $(".gameReset");
var uiPlay = $("#gamePlay");
var uiTimer = $("#timer");

var matchingGame = {};
matchingGame.deck = ['nopales', 'grilledfish', 'tripa', 'bajafish', 'barbacoa', 'carneasada', 'carnitas', 'chorizoasado', 'shrimptaco', 'decabeza', 'alpastor', 'dorados', 'lengua', 'chicharron', 'sudados', 'polloasado'];

$(function() {
    init();
});

function init() {
    uiComplete.hide();
    uiCards.hide();
    playGame = false;
    uiPlay.click(function(e) {
        e.preventDefault();
        uiIntro.hide();
        startGame();
    });

    uiReset.click(function(e) {
        e.preventDefault();
        uiComplete.hide();
        reStartGame();

    });
}

function startGame() {
    uiTimer.show();
    uiScore.html("0 seconds");
    uiStats.show();
    uiCards.show();
    var masterDeck = [];
    var numbersUsed = [];
    score = 0;
    cardsmatched = 0;
    if (playGame == false) {
        playGame = true;
        var n = 0;
        while ( n < 12) {
            var randomCard = Math.floor(Math.random() * (16 - 0) + 0);
            console.log(numbersUsed);
            if ( numbersUsed.includes(randomCard) == false) {
                numbersUsed.push(randomCard);
                masterDeck.push(matchingGame.deck[randomCard]);
                masterDeck.push(matchingGame.deck[randomCard]);
                console.log(masterDeck);
                n++;  
            }
        }


        var shuffledDeck = masterDeck.sort(shuffle);
        for (var i = 0; i < 23; i++) {
            $(".card:first-child").clone().appendTo("#cards");
            //   console.log (uiCards);
        }
        uiCards.children().each(function(index) {
            // console.log(index);
            // console.log(this);
            $(this).css({
                "left": ($(this).width() + 20) * (index % 6),
                "top": ($(this).height() + 20) * Math.floor(index / 6)
            });
            var pattern = masterDeck.pop();
            // console.log(pattern);
            $(this).find(".back").addClass(pattern);
            $(this).attr("data-pattern", pattern);
            $(this).click(selectCard);
        });
        timer();
    }
}

function timer() {
    if (playGame) {
        scoreTimeout = setTimeout(function() {
            uiScore.html(++score, "seconds");
            timer();
        }, 1000);
    };
};

function shuffle() {
    return 0.5 - Math.random();
}

function selectCard() {
    if ($(".card-flipped").size() > 1) {
        return;
    }
    $(this).addClass("card-flipped");
    if ($(".card-flipped").size() == 2) {
        setTimeout(checkPattern, 1000);
    };
};

function checkPattern() {
    if (isMatchPattern()) {
        $(".card-flipped").removeClass("card-flipped").addClass("card-removed");
        if (document.webkitTransitionEnd) {
            $(".card-removed").bind("webkitTransitionEnd", removeTookCards);
        } else {
            removeTookCards();
        }
    } else {
        $(".card-flipped").removeClass("card-flipped");
    }
}


function isMatchPattern() {
    var cards = $(".card-flipped");
    var pattern = $(cards[0]).data("pattern");
    var anotherPattern = $(cards[1]).data("pattern");
    return (pattern == anotherPattern);

}

function removeTookCards() {
    if (cardsmatched < 11) {
        cardsmatched++;
        $(".card-removed").remove();
    } else {
        $(".card-removed").remove();
        uiCards.hide();
        uiComplete.show();
        clearTimeout(scoreTimeout);

    }
}

function reStartGame() {
    playGame = false;
    uiCards.html("<div class='card'><div class='face front'></div><div class='face back'></div></div>");
    clearTimeout(scoreTimeout);
    console.log(matchingGame.deck);
   // matchingGame.deck = ['nopales', 'nopales', 'grilledfish', 'grilledfish', 'tripa', 'tripa', 'bajafish', 'bajafish', 'barbacoa', 'barbacoa', 'carneasada', 'carneasada', 'carnitas', 'carnitas', 'chorizoasado', 'chorizoasado', 'shrimptaco', 'shrimptaco', 'decabeza', 'decabeza', 'alpastor', 'alpastor', 'dorados', 'dorados', 'lengua', 'lengua', 'chicharron', 'chicharron', 'sudados', 'sudados', 'polloasado', 'polloasado', ];
    startGame();
}







