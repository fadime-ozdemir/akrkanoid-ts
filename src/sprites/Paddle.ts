import { Vector } from "~/types";

export class Paddle {
  private paddleImage: HTMLImageElement = new Image();
  private moveLeft: boolean;
  private moveRight: boolean;
  constructor(
    private speed: number,
    private paddleWidth: number,
    private paddleHeight: number,
    private position: Vector,
    image: string
  ) {
    this.speed = speed;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.position = position;
    this.moveLeft = false;
    this.moveRight = false;
    this.paddleImage.src = image;

    // event listeners
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  // getters
  get width(): number {
    return this.paddleWidth;
  }

  get height(): number {
    return this.paddleHeight;
  }

  get pos(): Vector {
    return this.position;
  }

  get image(): HTMLImageElement {
    return this.paddleImage;
  }

  get isMovingLeft(): boolean {
    return this.moveLeft;
  }

  get isMovingRight(): boolean {
    return this.moveRight;
  }

  movePaddle(): void {
    if (this.moveLeft) this.position.x -= this.speed;
    if (this.moveRight) this.position.x += this.speed;
  }

  handleKeyUp = (e: KeyboardEvent): void => {
    if (e.code === "ArrorLeft" || e.key === "ArrorLeft") this.moveLeft = false;
    if (e.code === "ArrorRight" || e.key === "ArrorRight")
      this.moveRight = false;
  };

  handleKeyDown = (e: KeyboardEvent): void => {
    if (e.code === "ArrorLeft" || e.key === "ArrorLeft") this.moveLeft = true;
    if (e.code === "ArrorRight" || e.key === "ArrorRight")
      this.moveRight = true;
  };
}
