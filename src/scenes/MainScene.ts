import { Ball } from "../data/elements/Ball";
import { Brick } from "../data/elements/Brick";
import { Paddle } from "../data/elements/Paddle";
import { Bricks } from "../data/group/Bricks";

/**
 * The MainScene class extends Phaser.Scene and contains the game logic for the Breakout game.
 */
export class MainScene extends Phaser.Scene {
    private static readonly KEY: string = "MainScene";

    private ball!: Ball;
    private paddle!: Paddle;
    private bricks!: Bricks;

    private infoText!: Phaser.GameObjects.Text;

    /**
     * Initializes a new MainScene.
     */
    constructor() {
        super(MainScene.KEY);
    }

    /**
     * Preloads assets required for the scene.
     */
    preload() {
        Ball.preload(this, Ball.NAME);
        Paddle.preload(this, Paddle.NAME);
        Brick.preload(this, Brick.NAME);
    }

    /**
     * Creates and sets up the game elements, HUD, and event handlers.
     */
    create() {
        this.createGameElements();
        this.setColliders();
        this.createHud();
        this.setEventHandlers();
    }

    /**
     * Initializes and displays the game elements.
     */
    private createGameElements(): void {
        this.paddle = new Paddle(this);
        this.paddle.show();

        this.ball = new Ball(this);
        this.ball.showOnPaddle(this.paddle);

        this.bricks = new Bricks(this);
        this.bricks.createBricks();
    }

    /**
     * Sets up collision handling between the ball and other game elements.
     */
    private setColliders(): void {
        this.physics.add.collider(this.ball, this.paddle);
        this.bricks.setColliders(this.ball);

    }

    /**
     * Creates the Heads-Up Display (HUD) for the game.
     */
    private createHud(): void {
        this.infoText = this.add.text(285, 350, ' Press SPACE to start.',
            {
                fontStyle: 'bold',
                color: '#000000'
            });
    }

    /**
     * Sets up event handlers for game interactions.
     */
    private setEventHandlers(): void {
        this.input.keyboard!.on('keydown-SPACE', this.keydownSPACEhandler, this);
        this.physics.world.on('worldbounds', this.worldboundsHandler, this);
    }

    /**
     * Handles the SPACE key press event to start or reset the game.
     * @param event - The keyboard event.
     */
    private keydownSPACEhandler(event: KeyboardEvent): void {
        if (!this.ball.OnPaddle) {
            this.resetScene();
        } else {
            this.ball.pushFromPaddle();
            this.infoText.visible = false;
        }
    }

    /**
     * Handles the event when the ball hits the world bounds, specifically the bottom.
     * @param body - The physics body of the game object.
     * @param up - Whether the collision was on the top side.
     * @param down - Whether the collision was on the bottom side.
     * @param left - Whether the collision was on the left side.
     * @param right - Whether the collision was on the right side.
     */
    private worldboundsHandler(
        body: Phaser.Physics.Arcade.Body,
        up: boolean,
        down: boolean,
        left: boolean,
        right: boolean): void {
        if (down && body.gameObject === this.ball) {
            this.ball.destroy();
            this.infoText.text = "Game Over. Press SPACE."
            this.infoText.visible = true;
        }
    }

    /**
     * Updates the game state for each frame.
     * @param time - The current time.
     * @param delta - The time elapsed since the last frame.
     */
    update(time: number, delta: number): void {
        super.update(time, delta);

        if (this.bricks.ChildrenCount <= 0) {
            if (this.bricks.ChildrenCount <= 0) {
                this.ball.destroy();
                this.infoText.text = " You Won! Press SPACE."
                this.infoText.visible = true;
            }
        }
    }

    /**
     * Resets the scene by stopping, restarting, and relaunching it.
     */
    private resetScene(): void {
        this.scene.stop(MainScene.KEY);
        this.scene.restart();
        this.scene.launch(MainScene.KEY);
    }
}