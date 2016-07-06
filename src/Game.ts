/// <reference path="../tsDefinitions/phaser.comments.d.ts" />
/// <reference path="./data/elements/Ball.ts" />
/// <reference path="./data/elements/Paddle.ts" />
/// <reference path="./data/elements/Brick.ts" />

/// <reference path="./data/BricksGroup.ts" />

class Game {

    private _game: Phaser.Game;

    private _ball: Ball;
    private _paddle: Paddle;

    private _brick: Brick;
    private _brickGroup: BricksGroup;

    constructor() {

        this._game = new Phaser.Game(480, 320, Phaser.AUTO, null, {
            init: this.init,
            preload: this.preload,
            create: this.create,
            update: this.update,
            render: this.render
        });
    }

    protected init = () => {

        this._game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this._game.stage.backgroundColor = '#EEE';
    }

    protected preload = () => {

        Ball.preload(this._game);
        Paddle.preload(this._game);
        Brick.preload(this._game);
    }

    protected create = () => {

        this.setPhysics();
        this.setScale();

        this.createBall();
        this.createPaddle();
        this.createBricks();
    }

    private setPhysics(): void {

        this._game.physics.startSystem(Phaser.Physics.ARCADE);
        this._game.physics.arcade.checkCollision.down = false;
    }

    private setScale(): void {

        this._game.scale.pageAlignHorizontally = true;
        this._game.scale.pageAlignVertically = true;
    }

    private createBall(): void {

        var ballX: number = this._game.world.width * 0.5;
        var ballY: number = this._game.world.height - 25;

        this._ball = new Ball(this._game, ballX, ballY);
        this._ball.create();

        this._ball.events.onOutOfBounds.add(this.showGameOver, this);
    }

    private createPaddle(): void {

        var paddleX: number = this._game.world.width * 0.5;
        var paddleY: number = this._game.world.height - 5;

        this._paddle = new Paddle(this._game, paddleX, paddleY);
        this._paddle.create();
    }

    private createBricks(): void {

        this._brickGroup = new BricksGroup(this._game);
        this._brickGroup.create();
    }

    protected update = () => {

        this._ball.update();
        this._paddle.update();

        this._game.physics.arcade.collide(this._ball, this._paddle);

        this._game.physics.arcade.collide(this._ball, this._paddle);
        this._game.physics.arcade.collide(this._ball, this._brickGroup, this._brickGroup.ballHitBrick);

        this._paddle.x = this._game.input.x || this._game.world.width * 0.5;
    }

    protected render = () => {

    }

    private showGameOver = () => {

        alert('Game over!');

        //window.location.reload();
    }
}

window.onload = () => {

    var game = new Game();
}