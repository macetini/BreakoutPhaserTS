/// <reference path="../../tsDefinitions/phaser.comments.d.ts" />

class Entity extends Phaser.Sprite {

    static ASSETS_IMG_URL: string = "assets/img/";
    static PNG_EXT: string = ".png";

    private _name: string;

    constructor(game: Phaser.Game, x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number) {

        super(game, x, y, key, frame);

        this._name = <string>key;
    }

    public get name(): string {

        return this._name;
    }

    public static preload(game?: Phaser.Game, name?: string): void {

        game.load.image(name, Entity.ASSETS_IMG_URL + name + Entity.PNG_EXT);
    }

    public create(newX?: number, newY?: number): Entity {

        if (newX !== undefined) {
            this.x = newX;
        }

        if (newY !== undefined) {
            this.y = newY;
        }

        return this.game.add.existing(this);
    }

    public update(): void {

    }
}