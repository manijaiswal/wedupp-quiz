import React, {Component} from 'react';
class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedOption: 0,
      score: [0, 0, 0, 0, 0],
      questions: [
        ['We can go for keys when there is a possibility that our user could change the data.', 'JSX is typesafe.', 'React merges the object you provide into the current state using', 'Arbitrary inputs of components are called','_________ can be done while more than one element needs to be returned from a component'],
        ['Which of the following API is a MUST for every ReactJS component?', 'Lifecycle methods are mainly used ___________.', 'How can you access the state of a component from inside of a member function?', 'What is ReactJS?','In JSX most of the errors can be caught during _________.'],
        ['We can go for keys when there is a possibility that our user could change the data.', 'JSX is typesafe.', 'React merges the object you provide into the current state using ', 'Arbitrary inputs of components are called','_________ can be done while more than one element needs to be returned from a component'],
      ],
      options: [
        [
          ['Keys', 'Refs', 'both', 'None of the above'],
          ['true', 'false'],
          ['setState()', 'state()'],
          ['keys', 'props', 'Element', 'ref'],
          ['Abstraction', 'Packing', 'Insulation', 'Wrapping'],
        ],
        [
          ['renderComponent','getInitialState', 'Render','None'],
          ['To keep track of event history', 'to enhance components', 'free up resources', 'None of the above'],
          ['this.values', 'this.getState()', 'this.prototype.stateValue', 'this.state'],
          ['Server-side Framework', 'User-interface framework', 'Both', 'None'],
          ['Interpretation','Execution','Compilation','Build']
        ],
        [
          ['Keys', 'Refs', 'both', 'None of the above'],
          ['true', 'false'],
          ['setState()', 'state()'],
          ['keys', 'props', 'Element', 'ref'],
          ['Abstraction', 'Packing', 'Insulation', 'Wrapping'],
        ],
      ]
    }
  }

  render() {

    const { step, selectDifficulty, restartGame, nextStep, prevStep, difficulty, selectedOptionsList, selectChoice, correctOptions, showResult, time } = this.props;

    const { selectedOption, questions, options, score } = this.state;

    const renderResult = () => {

      let output = [];

      for(let i=0; i<5; i++) {
        output.push(<p>Question {i + 1}: {score[i] !== 0 ? <i className={'fas fa-check'} /> : <i className={'fas fa-times'} /> }</p>);
      }
      return output;
    };

    const renderAccToStep = () => {
      console.log(selectDifficulty, step);

      for(let i=0;i<5;i++) {
        if (selectedOptionsList[i] === correctOptions[difficulty-1][i]) {
          let newScore = this.state.score;
          newScore[i] = 1;

          const temp = () => this.setState({
            score: newScore,
          });
        } else {
          let newScore = this.state.score;
          newScore[i] = 0;

          const temp = () => this.setState({
            score: newScore,
          });
        }
      }

      const finalScore = score.filter((value) => {return value === 1}).length;
      let userResult = 'Dumb';
      if(finalScore === 5) {
        userResult = 'Very Strong';
      } else if(finalScore === 4) {
        userResult = 'Strong';
      } else if(finalScore === 3) {
        userResult = 'Good';
      } else if(finalScore === 2) {
        userResult = 'Bad';
      } else if(finalScore === 1) {
        userResult = 'Poor';
      } else {
        userResult = 'Dumb';
      }

      switch (step) {
        case 0:
          return <div className={'content'}>
            <h3 className={'choose-heading'}>Please select a difficulty</h3>
            <div className={'diff-buttons'}>
              <button onClick={() => selectDifficulty(1)}>EASY</button>
              <button onClick={() => selectDifficulty(2)}>MEDIUM</button>
              <button onClick={() => selectDifficulty(3)}>HARD</button>
            </div>
          </div>;
        case 6:
          return <div className={'content'}>
            <h1 className={'choose-heading'}>RESULT</h1>
            <div className={'diff-buttons'}>
              <h3>Your score is: {finalScore}/5</h3>
              <h3>Your level is: {userResult}</h3>
              <h2>Evaluation: </h2>
              {renderResult()}
            </div>
          </div>;
        default:
          return <div className={'content'}>
            <h4>Time remaining: {time} seconds</h4>
            <h3 className={'question'}>{step}) {questions[difficulty - 1][step - 1]}</h3>
            <ul className={'options'}>
              {options[difficulty - 1][step - 1].map((option, index) => (
                <li key={index} className={selectedOptionsList[step - 1] === index + 1 ? 'selected' : ''}
                    onClick={() => selectChoice(step - 1, index + 1)}><span
                  className="option-tag">{index + 1}</span> {option}</li>
              ))}
            </ul>
          </div>;
      }
    };

    return (
      <div className={'container'}>
        <h1 className={'main-heading'}>QUIZ APP</h1>
        {renderAccToStep()}
        <div className={'prev-next-container'}>
          {step !== 0 && step !== 6 ?
            <button onClick={() => {this.setState({selectedOption: 0}); prevStep()}} disabled={step === 1} className={'prev-btn'}>PREVIOUS</button> : null}
          {step !== 0 && step !== 6 ? <button onClick={() => {this.setState({selectedOption: 0}); nextStep()}} className={'next-btn'}>{step !== 5 ? 'NEXT' : 'SUBMIT' }</button> : null}
        </div>
        {step !== 0 ? <button onClick={() => {
          window.location.reload();
        }} className={'restart-btn'}>RESTART</button> : null}
      </div>
    );
  }
}

export default Home;