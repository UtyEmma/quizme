const questions = [
    {
        question: "What is the capital of Eygpt?",
        answers: [
            {text: "Cairo", status: true },
            {text: "Lagos", status: false}, 
            {text: "Bangladesh", status: false},
            {text: "Abuja", status: false}
        ]
    },
    {
        question: "Who is the richest person in the World?",
        answers: [
            {text: "Bill Gates", status: false },
            {text: "Jeff Bezos", status: false}, 
            {text: "Elon Musk", status: true},
            {text: "Karen Eze", status: false}
        ]
    },
    {
        question: "Which country has the highest population in the World?",
        answers: [
            {text: "Russia", status: false },
            {text: "China", status: true}, 
            {text: "India", status: false},
            {text: "United States of America", status: false}
        ]
    },
    {
        question: "Who is the President of Nigeria?",
        answers: [
            {text: "Mr Peter Obi", status: false },
            {text: "Atiku Abubakar", status: false}, 
            {text: "Yemi Osinbanjo", status: false},
            {text: "Mohammed Buhari", status: true}
        ]
    },
    {
        question: "What is the value of Pi?",
        answers: [
            {text: "3.14", status: true },
            {text: "100%", status: false}, 
            {text: "2.3", status: false},
            {text: "3.11", status: false}
        ]
    },
    {
        question: "Who is the current Prime Minister of Britain?",
        answers: [
            {text: "Boris Johnson", status: true },
            {text: "Theresa May", status: false}, 
            {text: "Margaret Tatcher", status: false},
            {text: "Queen Elizabeth", status: false}
        ]
    }
]

const mark = 100 / questions.length //The total score is 100 (Mark is 100 divided by the number of questions )
let score = 0 
let currentIndex = 0

function initializeQuiz(){
    updateQuestions(currentIndex)
    document.getElementById('quiz').style.display = 'block'
    document.getElementById('scoreboard').style.display = 'none'
}

initializeQuiz()

function updateQuestions(questionIndex){
    if(currentIndex > questions.length -1){
        return finishQuiz()
    }
    const question = document.getElementById('question')
    const questionNo = document.getElementById('serial-no')

    const answerOne = document.getElementById('answer-1')
    const answerTwo = document.getElementById('answer-2')
    const answerThree = document.getElementById('answer-3')
    const answerFour = document.getElementById('answer-4')
    
    let currentQuestion = questions[questionIndex]
    
    const serialNo = ++questionIndex

    const answers = [answerOne, answerTwo, answerThree, answerFour]
    
    question.innerText = currentQuestion.question
    questionNo.innerText = "Question "+serialNo

    for (let i = 0; i < answers.length; i++) {
        const element = answers[i]
        const answer = currentQuestion.answers[i]
        element.value = answer.text
        const label = element.parentElement.getElementsByTagName('label')[0]
        label.innerText = answer.text
    }
}

function submitAnswers(){
    checkAnswers(currentIndex)
}

function finishQuiz(){
    document.getElementById('quiz').style.display = 'none'
    document.getElementById('scoreboard').style.display = 'flex'

    const scoreboard = document.getElementById('score')
    scoreboard.innerText = score    
    currentIndex = 0
    score = 0
}

function checkAnswers(currentIndex){
    const answersInput = document.querySelectorAll('input[name="answer"]')
    let value;

    for (let i = 0; i < answersInput.length; i++) {
        if(answersInput[i].checked) value = answersInput[i].value
    }

    if(value === undefined) {
        return document.getElementById('error-message').innerText = "Please select an answer"
    }else{
        document.getElementById('error-message').innerText = ""
    }

    
    const question = questions[currentIndex]
    checkForCorrectAnswers(question.answers, value)  
    updateQuestions(++currentIndex)
}

function checkForCorrectAnswers(answers, value){
    answers.map(answer => {
        if(answer.text === value) {
            if(answer.status === true){
                score = Math.floor(score + mark)
            }
        }
    })
    ++currentIndex
}
