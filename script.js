document.addEventListener('DOMContentLoaded', () => {
    const images = [
        '1.png', '1.png', 
        '2.png', '2.png',
        '3.png', '3.png',
        '4.png', '4.png',
        '5.png', '5.png',
        '6.png', '6.png',
		'7.png', '7.png', 
        '8.png', '8.png',
        '9.png', '9.png',
        '10.png', '10.png',
        '11.png', '11.png',
		'12.png', '12.png', 
        '13.png', '13.png',
        '14.png', '14.png',
        '15.png', '15.png'
    ];

    const gameBoard = document.getElementById('gameBoard');
	const restartBtn = document.getElementById('restartBtn');
	const winMessage = document.getElementById('winMessage');
	const loseMessage = document.getElementById('loseMessage');
    const timerDisplay = document.getElementById('timer');
    let flippedCards = [];
    let matchedCards = [];
	let countdown;
    let timeLeft = 200;
	let gameStarted = false;

    images.sort(() => 0.5 - Math.random());

    function createGameBoard() {
        gameBoard.innerHTML = ''; 

        images.forEach((image) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.image = image;

            const img = document.createElement('img');
            img.src = `images/${image}`;
            card.appendChild(img);

            const cover = document.createElement('div');
            cover.classList.add('cover');
            card.appendChild(cover);

            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }
	
	    function startGame() {
        gameStarted = true;
        startTimer();
    }
	
	function startTimer() {
        countdown = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time left: ${timeLeft}s`;

            if (timeLeft === 0) {
                clearInterval(countdown);
                timerDisplay.textContent = 'Time is up!';
                showLoseMessage();
            }
        }, 1000);
    }
	
	function stopTimer() {
        clearInterval(countdown);
    }
	
	function resetTimer() {
        clearInterval(countdown);
        timeLeft = 200; 
        timerDisplay.textContent = `Time left: ${timeLeft}s`;
    }


    function flipCard() {
		if (!gameStarted) {
            startGame();
        }
		
        if (flippedCards.length === 2) return;
        if (this.classList.contains('flipped')) return;

        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.image === card2.dataset.image) {
            matchedCards.push(card1, card2);
			
			if (matchedCards.length === images.length) {
                showWinMessage();
            }
			
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
			subtractTime(2);
        }
        flippedCards = [];
    }
	
	function subtractTime(seconds) {
        timeLeft -= seconds;
        if (timeLeft <= 0) {
            timeLeft = 0;
            clearInterval(countdown);
            timerDisplay.textContent = 'Time is up!';
            showLoseMessage();
        } else {
            timerDisplay.textContent = `Time left: ${timeLeft}s`;
        }
    }
	
	function showWinMessage() {
		stopTimer();
        winMessage.style.display = 'block';
    }
	
	function showLoseMessage() {
		stopTimer();
        loseMessage.style.display = 'block';
    }
	
	createGameBoard();
	
    restartBtn.addEventListener('click', () => {
        gameStarted = false;
        flippedCards = [];
        matchedCards = [];
		winMessage.style.display = 'none';
		loseMessage.style.display = 'none';
		resetTimer();

        images.sort(() => 0.5 - Math.random());

        createGameBoard();
    });
});
