import { renderOption, renderPoll } from './utils.js';

// import functions and grab DOM elements
const form = document.getElementById('poll-form');
const pollContainer = document.getElementById('current-poll-container');
const closedPolls = document.getElementById('closed-polls-container');



// let state

let firstOption = 0;
let secondOption = 0;
let thirdOption = 0;
let closedPollsArray = [];


// set event listeners 
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let data = new FormData(form);
  
    makePoll(data);
    form.reset();
});

const makePoll = (data) => {
    pollContainer.textContent = '';
    let optionsArray = [];

    let question = data.get('poll-question');
    let option1 = data.get('option-one');
    optionsArray.push(option1);
    let option2 = data.get('option-two');
    optionsArray.push(option2);
    let option3 = data.get('option-three');
    optionsArray.push(option3);

    let renderedOptions = renderOption(question, optionsArray);
    let renderedPoll = renderPoll(renderedOptions);
    
    displayCurrentPoll(renderedPoll);

    for (let i = 1; i < renderedOptions[0].children.length; i++) {
        const element = renderedOptions[0].children[i];
        console.log(element.children[0]);
        element.children[0].addEventListener('click', () => {
            switch (i) {
                case 1:
                    firstOption++;
                    break;
                case 2:
                    secondOption++;
                    break;
                case 3:
                    thirdOption++;
                    break;
            }
        });
        element.children[1].addEventListener('click', () => {
            switch (i) {
                case 1:
                    firstOption--;
                    break;
                case 2:
                    secondOption--;
                    break;
                case 3:
                    thirdOption--;
                    break;
            }
        });
    }

    let closePollBtn = renderedPoll.children[1];
    closePollBtn.addEventListener('click', () => {
        let renderedPoll = renderClosedPolls(question, option1, option2, option3);
        closedPolls.append(renderedPoll);
        resetstate();
    });
};

const displayCurrentPoll = (poll) => {
    pollContainer.append(poll);
};

const renderClosedPolls = (question, option1, option2, option3) => {
    closedPolls.textContent = '';
    let pollObject = {
        question,
        option1,
        option2,
        option3,
        firstOption,
        secondOption,
        thirdOption
    };
    closedPollsArray.push(pollObject);

    const closedDiv = document.createElement('div');

    for (const poll of closedPollsArray) {
        const closedQuestion = document.createElement('h3');
        closedQuestion.textContent = poll.question;
        const closedOpt1 = document.createElement('p');
        closedOpt1.textContent = `${poll.option1} Votes: ${poll.firstOption}`;
        const closedOpt2 = document.createElement('p');
        closedOpt2.textContent = `${poll.option2} Votes: ${poll.secondOption}`;
        const closedOpt3 = document.createElement('p');
        closedOpt3.textContent = `${poll.option3} Votes: ${poll.thirdOption}`;
  
        closedDiv.append(closedQuestion, closedOpt1, closedOpt2, closedOpt3);
    }
    return closedDiv;
};

const resetstate = () => {
    pollContainer.textContent = '';
    firstOption = 0;
    secondOption = 0;
    thirdOption = 0;
};

