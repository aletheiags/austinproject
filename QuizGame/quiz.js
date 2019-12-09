//dont worry about these four functions
const setSelected = (evt) => {
    document.querySelectorAll('.option').forEach(o => o !== evt.target ? o.checked = false : o.checked = true)
    selected = evt.target.value
    showAnswerButton()
}
const setupOptions = () => {
    let options = document.querySelectorAll('.option')
    options.forEach(opt => opt.addEventListener('change', setSelected))
}
const hideAnswerButton = () => {
    answerButton.setAttribute("style", "display:none")
}
const showAnswerButton = () => {
    answerButton.setAttribute("style", "display:inherit")
}
//Just added these to make it eaiser to get the items needed
const questionHolder = document.getElementById("question")
const optionsHolder = document.getElementById("options")
const scoreHolder = document.getElementById("score")
const answerButton = document.getElementById("answer")
const resultHolder = document.getElementById("result")

let selected = null
//Start Coding Below

let correct = null
let score = 0
let onQuestion = 0

let nextButton = document.getElementById("next")

nextButton.addEventListener("click", () => {
    onQuestion++
    addQuestion(questions[onQuestion])
    hideNextButton()
    resultHolder.innerHTML = null
})

const hideNextButton = () => {
    nextButton.setAttribute("style", "display:none")
}


const addQuestion = (question) => {

    questionHolder.innerHTML = question.question
    for (var i = 0; i < question.options.length; i++) {
        addOption(question.options[i])
    }
    correct = question.correct
    setupOptions()
}

const addOption = (opt) => {
    let option = `
        <div>
           
            <input class="option" type="radio" value="${opt}"/>
            <label>${opt}</label>
        </div>    
    `
    optionsHolder.innerHTML += option

}
answerButton.addEventListener("click", () => {

    if (selected === correct) {
        resultHolder.innerHTML = "Correct!"
        score++
        clearQuestion()
    } else {
        resultHolder.innerHTML = "You are Wrong!"
        score--
    }
    scoreHolder.innerHTML = score

})

const clearQuestion = () => {
    questionHolder.innerHTML = ""
    optionsHolder.innerHTML = ""
    hideAnswerButton()
    showNextButton()
}
const showNextButton = () => {
    nextButton.setAttribute("style", "display:block")
}

//Question("How Many Questions?",["10","20","100"])
//addOption("10")
//addOption("20")
//addOption("100")
//setupOptions()

correct = "20"

let questions = [{

    question: "How Many Questions?",
    options: ["10", "20", "100"],
    correct: "20"
}, {
    question: "why?",
    options: ["me", "you", "them"],
    correct: "them"
}]

addQuestion(questions[onQuestion])
