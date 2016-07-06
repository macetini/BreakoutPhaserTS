/// <reference path="../../tsDefinitions/phaser.comments.d.ts" />
/// <reference path="./elements/Brick.ts" />

class BricksGroup extends Phaser.Group {

    public static NAME: string = "bricks"

    constructor(game: Phaser.Game)
    {
        super(game, game.world, BricksGroup.NAME, true);
    }

    public create(): BricksGroup {

        var newBrick: Brick;

        for (var c: number = 0; c < Brick.BRICK_INFO.count.col; c++) {

            for (var r: number = 0; r < Brick.BRICK_INFO.count.row; r++) {

                newBrick = new Brick(this.game, r, c);
                newBrick.create();

                this.add(newBrick);
            }
        }

        return this;
    }

    public ballHitBrick = (ball: Phaser.Sprite, brick: Phaser.Sprite) => {

        brick.kill();
    }
}