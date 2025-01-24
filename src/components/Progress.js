import React from 'react'
import { useQuiz } from '../context/ReactQuizContext'

export default function Progress() {

  const {index,numQuestions,points,maxPossiblePoints,answer}=useQuiz();
  
  return (
    //Number(answer!==null) => if ans is not null it adds 1
    <header className='progress'>
      <progress
      max={numQuestions}
      value={index+Number(answer!==null)}></progress>
      <p>Question <strong>{index+1}</strong>
      /{numQuestions}</p>
      <p><strong>{points}</strong>/{maxPossiblePoints}</p>
    </header>
  )
}
