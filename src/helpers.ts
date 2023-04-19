import {
  BRICK_ENERGY,
  BRICK_HEIGHT,
  BRICK_IMAGES,
  BRICK_PADDING,
  BRICK_WIDTH,
  LEVEL,
  STAGE_COLS,
  STAGE_PADDING,
} from "./setup";
import { Brick } from "./sprites/Brick";

export function createBricks(): Brick[] {
  return LEVEL.reduce((ack, cell, i) => {
    const row = Math.floor((i + 1) / STAGE_COLS);
    const col = i % STAGE_COLS;

    // calculate X and Y of the cell in the game of current cell/brick
    const x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING);
    const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);

    if (cell === 0) return ack;

    return [
      ...ack,
      new Brick(
        BRICK_WIDTH,
        BRICK_HEIGHT,
        {
          x,
          y,
        },
        BRICK_ENERGY[cell],
        BRICK_IMAGES[cell]
      ),
    ];
  }, [] as Brick[]);
}
