/// <reference path="../../../tsDefinitions/phaser.comments.d.ts" />
/// <reference path="../Entity.ts" />

class Brick extends Entity {

    static NAME: string = "brick";

    static BRICK_INFO = {
        width: 50,
        height: 20,
        count: {
            row: 7,
            col: 3
        },
        offset: {
            top: 50,
            left: 60
        },
        padding: 10
    };

    constructor(game: Phaser.Game, x: number = 0, y: number = 0) {

        var paddedWidth: number = Brick.BRICK_INFO.width + Brick.BRICK_INFO.padding;
        var offsetLeft: number = Brick.BRICK_INFO.offset.left;

        var brickX: number = x * paddedWidth + offsetLeft;

        var paddedHeight: number = Brick.BRICK_INFO.height + Brick.BRICK_INFO.padding;
        var offsetTop: number = Brick.BRICK_INFO.offset.top;

        var brickY: number = y * paddedHeight + offsetTop;

        super(game, brickX, brickY, Brick.NAME);
    }

    public static preload(game: Phaser.Game): void {

        super.preload(game, Brick.NAME);
    }

    public create(): Entity {

        super.create();

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
        this.anchor.set(0.5);

        return this;
    }
}