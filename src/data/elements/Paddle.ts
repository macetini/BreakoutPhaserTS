/// <reference path="../../../tsDefinitions/phaser.comments.d.ts" />
/// <reference path="../Entity.ts" />

class Paddle extends Entity {

    static NAME: string = "paddle";

    constructor(game: Phaser.Game, x: number, y: number) {

        super(game, x, y, Paddle.NAME);
    }

    public static preload(game: Phaser.Game): void {

        super.preload(game, Paddle.NAME);
    }

    public create(): Entity {

        super.create();

        this.anchor.set(0.5, 1);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;

        return this;
    }

    public update(): void {

        super.update();

        this.x = this.game.input.x || this.game.world.width * 0.5;
    }

}