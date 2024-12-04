import Phaser from 'phaser';

// Define an interface that extends MatterJS.BodyType
interface MatterBody extends MatterJS.BodyType {
    label: string;
}

class Ball extends Phaser.Physics.Matter.Image {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene.matter.world, x, y, texture);
        scene.add.existing(this);

        this.initPhysics();
    }

    private initPhysics() {
        this.setCircle(10);
        this.setBounce(0.9);
        this.setFriction(0.005);
        this.setFrictionAir(0.01);
        this.setFixedRotation();

        // Use the extended interface
        const body = this.body as MatterBody;
        body.label = 'ball';
    }
}

export default Ball;