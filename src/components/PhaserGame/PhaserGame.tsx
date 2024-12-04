import React, { useEffect } from 'react';
import Phaser from 'phaser';
import MainScene from '../../game/scenes/MainScene';

const PhaserGame: React.FC = () => {
    useEffect(() => {
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            parent: 'phaser-game',
            physics: {
                default: 'matter',
                matter: {
                    gravity: { x: 0, y: 0 },
                    debug: true,
                },
            },
            scene: [MainScene],
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: 800, // Use a base width
                height: 600, // Use a base height
            },
            backgroundColor: '#000000',
        };

        const game = new Phaser.Game(config);

        // Remove the manual resize handler
        // const resizeHandler = () => {
        //     game.scale.resize(window.innerWidth, window.innerHeight);
        // };

        // Remove the event listener registration
        // window.addEventListener('resize', resizeHandler);

        // Optional: Add event listener for fullscreen toggle
        const fullscreenHandler = (event: KeyboardEvent) => {
            if (event.code === 'KeyF') {
                if (game.scale.isFullscreen) {
                    game.scale.stopFullscreen();
                } else {
                    game.scale.startFullscreen();
                }
            }
        };

        document.addEventListener('keydown', fullscreenHandler);

        return () => {
            game.destroy(true);
            // Remove the resize event listener if it was added
            // window.removeEventListener('resize', resizeHandler);
            document.removeEventListener('keydown', fullscreenHandler);
        };
    }, []);

    return <div id="phaser-game" style={{ width: '100%', height: '100%' }} />;
};

export default PhaserGame;