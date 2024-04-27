import React, { useContext,useState } from 'react';
import DataContext from '../context/dataContext';

const Result = () => {
    const { showResult, quizs, marks, startOver, quitQuiz }  = useContext(DataContext);
    const [name,setName] = useState('');
    const [highScores,setHighScores] = useState([]);
    const [showScores,setShowScores] = useState(false);


    const handleSave = () =>{
        const score = {
            name,
            marks,
        };
        const newHighScores = {...highScores, score}.sort((a,b) => b.score - a.score);
        setHighScores(newHighScores);
        setShowScores(true);
        localStorage.setItem('highScores',JSON.stringify(newHighScores));
    }
    return (
        <section className="bg-dark text-white" style={{ display: `${showResult ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-6">
                        <div className={`text-light text-center p-5 rounded ${marks > (quizs.length * 5 / 2) ? 'bg-success' : 'bg-danger'}`}>
                            <h1 className='mb-2 fw-bold'>{marks > (quizs.length * 5 / 2) ? 'Awesome!' : 'Oops!'}</h1>
                            <h3 className='mb-3 fw-bold'>Your score is {marks} out of {quizs.length * 5}</h3>

                            <button onClick={startOver} className='btn m-2 py-2 px-4 btn-light fw-bold d-inline'>Start Over</button>
                            <button onClick={quitQuiz} className='btn py-2 px-4 btn-light fw-bold d-inline'>quit</button>
                            {!showScores ?
                            (<>
                            <h3>
                                Enter your name below <br/> to save your score!!
                            </h3>
                            <input class="option input1" value={name} onChange= {(evt) => setName(evt.target.value)}/>
                            <button class="btn" id="save" onClick={handleSave}>Save</button>
                            </>): (<>
                            <table>
                                <thead>
                                <tr>
                                    <th>Ranking</th>
                                    <th>Name</th>
                                    <th>Score</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {highScores.map((highScore,i) => {
                                        return(
                                    <tr>
                                        <td>{i+1}</td>
                                        <td>{highScore.name}</td>
                                        <td>{highScore.score}</td>
                                    </tr>
                    
                                        )
                                    })}
                                    
                                </tbody>
                            </table>
                            </>)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Result;