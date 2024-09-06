const playground = document.querySelector(".play-ground");
const ground = document.querySelector(".ground");
const scoreDisplay = document.querySelector("#score");
const userDir = { x: 10, y: 30 }
let currentUserX = userDir.x;
let currentUserY = userDir.y;
let score = 0;
const blocksPoints = [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 1, y: 3 },
    { x: 1, y: 4 },
    { x: 1, y: 5 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
    { x: 2, y: 3 },
    { x: 2, y: 4 },
    { x: 2, y: 5 },
    { x: 3, y: 1 },
    { x: 3, y: 2 },
    { x: 3, y: 3 },
    { x: 3, y: 4 },
    { x: 3, y: 5 },
    { x: 4, y: 1 },
    { x: 4, y: 2 },
    { x: 4, y: 3 },
    { x: 4, y: 4 },
    { x: 4, y: 5 },
    { x: 5, y: 1 },
    { x: 5, y: 2 },
    { x: 5, y: 3 },
    { x: 5, y: 4 },
    { x: 5, y: 5 },
    { x: 6, y: 1 },
    { x: 6, y: 2 },
    { x: 6, y: 3 },
    { x: 6, y: 4 },
    { x: 6, y: 5 },
    { x: 7, y: 1 },
    { x: 7, y: 2 },
    { x: 7, y: 3 },
    { x: 7, y: 4 },
    { x: 7, y: 5 },
    { x: 8, y: 1 },
    { x: 8, y: 2 },
    { x: 8, y: 3 },
    { x: 8, y: 4 },
    { x: 8, y: 5 }
];
let direction = 1; // 1 for right, -1 for left

// Start the movement of blocks
const movementInterval = setInterval(() => {
    moveBlocks();
    drawBlock();
}, 500);


// Move blocks along the X axis
const moveBlocks = () => {
    for (let i = 0; i < blocksPoints.length; i++) {
        blocksPoints[i].x = blocksPoints[i].x + direction;
    }

    // Reverse direction if the block reaches the boundary
    if (blocksPoints[0].x >= 20 - 7 || blocksPoints[0].x <= 1) {
        direction *= -1;
        setTimeout(() => {
            for (let i = 0; i < blocksPoints.length; i++) {
                blocksPoints[i].y += 1;
            }
        }, 100);
    }

    // if collision with user Handle
    blocksPoints.forEach(block => {
        if (block.y === currentUserY) {
            playground.innerHTML = "Game Over"
            clearInterval(movementInterval)
            document.removeEventListener("keydown", handleSpaceKey)
            document.removeEventListener("keydown", handleMove);
        }
    });
};

// Draw or update blocks on the playground
const drawBlock = () => {
    // Clear only the blocks, not the user handle
    const blocks = playground.querySelectorAll(".block");
    blocks.forEach(block => block.remove());

    for (let i = 0; i < blocksPoints.length; i++) {
        const block = document.createElement("div");

        let xAxis = blocksPoints[i].x;
        let yAxis = blocksPoints[i].y;

        block.style.gridColumn = xAxis;
        block.style.gridRow = yAxis;
        block.classList.add("block");
        playground.appendChild(block);

    }
};



// Drawing user 
const userHandle = () => {
    // Remove previous user element
    const existingUser = document.querySelector('.user');
    if (existingUser) existingUser.remove();

    // Create and append new user
    const user = document.createElement("div");
    user.classList.add("user");
    playground.appendChild(user);
    user.style.gridColumn = currentUserX;
    user.style.gridRow = currentUserY;
};


// Fireball function
const fireBall = () => {
    let fireBallX = currentUserX;
    let fireBallY = currentUserY - 1; // Start just above the user

    // Create fireball element
    const ball = document.createElement("div");
    ball.classList.add("fireball");
    playground.appendChild(ball);

    // Move fireball upwards
    const moveFireBall = setInterval(() => {
        fireBallY -= 1;

        // Check if fireball hits a block
        const hitBlockIndex = blocksPoints.findIndex(block => block.x === fireBallX && block.y === fireBallY);
        if (hitBlockIndex !== -1) {
            // Remove block and fireball on collision
            blocksPoints.splice(hitBlockIndex, 1);
            score++
            if (score < 40) {
                scoreDisplay.innerHTML = `Score : ${score}`;
            }
            else {
                winFunction()
            }
            clearInterval(moveFireBall);
            ball.remove();
            drawBlock(); // Redraw blocks after removing one
            return;
        }
        // Remove fireball if it goes off the screen
        if (fireBallY < 1) {
            clearInterval(moveFireBall);
            ball.remove();
        } else {
            ball.style.gridColumn = fireBallX;
            ball.style.gridRow = fireBallY;
        }
    }, 100);
};



// movement of User handle
const handleMove = (e) => {
    switch (e.key) {
        case "ArrowRight":
            if (currentUserX < 20) {
                currentUserX = currentUserX + 1;
                userHandle();
            }
            break;

        case "ArrowLeft":
            if (currentUserX > 1) {
                currentUserX = currentUserX - 1
                userHandle()
            }
            break;
        default:
            break;
    }
}

userHandle()

function handleSpaceKey(e) {
    if (e.key === " ") {
        fireBall();
    }
}
document.addEventListener("keydown", handleSpaceKey);
document.addEventListener("keydown", handleMove);

//  game winning function 
const winFunction = () => {
    scoreDisplay.innerHTML = `Score : ${score}`
    playground.textContent = "YOU WON GAME"
    clearInterval(movementInterval)
    document.removeEventListener("keydown", handleSpaceKey)
    document.removeEventListener("keydown", handleMove);

}
// Initialize the movement
handleMove()

// calling draw game function
drawBlock()

