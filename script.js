const cards = document.querySelectorAll('.cards-container')

let hasFlippedCard = false;
let firstClickedCard, secondClickedCard
let lockTheBoard = false



// Virando as cartas
function handleFlipCards () {
    // evitando mais de um elemento clicado 
    if(lockTheBoard) return
    if(this === firstClickedCard) return

    this.classList.add('flip')

    if(!hasFlippedCard){
        hasFlippedCard = true
        firstClickedCard = this
        return
    }

    secondClickedCard = this
    hasFlippedCard = false
    
    const isMatch = firstClickedCard.dataset.champion === secondClickedCard.dataset.champion
    isMatch ? disableClickedCards() : unflipClickedCards();
}
    

// Quando clicado, desativar os elementos para evitar virar novamente
 const disableClickedCards = () => {
  firstClickedCard.removeEventListener('click', handleFlipCards);
  secondClickedCard.removeEventListener('click', handleFlipCards);

  resetCardsBoard()
}

// Revertar o flip quando errar.
const unflipClickedCards = () => {
    lockTheBoard = true


  setTimeout(() => {
    firstClickedCard.classList.remove('flip');
    secondClickedCard.classList.remove('flip');

    resetCardsBoard()
    lockTheBoard = false
  }, 1500);
}

const resetCardsBoard = () => {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

cards.forEach(card => {
    card.addEventListener('click', handleFlipCards)
})

const suffleCards = () => {
    cards.forEach(card => {
        let randomCardPosition = Math.floor(Math.random() * 12)
        card.style.order = randomCardPosition
    })
}
suffleCards()


