import React from 'react'

export default function Progress({index,numQuestions,points,maxPossiblePoints,answer}) {
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
