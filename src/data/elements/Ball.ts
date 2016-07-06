/// <reference path="../../../tsDefinitions/phaser.comments.d.ts" />
/// <reference path="../Entity.ts" />

class Ball extends Entity {

    static NAME: string = "ball";

    private _speed: number = 1;

    private _bounce: number = 1;
    private _velocity: number = 150;

    constructor(game: Phaser.Game, x: number, y: number) {

        super(game, x, y, Ball.NAME);
    }

    public static preload(game: Phaser.Game): void {

        super.preload(game, Ball.NAME);
    }

    public create(): Entity {

        super.create();

        this.checkWorldBounds = true;
        this.anchor.set(0.5);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.collideWorldBounds = true;
        this.body.bounce.set(this._bounce);
        this.body.velocity.set(this._velocity, -1 * this._velocity);

        return this;
    }
}