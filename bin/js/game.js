/// <reference path="../../tsDefinitions/phaser.comments.d.ts" />
class Entity extends Phaser.Sprite {
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);
        this._name = key;
    }
    get name() {
        return this._name;
    }
    static preload(game, name) {
        game.load.image(name, Entity.ASSETS_IMG_URL + name + Entity.PNG_EXT);
    }
    create(newX, newY) {
        if (newX !== undefined) {
            this.x = newX;
        }
        if (newY !== undefined) {
            this.y = newY;
        }
        return this.game.add.existing(this);
    }
    update() {
    }
}
Entity.ASSETS_IMG_URL = "assets/img/";
Entity.PNG_EXT = ".png";
/// <reference path="../../../tsDefinitions/phaser.comments.d.ts" />
/// <reference path="../Entity.ts" />
class Ball extends Entity {
    constructor(game, x, y) {
        super(game, x, y, Ball.NAME);
        this._speed = 1;
        this._bounce = 1;
        this._velocity = 150;
    }
    static preload(game) {
        super.preload(game, Ball.NAME);
    }
    create() {
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
Ball.NAME = "ball";
/// <reference path="../../../tsDefinitions/phaser.comments.d.ts" />
/// <reference path="../Entity.ts" />
class Paddle extends Entity {
    constructor(game, x, y) {
        super(game, x, y, Paddle.NAME);
    }
    static preload(game) {
        super.preload(game, Paddle.NAME);
    }
    create() {
        super.create();
        this.anchor.set(0.5, 1);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
        return this;
    }
    update() {
        super.update();
        this.x = this.game.input.x || this.game.world.width * 0.5;
    }
}
Paddle.NAME = "paddle";
/// <reference path="../../../tsDefinitions/phaser.comments.d.ts" />
/// <reference path="../Entity.ts" />
class Brick extends Entity {
    constructor(game, x = 0, y = 0) {
        var paddedWidth = Brick.BRICK_INFO.width + Brick.BRICK_INFO.padding;
        var offsetLeft = Brick.BRICK_INFO.offset.left;
        var brickX = x * paddedWidth + offsetLeft;
        var paddedHeight = Brick.BRICK_INFO.height + Brick.BRICK_INFO.padding;
        var offsetTop = Brick.BRICK_INFO.offset.top;
        var brickY = y * paddedHeight + offsetTop;
        super(game, brickX, brickY, Brick.NAME);
    }
    static preload(game) {
        super.preload(game, Brick.NAME);
    }
    create() {
        super.create();
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
        this.anchor.set(0.5);
        return this;
    }
}
Brick.NAME = "brick";
Brick.BRICK_INFO = {
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
/// <reference path="../../tsDefinitions/phaser.comments.d.ts" />
/// <reference path="./elements/Brick.ts" />
class BricksGroup extends Phaser.Group {
    constructor(game) {
        super(game, game.world, BricksGroup.NAME, true);
        this.ballHitBrick = (ball, brick) => {
            brick.kill();
        };
    }
    create() {
        var newBrick;
        for (var c = 0; c < Brick.BRICK_INFO.count.col; c++) {
            for (var r = 0; r < Brick.BRICK_INFO.count.row; r++) {
                newBrick = new Brick(this.game, r, c);
                newBrick.create();
                this.add(newBrick);
            }
        }
        return this;
    }
}
BricksGroup.NAME = "bricks";
/// <reference path="../tsDefinitions/phaser.comments.d.ts" />
/// <reference path="./data/elements/Ball.ts" />
/// <reference path="./data/elements/Paddle.ts" />
/// <reference path="./data/elements/Brick.ts" />
/// <reference path="./data/BricksGroup.ts" />
class Game {
    constructor() {
        this.init = () => {
            this._game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this._game.stage.backgroundColor = '#EEE';
        };
        this.preload = () => {
            Ball.preload(this._game);
            Paddle.preload(this._game);
            Brick.preload(this._game);
        };
        this.create = () => {
            this.setPhysics();
            this.setScale();
            this.createBall();
            this.createPaddle();
            this.createBricks();
        };
        this.update = () => {
            this._ball.update();
            this._paddle.update();
            this._game.physics.arcade.collide(this._ball, this._paddle);
            this._game.physics.arcade.collide(this._ball, this._paddle);
            this._game.physics.arcade.collide(this._ball, this._brickGroup, this._brickGroup.ballHitBrick);
            this._paddle.x = this._game.input.x || this._game.world.width * 0.5;
        };
        this.render = () => {
        };
        this.showGameOver = () => {
            alert('Game over!');
            //window.location.reload();
        };
        this._game = new Phaser.Game(480, 320, Phaser.AUTO, null, {
            init: this.init,
            preload: this.preload,
            create: this.create,
            update: this.update,
            render: this.render
        });
    }
    setPhysics() {
        this._game.physics.startSystem(Phaser.Physics.ARCADE);
        this._game.physics.arcade.checkCollision.down = false;
    }
    setScale() {
        this._game.scale.pageAlignHorizontally = true;
        this._game.scale.pageAlignVertically = true;
    }
    createBall() {
        var ballX = this._game.world.width * 0.5;
        var ballY = this._game.world.height - 25;
        this._ball = new Ball(this._game, ballX, ballY);
        this._ball.create();
        this._ball.events.onOutOfBounds.add(this.showGameOver, this);
    }
    createPaddle() {
        var paddleX = this._game.world.width * 0.5;
        var paddleY = this._game.world.height - 5;
        this._paddle = new Paddle(this._game, paddleX, paddleY);
        this._paddle.create();
    }
    createBricks() {
        this._brickGroup = new BricksGroup(this._game);
        this._brickGroup.create();
    }
}
window.onload = () => {
    var game = new Game();
};
//# sourceMappingURL=game.js.map