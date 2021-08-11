import React from 'react';
import words from './words.js';
import {RefreshCcw as RefreshIcon} from 'react-feather';
import {
    Button,
    Typography,
    Box,
    Card,
    CardContent,
    TextField
} from '@material-ui/core';
class Game extends React.Component{
    
    state={
        question: "Click Start to start the game!",
        answer:"",
        previousQuestions:"",
        numberOfQuestionsAsked:0,
        correctAnswer:0,
        wrongAnswer:0,
        giveup:0,
        timeup:0,
        flag:"none",
        scoreFlag:"none"
    }
    shuffle(str) {
        if(words.includes(str))
            this.setState({answer:str},()=>{this.setState({answer:str})});
        var a = str.split(""),n = a.length-1;
        
        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        if(this.state.answer.toString() === a.join("").toString()){
           this.shuffle(a.join("").toString());
        }
        else{
            this.setState({question:a.join("")});
        }
        
        return a.join("");
    }
    Header = () => {
        return (
            <Box style={{textAlign:"center",margin:"2px 5px 5px 5px"}}>
                <Card>
                    <CardContent>
                        <h1 style={{display:"inline"}}>Word Puzzle</h1>
                        <Typography
                            style={{display:"inline"}}
                            variant="subtitle2"
                        > by Kafeelur Rahman T K</Typography>
                    </CardContent>
                </Card>
            </Box>
        );
    }
    startTimer(){
      let video = document.getElementById("timer");
      video.load();
      video.play();
      video.onended = ()=>{
          alert("Time up!!!");
          this.setState({timeup:this.state.timeup+1});
          alert("Answer is "+this.state.answer); 
          this.setQuestion();
      };
    }
    setQuestion(){
        //Picking Random Number
        let random = Math.floor(Math.random() * (words.length));
        
        //Checking if the question is already asked.
        if(!this.state.previousQuestions.includes(words[random]) && this.state.numberOfQuestionsAsked != words.length){
            //Storing the question in previousQuestions Property
            this.setState({previousQuestions:this.state.previousQuestions+words[random]+" "});
            this.setState({question:this.shuffle(words[random])});
            this.startTimer();
            this.setState({numberOfQuestionsAsked:this.state.numberOfQuestionsAsked+1});
        }
        //When the number of question is equal to the length of word array
        else if(this.state.numberOfQuestionsAsked == words.length){
            //Show stage is completed.
            alert("Stage Completed");
            let timer=document.getElementById('timer');
            //Pause the stop watch
            timer.pause();
            //Hide the timer since all questions are over.
            timer.style.display = "none";
            //Hiding the question number label
            document.getElementById('q-num-lbl').style.display = "none";
            document.getElementById('question').style.display = "none";
            this.setState({flag:"none"});
        }
        //If the generated question is already asked change the question.
        else{
            this.setQuestion();
        }
        
    }
   
    QuestionSection = (props) => {
        
        return (
            <Box>
                <Card style={{textAlign:"center",backgroundColor:"aliceblue",margin:"2px 5px 5px 5px"}}>
                    <CardContent >
                        <div>                       
                        <div id="score-tag" style={{textAlign:"left",display:this.state.scoreFlag}}>
                            <Typography        
                                    display="block"
                                    style={{color:"black",textAlign:"left"}}
                                    variant="subtitle2"
                                    id="q-num-lbl"
                                >
                                Question Number  : {this.state.numberOfQuestionsAsked}
                            </Typography>
                            <Typography
                                    display="block"
                                    style={{color:"green",textAlign:"left"}}
                                    variant="subtitle2"
                                >
                                Points  : {this.state.correctAnswer * 10 } / {(words.length) * 10}
                            </Typography>
                            
                            <Typography
                                    
                                    display="block"
                                    style={{color:"green",textAlign:"left"}}
                                    variant="subtitle2"
                                >
                                Correct Answers  : {this.state.correctAnswer}
                            </Typography>
                            <Typography
                                    display="block"
                                    style={{color:"red",textAlign:"left"}}
                                    variant="subtitle2"
                                >
                                Giveup Questions  : {this.state.giveup}
                            </Typography>
                            <Typography
                                    display="block"
                                    style={{color:"red",textAlign:"left"}}
                                    variant="subtitle2"
                                >
                                Timeup Questions  : {this.state.timeup}
                            </Typography>
                            <Typography
                                    display="block"
                                    style={{color:"red",textAlign:"left"}}
                                    variant="subtitle2"
                                >
                                Wrong Attempted : {this.state.wrongAnswer}
                            </Typography>
                            <div style={{display:"block",float:"right",borderRadius:"5px"}}>

                            
                            <video id="timer" width="180" height="240" autoplay >
                                <source src="Timer.mp4" type="video/mp4" />
                                
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        </div>
                        
                    </div>
                        <Typography
                            id = "question"
                            display="block"
                            variant="h2"
                            
                        >
                            {this.state.question}
                        </Typography>
                        
                        <Button
                            startIcon={<RefreshIcon />}
                            variant="outlined"
                            color="secondary"
                            onClick={(e)=>{ this.shuffle(this.state.question) }}
                            style={{display:this.state.flag}}
                        >
                            Shuffle
                        </Button> &nbsp;&nbsp;
                        <Button
                            
                            variant="outlined"
                            color="secondary"
                            onClick={(e)=>{
                                 this.setState({giveup:this.state.giveup+1});
                                 alert("Answer is "+this.state.answer); 
                                 this.setQuestion();
                            }}
                            style={{display:this.state.flag}}
                        >
                            Giveup
                        </Button> 
                        <Button
                            id="start"
                            onClick = {(e)=>{
                                document.getElementById('start').style.display="none";
                                this.setState({flag:"inline"}); this.setState({scoreFlag:"inline"});
                                this.setQuestion();
                                this.startTimer();
                            }}
                            size="medium"
                            color="secondary"
                            variant="outlined"
                        >
                            Start
                        </Button>
            <div 
                style={{display:this.state.flag,textAlign:"center",
                backgroundColor:"aliceblue",margin:"2px 5px 5px 5px"}}>
                    <br/><br/>
                    <TextField
                        autoComplete="off"
                        variant="outlined"
                        label="Answer"
                        id="answer"
                    >

                    </TextField>
                    <br /> <br />
                    
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={(e) =>{this.checkAnswer()}}
                    >
                        Check
                    </Button>
                    
            </div>
                    </CardContent>
                </Card>
            </Box>
        );
    }    
    checkAnswer(){
        //Storing the given input value
        let userAnswer = document.getElementById("answer").value;
        //If the user answer is correct then increment the correctAnswer Property and set another question
        if(this.state.answer.toString() === userAnswer.toString()){
            this.setState({correctAnswer: this.state.correctAnswer+1});
            this.setQuestion();
        }else{
            alert(userAnswer+" is Not correct Try Again!!!");
            this.setState({wrongAnswer: this.state.wrongAnswer+1});
        }
        document.getElementById('answer').value="";
    }
    
    
    render(){
        return (
            <Box>
                <Card style={{backgroundColor:"gray"}}>
                    <CardContent>
                    <this.Header />
                    <this.QuestionSection />
                    </CardContent>
                </Card>
                
            </Box>
        );
    }
}
export default Game;