import { Ball } from "../elements/Ball";
import { Brick } from "../elements/Brick";

/**
 * A group of bricks that can be used in the Breakout game.
 *
 * @class Bricks
 * @extends Phaser.Physics.Arcade.Group
 */
export class Bricks extends Phaser.Physics.Arcade.Group {
    /**
     * The number of rows of bricks in the group.
     */
    private static readonly ROWS: number = 8;

    /**
     * The number of columns of bricks in the group.
     */
    private static readonly COLUMNS: number = 12;

    /**
     * The x-coordinate of the top-left corner of the group, relative to the game world.
     */
    private static readonly OFFSET_X: number = 70;

    /**
     * The y-coordinate of the top-left corner of the group, relative to the game world.
     */
    private static readonly OFFSET_Y: number = 50;

    /**
     * The padding between each brick in the group, in pixels.
     */
    private static readonly PADDING: number = 10;

    /**
     * Initializes a new Bricks group instance.
     * @param scene - The Phaser.Scene instance that owns this group.
     */
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene);
    }

    /**
     * Creates the bricks in the group and adds them to the scene.
     */
    public createBricks(): void {
        for (let i = 0; i < Bricks.ROWS; i++) {
            for (let j = 0; j < Bricks.COLUMNS; j++) {
                const x = Bricks.OFFSET_X + j * (Brick.WIDTH + Bricks.PADDING);
                const y = Bricks.OFFSET_Y + i * (Brick.HEIGHT + Bricks.PADDING);

                const brick = this.create(x, y, Brick.NAME);
                brick.setImmovable(true);
            }
        }
    }

    /**
     * Sets up collision handling between the given ball and the bricks in the group.
     * @param ball - The ball to collide with the bricks.
     */
    public setColliders(ball: Ball): void {
        this.children.entries.forEach((brick) => {
            this.scene.physics.add.collider(ball, brick, this.hitBrick);
        });
    }

    /**
     * Gets the number of children in the group.
     */
    public get ChildrenCount(): number {
        return this.children.entries.length;
    }

    /**
     * Handles the event when the ball hits a brick.
     * @param ball - The ball that hit the brick.
     * @param brick - The brick that was hit.
     */
    hitBrick(
        ball: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | Phaser.Tilemaps.Tile,
        brick: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | Phaser.Tilemaps.Tile): void {

        brick.destroy();
    }
}
