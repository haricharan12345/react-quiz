import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext=createContext();

const SECS_PER_QUESTION=30;

const initialState={
    questions:[],
    //status=>loading,error,ready,active,finished
    status:'loading',
    index:0,
    answer:null,
    points:0,
    highscore:0,
    secondsRemaining:null,
  }
  function reducer(state,action){
    switch(action.type){
      case "dataReceived":
        return {
          ...state,
          questions:action.payload,
          status:"ready"};
      
      case "dataFailed":
        return {
          ...state,
          status:"error"
        };
  
      case "start":
        return{
          ...state,
          status:"active",
          secondsRemaining:state.questions.length*SECS_PER_QUESTION,
        }
  
      case "newAnswer":
        //state at current index
        const question=state.questions.at(state.index);
  
        return{...state,
        answer:action.payload,
        points:action.payload===question.correctOption
        ? state.points + question.points
        : state.points};
  
      case "nextQuestion":
        return{
          ...state,
          index:state.index+1,
          answer:null,
        };
  
      case "finish":
        return{
          ...state,
          status:"finished",
          highscore:state.points>state.highscore
          ? state.points
          : state.highscore,
        };
      
      case "restart":
        return {
          ...initialState,
          questions:state.questions,
          status:"ready"
        };

      case "tick":
        return{
        ...state,
        secondsRemaining:state.secondsRemaining-1,
        status:state.secondsRemaining===0?"finished":state.status
        }
  
      default:
         throw new Error("Action unknown")
  
    }
  }

function QuizProvider({children}){

const[state,dispatch]=useReducer(reducer,initialState);

const{questions,status,index,answer,points,highscore,secondsRemaining}=state;

const numQuestions=questions.length;

const maxPossiblePoints=questions.reduce((prev,cur)=>prev+cur.points,0);

  useEffect(()=>{
    fetch("http://localhost:8080/questions")
    .then((res)=>res.json())
    .then((data)=>dispatch({type:"dataReceived",payload:data}))
    .catch((err)=>dispatch({type:"dataFailed"}));
  },[dispatch])

    return(
        <QuizContext.Provider
        value={{
            questions,
            status,
            index,
            answer,
            points,
            highscore,
            secondsRemaining,
            numQuestions,
            maxPossiblePoints,
            dispatch
        }}>
            {children}
        </QuizContext.Provider>
    )
}

 function useQuiz(){
    const context=useContext(QuizContext);
    if(context===undefined) throw new Error("context is used outside the Provider")
    return context
 }
export {QuizProvider,useQuiz}
