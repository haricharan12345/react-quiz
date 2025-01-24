import React, { useEffect } from 'react'
import { useQuiz } from '../context/ReactQuizContext';

export default function Timer() {

  const {dispatch,secondsRemaining}=useQuiz();
  
    const mins=Math.floor(secondsRemaining/60);
    const seconds=secondsRemaining%60;

    useEffect(()=>{
       const id= setInterval(()=>{
         dispatch({type:"tick"})
        },1000);
    //to clean up the timer => starts a new timer
      return()=>clearInterval(id);
    },[dispatch])
  return (
    <div className='timer'>
      {mins<10 && "0"}{mins}:
      {seconds}
    </div>
  )
}
