export const renderOption = (question, optionsArray) => {
    const optionButtonsArray = [];

    const questionDisplay = document.createElement('h3');
    questionDisplay.textContent = question;

    const optDiv = document.createElement('div');
    optDiv.classList.add('optDiv');
    optDiv.append(questionDisplay);

    for (const option of optionsArray) {
        const buttonDiv = document.createElement('div');

        const optionIncrement = document.createElement('button');
        optionIncrement.textContent = option + ' +';

        const optionDecrement = document.createElement('button');
        optionDecrement.textContent = option + ' -';

        buttonDiv.append(optionIncrement, optionDecrement);
        optDiv.append(buttonDiv);

        optionButtonsArray.push(optDiv);
    }
    return optionButtonsArray;
};

export const renderPoll = (renderedOptions) => {
    const pollWrapper = document.createElement('div');
    pollWrapper.classList.add('poll-div');

    const closePoll = document.createElement('button');
    closePoll.textContent = 'Close Poll';
    closePoll.setAttribute('id', 'close-poll-btn');

    for (const div of renderedOptions) {
        pollWrapper.append(div);
    }
    pollWrapper.append(closePoll);

    return pollWrapper;
};
