// Import the Phaser library, a popular open-source framework for creating HTML5 games.
import "phaser";

// Import the MainScene class, which is a custom scene for the game.
import { MainScene } from "./scenes/MainScene";

/**
 * The BreakoutGame class extends the Phaser.Game class and serves as the main entry point for the game.
 */
class BreakoutGame extends Phaser.Game {
    /**
     * The constructor initializes the game with a configuration object.
     */
    constructor() {
        // Define the game configuration object.
        const config: Phaser.Types.Core.GameConfig = {
            // The type of renderer to use (Phaser.AUTO, Phaser.CANVAS, or Phaser.WEBGL).
            type: Phaser.AUTO,
            // The width of the game canvas.
            width: 800,
            // The height of the game canvas.
            height: 600,
            // The background color of the game canvas.
            backgroundColor: '#c5c34f',
            // The ID of the div element in the index.html file where the game will be rendered.
            parent: "game-container",
            // The scene to use for the game (in this case, the MainScene class).
            scene: MainScene,
            // The scaling configuration for the game.
            scale: {
                // Center the game canvas horizontally and vertically.
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            // The physics configuration for the game.
            physics: {
                // The default physics system to use (in this case, the arcade physics system).
                default: "arcade",
                // The configuration for the arcade physics system.
                arcade: {
                    // Whether to enable debug mode for the physics system.
                    debug: false,
                },
            },
        };
        
        // Call the superclass constructor with the game configuration object.
        super(config);
    }

    /**
     * The init method is called when the game is initialized.
     */
    public init(): void {
        // Log a message to the console to indicate that the game has started.
        console.log("Game Start.");
    }
}

/**
 * The onload event handler is called when the window has finished loading.
 */
window.onload = () => {
    // Create a new instance of the BreakoutGame class.
    const game = new BreakoutGame();
    // Call the init method to initialize the game.
    game.init();
};