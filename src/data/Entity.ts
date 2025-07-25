/**
 * The Entity class is a base class for all game entities, such as the ball, paddle, and bricks.
 * It extends Phaser.Physics.Arcade.Sprite and provides additional functionality for loading assets and setting up physics.
 */
export class Entity extends Phaser.Physics.Arcade.Sprite {
    /**
     * The URL of the assets folder, relative to the HTML file.
     */
    private static readonly ASSETS_IMG_URL: string = "assets/img/";
    /**
     * The file extension for PNG assets.
     */
    private static readonly PNG_EXT: string = ".png";

    /**
     * Creates a new Entity instance.
     * @param scene - The Phaser.Scene instance that owns this Entity.
     * @param x - The x-coordinate of the Entity in the scene.
     * @param y - The y-coordinate of the Entity in the scene.
     * @param assetName - The name of the asset to load for this Entity.
     * @param frame - The frame of the asset to load for this Entity.
     */
    constructor(scene: Phaser.Scene, x: number, y: number, assetName: string, frame?: string | number) {
        super(scene, x, y, assetName, frame);
        this.init();
    }

    /**
     * Initializes the Entity by adding it to the scene and setting up physics.
     */
    init(): void {
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        
        this.setOrigin(0.5, 0.5);
    }

    /**
     * Preloads the asset for this Entity in the scene.
     * @param scene - The Phaser.Scene instance that owns this Entity.
     * @param asset - The name of the asset to load for this Entity.
     */
    public static preload(scene: Phaser.Scene, asset: string): void {
        const assetPath: string = Entity.getAssetPath(asset);
        scene.load.image(asset, assetPath);
    }

    /**
     * Returns the path to the asset for this Entity.
     * @param asset - The name of the asset to load for this Entity.
     * @returns The path to the asset.
     */
    protected static getAssetPath(asset: string): string {
        return Entity.ASSETS_IMG_URL + asset + Entity.PNG_EXT;
    }
}
