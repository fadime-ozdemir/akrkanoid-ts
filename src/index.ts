import { Ball } from "./sprites/Ball";
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { CanvasView } from "./view/CanvasView";
import { Collision } from "./Collision";
// images
import PADDLE_IMG from "./images/paddle.png";
import BALL_IMG from "./images/ball.png";
// levels and colors
import {
  BALL_SIZE,
  BALL_SPEED,
  BALL_STARTX,
  BALL_STARTY,
  PADDLE_HEIGHT,
  PADDLE_SPEED,
  PADDLE_STARTX,
  PADDLE_WIDTH,
} from "./setup";
// helpers
import { createBricks } from "./helpers";

let gameOver = false;
let score = 0;

function setGameOver(view: CanvasView) {
  view.drawInfo("Game over!");
  gameOver = false;
}

function setGameWin(view: CanvasView) {
  view.drawInfo("Game won!");
  gameOver = false;
}

function gameLoop(
  view: CanvasView,
  bricks: Brick[],
  paddle: Paddle,
  ball: Ball,
  collision: Collision
) {
  view.clear();
  view.drawBricks(bricks);
  view.drawSprite(paddle);
  view.drawSprite(ball);

  // move ball
  ball.moveBall();

  // move paddle and check it won't exit the playfield
  if (
    (paddle.isMovingLeft && paddle.pos.x > 0) ||
    (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
  ) {
    paddle.movePaddle();
  }

  collision.checkBallCollision(ball, paddle, view);
  const collidingBrick = collision.isCollidingBricks(ball, bricks);
  if (collidingBrick) {
    score += 1;
    view.drawScore(score);
  }

  //game over when ball leaves playfield
  if (ball.pos.y > view.canvas.height) gameOver = true;
  //game win
  if (bricks.length === 0) return setGameWin(view);

  // return if gameover and do not run the requestAnimationFrame
  if (gameOver) return setGameOver(view);

  requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision));
}

function startGame(view: CanvasView) {
  // reset all
  score = 0;
  view.drawInfo("");
  view.drawScore(0);

  // create collision
  const collision = new Collision();

  // create bricks, paddle and ball
  const bricks = createBricks();
  const ball = new Ball(
    BALL_SPEED,
    BALL_SIZE,
    {
      x: BALL_STARTX,
      y: BALL_STARTY,
    },
    BALL_IMG
  );
  const paddle = new Paddle(
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    {
      x: PADDLE_STARTX,
      y: view.canvas.height - PADDLE_HEIGHT - 5,
    },
    PADDLE_IMG
  );
  gameLoop(view, bricks, paddle, ball, collision);
}

// create a new view
const view = new CanvasView("#playField");
view.initStartButton(startGame);
