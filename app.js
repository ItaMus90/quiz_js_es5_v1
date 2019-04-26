var questions;
var questions_count;
var current_question;

var question_title_elem = document.getElementById("title");
var answers_elem = document.getElementById("answers");
var action_btn = document.getElementById("action_btn");
var score = 0;


function getQuestions() {

    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {

        if(this.readyState === 4 && this.status === 200){

            questions = JSON.parse(this.responseText).questions;
            questions_count = questions.length;
            current_question = 0;

        }

    }

    xhr.open("GET","/questions.json",false);

    xhr.send();

}

function displayQuestion(question) {
    
    question_title_elem.innerHTML = "";
    answers_elem.innerHTML = "";

    var question_title = document.createTextNode(question.question);
    question_title_elem.appendChild(question_title);
    
    for(var i = 0; i < question.answers.length; i++) {
    
        var label = document.createElement("label");
        var answer_input = document.createElement("input");
        answer_input.setAttribute("type", "radio");
        answer_input.setAttribute("name", "answer");
        answer_input.setAttribute("value", question.answers[i].answer_id);
        answer_input.classList.add("answer");

        var answer_title = document.createTextNode(question.answers[i].answer);
        label.appendChild(answer_input);
        label.appendChild(answer_title);

        answers_elem.appendChild(label);

    }
    

}

action_btn.addEventListener("click", function(){

    var answers = document.getElementsByClassName("answer");
    
    for(var i = 0; i < answers.length; i++) {

        var answer = answers[i];
        var question = questions[current_question];

        if(answer.checked && answer.value === question.correct) {

            answer.parentNode.classList.add("correct");
            score++;
            
        }else if(answer.checked && answer.value !== question.correct){

            answer.parentNode.classList.add("incorrect");
            
        }

        answer.disabled = true;
    }

    current_question++;

    var next_btn = document.getElementById("next_btn");
    
    next_btn.classList.remove("hide");

    this.classList.add("hide");
    
});

next_btn.addEventListener("click", function(){

    if(current_question === questions_count) {

        document.getElementById("score").innerHTML = score + "/" + questions_count;

        document.getElementById("question").classList.add("hide");

        document.getElementById("scores").classList.remove("hide");

        return;

    }

    displayQuestion(questions[current_question]);

    action_btn.classList.remove("hide");

    this.classList.add("hide");

});


//Initialisation
getQuestions();
displayQuestion(questions[current_question]);