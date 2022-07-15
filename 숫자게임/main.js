// 1.랜덤번호 지정
// 2.유저가 번호를 입력한다 그리고 go라는 버튼을 누름
// 3.만약 유저가 번호를 맞추면, 맞췃습니다.
// 4.랜덤번호가 < 유저번호 Down!!
// 5.랜덤번호가 > 유저번호 UP!!
// 6.Reset버튼을 누르면 게임이 리셋된다
// 7.5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측불가, 버튼이 disable)
// 8.유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 그리고 기회를 깍지 않는다.
// 9.유저가 이미 입력한 숫자를 또 입력하면 알려준다. 그리고 기회를 깍지 않는다.

let randomNum = 0
let playButton = document.getElementById("play-button"); // 2-1 go라는 버튼을 누름
let userInput = document.getElementById("user-input"); // 2.유저가 랜덤번호를 입력한다.
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button"); // 6.Reset 버튼을 누르면 게임시 리셋된다
let chanceArea = document.getElementById("chance-area");
let chances = 5 // 7. 유저가 5번의 기회를 다끄면 game over
let gameOver = false // 7. 유저가 5번의 기회를 다끄면 game over
let history = [] // 9.유저가 이미 입력한 숫자를 또 입력하면 알려준다. 그리고 기회를 깍지 않는다.


playButton.addEventListener("click", play) // 2-1 go라는 버튼을 누름
resetButton.addEventListener("click", reset) // 6.Reset 버튼을 누르면 게임시 리셋된다
userInput.addEventListener("focus", function(){ // 유저가 숫자를 입력한후 input창에 커서를 클릭하면 숫자가 사라진다.
  userInput.value = "";
});


function pickRandomNum(){ // 1.랜덤번호 지정
    randomNum = Math.floor(Math.random() * 100)+1 ;
    console.log("정답", randomNum);
}

function play(){// 2.유저가 번호를 입력한다.
    let userValue = userInput.value


    if(userValue < 1 || 100 < userValue){ // 찬스가 소모되기 전에 코드를 넣어줘야 유저가 100 보다 많은 숫자를 입력할씨 찬스가 깍이지 않는다.
      resultArea.textContent = "1 ~ 100 사이의 숫자를 입력해주세요!" // 8. 8.유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 그리고 기회를 깍지 않는다.
      return;
    }
    if(history.includes(userValue)){
      resultArea.textContent = "이미 입력한 값입니다."
      return;
    }
    chances --;
    chanceArea.textContent = `남은기회:${chances}번`  // 정적인것과 동적인것을 동시에 넣고 싶을떄는 (백틱 ${}) 이다

    if(userValue < randomNum){ // 5.유저번호 < 랜덤넘버 = UP!!
        resultArea.textContent = "UP!!"
    }else if(userValue > randomNum){ // 4.유저번호 > 랜덤넘버 = Down!!
        resultArea.textContent = "Down!!"
    }else{                           // 3. 유저번호 === 랜덤넘버 = 정답입니다.!    
        resultArea.textContent = "정답입니다!!"
        gameOver = true;
    }

    history.push(userValue) // 9.유저가 이미 입력한 숫자를 또 입력하면 알려준다. 그리고 기회를 깍지 않는다.
      console.log(history)

    if(chances < 1){ // 7. 유저가 5번의 기회를 다끄면 game over
      gameOver = true;
    }
    if(gameOver == true){
      playButton.disabled = true;
    }

}    
function reset(){//user input 창이 깨끗하게 정리되고 새로운 번호가 생긴다.
    userInput.value = ""; // 6.Reset 버튼을 누르면 게임시 리셋된다
    pickRandomNum();

    resultArea.textContent = "게임을 시작하세요!" // Reset이 된후 게임을 다시 시작하라고 알려준다.
}    
pickRandomNum();
