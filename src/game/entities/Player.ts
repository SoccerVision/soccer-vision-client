import Phaser from 'phaser';
import {PlayerData} from '../types/PlayerTypes';

class Player extends Phaser.Physics.Matter.Sprite {
    private playerData: PlayerData;
    private team: string;
    private speed: number;
    private playerState: 'Idle' | 'ChasingBall' | 'PossessingBall' = 'Idle';

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        playerData: PlayerData,
        team: string
    ) {
        super(scene.matter.world, x, y, texture);
        this.scene.add.existing(this);

        this.playerData = playerData;
        this.team = team;

        // Calculate speed based on player's athletic stats
        this.speed = this.playerData.Stats.Athletic!.Speed / 10;

        this.initPhysics();
    }

    private initPhysics() {
        this.setCircle(16); // Adjust radius as necessary
        this.setFixedRotation();
        this.setFrictionAir(0.05);
    }

    public update(ball: Phaser.Physics.Matter.Image) {
        if (this.shouldChaseBall(ball)) {
            this.state = 'ChasingBall';
        } else {
            this.state = 'Idle';
        }

        // Decision-making logic
        if (this.isCloseToBall(ball)) {
            this.playerState = 'ChasingBall';
        } else {
            this.playerState = 'Idle';
        }

        // Execute behavior based on current state
        switch (this.state) {
            case 'ChasingBall':
                this.chaseBall(ball);
                break;
            case 'Idle':
                this.idle();
                break;
            // Add more cases for additional states
        }

        const direction = new Phaser.Math.Vector2(ball.x - this.x, ball.y - this.y).normalize();
        const speed = 2; // Adjust speed as needed
        this.setVelocity(direction.x * speed, direction.y * speed);

    }

    private isCloseToBall(ball: Phaser.Physics.Matter.Image): boolean {
        const distance = Phaser.Math.Distance.Between(this.x, this.y, ball.x, ball.y);
        return distance < 200; // Adjust threshold as needed
    }

    private chaseBall(ball: Phaser.Physics.Matter.Image) {
        const speedStat = this.playerData.Stats.Athletic!.Speed;
        const maxSpeed = speedStat / 50; // Adjust scaling as needed
        const direction = new Phaser.Math.Vector2(ball.x - this.x, ball.y - this.y).normalize();
        this.setVelocity(direction.x * maxSpeed, direction.y * maxSpeed);
    }

    private shouldChaseBall(ball: Phaser.Physics.Matter.Image): boolean {
        // Logic based on player stats and position
        return true; // Placeholder
    }

    private idle() {
        // Stop moving
        this.setVelocity(0, 0);
    }

    // Optional: Handle ball possession
    public onBallCollision(ball: Phaser.Physics.Matter.Image) {
        this.state = 'PossessingBall';
        // Additional logic for possessing the ball
    }

    private possessBall(ball: Phaser.Physics.Matter.Image) {
        // Logic for possessing the ball
        ball.setPosition(this.x, this.y);
        ball.setVelocity(this.body!.velocity.x, this.body!.velocity.y);
    }

    public updateSize(newSize: number) {
        this.setDisplaySize(newSize, newSize);

        // Adjust the physics body
        const radius = newSize / 2;
        this.setCircle(radius);
        this.setFixedRotation();
    }
}

export default Player;