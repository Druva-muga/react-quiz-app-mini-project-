import React, { useContext } from 'react';
import DataContext from '../context/dataContext';

const Instructions = () => {
    const {startQuiz,quitQuiz, showRules} = useContext(DataContext);

    return(
        <section id="instruction" class="info_box" style={{ display: `${showRules ? 'block' : 'none'}`}}>
        <div class="info-title"><span>Some Rules of this Quiz</span></div>
        <div class="info-list">
            <div class="info">1. You will have only <span>15 seconds</span> per each question.</div>
            <div class="info">2. Once you select your answer, it can't be undone.</div>
            <div class="info">3. You can't select any option once time goes off.</div>
            <div class="info">4. You can't exit from the Quiz while you're playing.</div>
            <div class="info">5. You'll get points on the basis of your correct answers.</div>
        </div>
        <div class="buttons">
            <button class="quit" onClick={quitQuiz}>Exit Quiz</button>
            <button onClick={startQuiz} class="restart">Continue</button>
        </div>
    </section>
       );
};

export default Instructions;