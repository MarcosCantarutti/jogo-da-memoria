const cards = document.querySelectorAll('.cards-container')

let hasFlippedCard = false;
let firstClickedCard, secondClickedCard
let lockTheBoard = false
let score = 0
let error = 0

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
 function disableClickedCards (){
    const isMatch = firstClickedCard.dataset.champion === secondClickedCard.dataset.champion 
    


    firstClickedCard.removeEventListener('click', handleFlipCards);
    secondClickedCard.removeEventListener('click', handleFlipCards);
    
  
   
     if(isMatch){
         score += 1
     } 
     document.getElementById('score-count').innerText = `Acertos: ${score}`
  
 

  resetCardsBoard()
}

// Revertar o flip quando errar.
function unflipClickedCards (){

    lockTheBoard = true


  setTimeout(() => {
    firstClickedCard.classList.remove('flip');
    secondClickedCard.classList.remove('flip');

    resetCardsBoard()
    lockTheBoard = false
  }, 1500);


    // Error Count   
  const isMatch = firstClickedCard.dataset.champion === secondClickedCard.dataset.champion
  if(!isMatch){
      error += 1
  }
  document.getElementById('error-count').innerText = `Erros: ${error}`

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


