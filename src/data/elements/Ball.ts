import { Entity } from "../Entity";
import { Paddle } from "./Paddle";

/**
 * The Ball class represents the ball in the Breakout game.
 *
 * @class Ball
 * @extends Entity
 */
export class Ball extends Entity {
    public static readonly NAME: string = "ball";

    /**
     * The bounciness of the ball. 1 is perfect bounce, 0 is no bounce.
     */
    private static readonly BOUNCE: number = 1;

    /**
     * The speed of the ball as it moves across the screen.
     */
    private static readonly VELOCITY: number = 150;

    /**
     * The paddle that the ball is associated with.
     */
    private paddle!: Paddle;

    /**
     * Whether the ball is currently on the paddle. If true, the ball should not be moving.
     */
    private onPaddle: boolean = true;

    /**
     * Gets whether the ball is currently on the paddle.
     */
    public get OnPaddle(): boolean {
        return this.onPaddle;
    }

    /**
     * Creates a new Ball instance.
     * @param scene - The Phaser.Scene instance that owns this Ball.
     */
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, Ball.NAME, 0);
        this.visible = false;
    }

    /**
     * Initializes the Ball by adding it to the scene and setting up physics.
     */
    init() {
        super.init();

        this.body!.bounce.set(Ball.BOUNCE);
        this.setCollideWorldBounds(true, 1, 1, true);
    }

    /**
     * Shows the ball on the paddle.
     * @param paddle - The paddle to show the ball on.
     */
    public showOnPaddle(paddle: Paddle): void {
        this.paddle = paddle;

        const centerX = (this.scene.game.config.width as number) / 2;
        this.x = centerX;

        const bottomPos = paddle.y - paddle.height / 2 - this.height / 2;
        this.y = bottomPos;

        this.visible = true;
    }

    /**
     * Pushes the ball from the paddle.
     */
    public pushFromPaddle() {
        if (this.onPaddle) {
            this.onPaddle = false;

            const randomDirection: number = (Phaser.Math.Between(0, 1) * 2) - 1;
            this.body!.velocity.set(randomDirection * Ball.VELOCITY, -1 * Ball.VELOCITY);
        }
    }

    /**
     * Updates the ball's position.
     * @param time - The current time.
     * @param delta - The time elapsed since the last frame.
     */
    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);

        if (this.onPaddle) {
            this.x = this.paddle.x;
        }
    }
}
