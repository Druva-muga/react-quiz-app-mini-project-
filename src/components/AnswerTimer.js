import { createContext,useContext, useState, useEffect, useRef } from "react";
import DataContext from '../context/dataContext';

function AnswerTimer({onTimeUp,duration}){
    const[progressLoaded,setProgressLoaded] = useState(0);
    const { showQuiz,counter,setCounter,showAnswerTimer,setShowAnswerTimer }  = useContext(DataContext);


    const intervalRef = useRef();

   
    useEffect(() => {
       
    setCounter(0);
        intervalRef.current = setInterval(() => {
            setCounter((cur) => cur+1);
        },1000);

        return () => clearInterval(intervalRef.current);
    },[showQuiz]);

    useEffect(() => {
        setProgressLoaded(100 * (counter / duration));

        if(counter === duration){
            clearInterval(intervalRef.current);
            setTimeout(() => {
                onTimeUp();
            },1000 );
        }
    },[counter])

    return(
        <div className="answer-timer-container">
            <div style={{width:`${progressLoaded}%`,backgroundColor: `${progressLoaded<50 ? 'lightgreen': progressLoaded < 70 ? 'orange' : "red"}`,}} className="progress"></div>
        </div>
    )
}

export default AnswerTimer