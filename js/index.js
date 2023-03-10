const play = document.querySelector('h1 + button');

play.addEventListener('click', () => {
  play.classList.toggle('d-none');

  const wrapper = document.querySelector('.wrapper');
  const replay = document.querySelector('button.replay');

  replay.classList.toggle('d-none');
  replay.disabled = true;

  let elementCreated = 0;

  function createItem() {
    replay.disabled = true;
    const newItem = document.createElement('div');
    newItem.classList.add(`item${elementCreated + 1}`);
    newItem.classList.add('animation');
    newItem.classList.add('col');
    newItem.classList.add('box');
    

    wrapper.appendChild(newItem);
    elementCreated += 1;

    // listener per rilevare la fine dell'animazione
    newItem.addEventListener('animationend', () => {
       
      if (elementCreated <= 100) {
        if ((elementCreated % 3 === 0) && (elementCreated % 5 === 0)){
            newItem.classList.add('fizzBuzz');
            newItem.innerHTML = `
                <span>FIZZ</span>
                <span>BUZZ</span>       
            `;
            
        } else if (elementCreated % 3 === 0){
            newItem.classList.add('fizz');
            newItem.innerHTML = `
                <span>FIZZ</span>    
            `;
        } else if (elementCreated % 5 === 0) {
            newItem.classList.add('buzz');
            newItem.innerHTML = `
                <span>BUZZ</span>    
            `;
        } else {
            newItem.classList.add('normal');
            newItem.innerHTML = `
                <span>${elementCreated}</span>    
            `;
        }
        
        // Se ci sono ancora quadratini da creare, creiamo il prossimo
        createItem();
      } else {
        // Altrimenti, abilitiamo il pulsante replay
        replay.disabled = false;
      }
    });
  }

  // Avviamo la creazione dei quadratini
  createItem();

  replay.addEventListener('click', () => {
    play.classList.toggle('d-none');
    replay.classList.toggle('d-none');
    play.disabled = false;
    wrapper.innerHTML = '';
  });
});
