import { Entity } from "../Entity";

/**
 * The Paddle class represents the player's paddle in the Breakout game.
 * It extends the Entity class and provides functionality for displaying,
 * controlling, and updating the paddle's position based on user input.
 */
export class Paddle extends Entity {
    /**
     * The name of the paddle game object.
     */
    public static readonly NAME: string = "paddle";

    /**
     * The offset from the bottom of the screen to position the paddle.
     */
    private static readonly BOTTOM_OFFSET: number = 30;
    
    /**
     * The speed at which the paddle moves.
     */
    private static readonly MOVE_SPEED: number = 200;

    /**
     * The key to move the paddle left.
     */
    private keyLeft!: Phaser.Input.Keyboard.Key;

    /**
     * The key to move the paddle right.
     */
    private keyRight!: Phaser.Input.Keyboard.Key;

    /**
     * Creates a new Paddle instance.
     * @param scene - The Phaser.Scene instance that owns this Paddle.
     */
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, Paddle.NAME, 0);
        this.visible = false;
    }

    /**
     * Initializes the Paddle by adding it to the scene and setting up physics.
     */
    init(): void {
        super.init();

        this.body!.immovable = true; 
        this.setCollideWorldBounds(true);       

        this.keyLeft = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRight = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    /**
     * Shows the paddle at the bottom of the screen.
     */
    public show(): void {
        const centerX = (this.scene.game.config.width as number) / 2;
        this.x = centerX;

        const bottomPos = (this.scene.game.config.height as number) - Paddle.BOTTOM_OFFSET;
        this.y = bottomPos;

        this.visible = true;
    }

    /**
     * Updates the paddle's velocity based on the key presses.
     * @param time - The current time.
     * @param delta - The time elapsed since the last frame.
     */
    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);

        this.setVelocityX(0);
       
        if (this.keyLeft.isDown) {
            this.setVelocityX(-Paddle.MOVE_SPEED);
        } else if (this.keyRight.isDown) {
            this.setVelocityX(Paddle.MOVE_SPEED);
        }
    }
}
