let ball = {
    x: 0,
    y: 0
};

function AppInit(){
    let kulka = document.querySelector('.ball');

    const ballStartXPos = Math.random() * window.innerWidth;
    const ballStartYPos = Math.random() * window.innerHeight;
    console.log(ballStartXPos);
 
    ball.x = ballStartXPos;
    ball.y = ballStartYPos;
    kulka.style.top = ball.x;
    kulka.style.left= ball.y;
    //kulka.style.backgroundColor = '#ffffff';
}
function createBall(){
    const htmlNote = document.querySelector('body');
    const ball = document.createElement('div');
    htmlNote.appendChild(ball);
    ball.classList.add('.ball');
}

function HoleIntit(){
    let holes = document.querySelectorAll('.hole');
    for (let index = 0; index < holes.length; index++) {
        const holeStartXPosition = Math.random() * window.innerWidth;
        const holeStartYPos = Math.random() * window.innerHeight;
        holes[index].style.left = holeStartXPosition;
        holes[index].style.top = holeStartYPos;
    }
}
createBall();
// AppInit();
// HoleIntit();