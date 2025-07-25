import { Entity } from "../Entity";

/**
 * The Brick class represents a brick game object in the Breakout game.
 * It extends the Entity class and provides properties for the brick's
 * asset name, width, and height.
 */
export class Brick extends Entity {
    /**
     * The name of the asset to use for this class.
     */
    public static readonly NAME: string = "brick";

    /**
     * The width of the Brick game object.
     */
    public static readonly WIDTH: number = 50;

    /**
     * The height of the Brick game object.
     */
    public static readonly HEIGHT: number = 20;
}
