// import functions and grab DOM elements
const form = document.getElementById('poll-form')
const pollContainer = document.getElementById('current-poll-container')
const closedPolls = document.getElementById('closed-polls-container')



// let state

let firstOption = 0;
let secondOption = 0;
let thirdOption = 0;
let closedPollsArray = []



// set event listeners 
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let data = new FormData(form);
  
  createPoll(data)
  form.reset()
})

const createPoll = (data) => {
  pollContainer.textContent = '';

  let question = data.get('poll-question')
  let option1 = data.get('option-one')
  let option2 = data.get('option-two')
  let option3 = data.get('option-three')

  const questionDisplay = document.createElement('h3')
  questionDisplay.textContent = question

  const optDiv = document.createElement('div')
  optDiv.classList.add('optDiv')

  const btn1 = document.createElement('button')
  btn1.setAttribute('id', 'btn1')
  btn1.textContent = option1 + ' +'

  const btn1a = document.createElement('button')
  btn1a.setAttribute('id', 'btn1a')
  btn1a.textContent = option1 + ' -'

  const btn2 = document.createElement('button')
  btn2.setAttribute('id', 'btn2')
  btn2.textContent = option2 + ' +'

  const btn2a = document.createElement('button')
  btn2a.setAttribute('id', 'btn2a')
  btn2a.textContent = option2 + ' -'

  const btn3 = document.createElement('button')
  btn3.setAttribute('id', 'btn3')
  btn3.textContent = option3 + ' +'

  const btn3a = document.createElement('button')
  btn3.setAttribute('id', 'btn3a')
  btn3a.textContent = option3 + ' -'

  const closePoll = document.createElement('button')
  closePoll.textContent = "Close Poll"

  optDiv.append(btn1, btn1a, btn2, btn2a, btn3, btn3a)
  pollContainer.append(questionDisplay, optDiv, closePoll)

  btn1.addEventListener('click', () => {
    firstOption++;
    console.log(firstOption);
  })
  btn1a.addEventListener('click', () => {
    firstOption--;
    console.log(firstOption);
  })
  btn2.addEventListener('click', () => {
    secondOption++;
    console.log(secondOption);
  })

  btn2a.addEventListener('click', () => {
    secondOption--;
    console.log(secondOption);
  })

  btn3.addEventListener('click', () => {
    thirdOption++;
    console.log(thirdOption);
  })

  btn3a.addEventListener('click', () => {
    thirdOption--;
    console.log(thirdOption);
  })

  closePoll.addEventListener('click', () => {
    let renderedPoll = renderClosedPolls(question, option1, option2, option3)
    closedPolls.append(renderedPoll)
    resetstate()
  })
}

const renderClosedPolls = (question, option1, option2, option3) => {
  closedPolls.textContent = ''
  let pollObject = {
    question,
    option1,
    option2,
    option3,
    firstOption,
    secondOption,
    thirdOption
  }
  closedPollsArray.push(pollObject)

  const closedDiv = document.createElement('div')

  for (const poll of closedPollsArray) {
    console.log(poll);
    const closedQuestion = document.createElement('h3')
    closedQuestion.textContent = poll.question
    const closedOpt1 = document.createElement('p')
    closedOpt1.textContent = `${poll.option1} Votes: ${poll.firstOption}`
    const closedOpt2 = document.createElement('p')
    closedOpt2.textContent = `${poll.option2} Votes: ${poll.secondOption}`
    const closedOpt3 = document.createElement('p')
    closedOpt3.textContent = `${poll.option3} Votes: ${poll.thirdOption}`
  
    closedDiv.append(closedQuestion, closedOpt1, closedOpt2, closedOpt3)
  }
  
  console.log(closedPollsArray);
  return closedDiv
}

const resetstate = () => {
  pollContainer.textContent = '';
  firstOption = 0;
  secondOption = 0;
  thirdOption = 0;
}

