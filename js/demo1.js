        function preload () {
            this.load.tilemapTiledJSON('map', 'assets/demo1/demo1.json');
            this.load.spritesheet('tiles', 'assets/demo1/demo1.png', {frameWidth: 64, frameHeight: 64});
            //this.load.spritesheet('tiles', 'assets/demo1/demo1.png', { frameWidth: 64, frameHeight: 64, margin: 1, spacing: 2 });
            this.load.atlas('CLAW', 'assets/claw/CLAW.png', 'assets/claw/CLAW.json');
            this.load.spritesheet('COIN', 'assets/coin/coin.png', { frameWidth: 28, frameHeight: 29 });
            this.load.audio('DEMO1_MUSIC', 'assets/demo1/demo1.mp3');
        }
        
        function create () {
            // load the map 
            map = this.make.tilemap({key: 'map'});
            // tiles for the ground layer
            var groundTiles = map.addTilesetImage('demo1', 'tiles');
            // create the ground layer
            groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
            // the player will collide with this layer
            groundLayer.setCollisionByExclusion([-1]);
            // set the boundaries of our game world
            this.physics.world.bounds.width = groundLayer.width;
            this.physics.world.bounds.height = groundLayer.height;
            // create the player sprite    
            player = this.physics.add.sprite(400, 2800, 'CLAW'); 
            player.setBounce(0.2); // our player will bounce from items
            player.setCollideWorldBounds(true); // don't go out of the map
            this.physics.add.collider(groundLayer, player);
            // set bounds so the camera won't go outside the game world
            this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
            // make the camera follow the player
            this.cameras.main.startFollow(player);
            // set background color, so the sky is not black    
            this.cameras.main.setBackgroundColor('#000000'); 

            this.anims.create({
                key: 'idle',
                frames: this.anims.generateFrameNames('CLAW',
                    {prefix: 'CLAW_', start: 11, end: 18}),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'run',
                frames: this.anims.generateFrameNames('CLAW',
                    {prefix: 'CLAW_', start: 1, end: 10}),
                frameRate: 10
            });

            this.anims.create({
                key: 'coins',
                frames: this.anims.generateFrameNumbers('COIN', { start: 0, end: 8 }),
                frameRate: 11
            });

            //MUSIC
            this.music = this.sound.add("DEMO1_MUSIC");
            this.music.play();

        }
        
        function update (time, delta) {
            cursors = this.input.keyboard.createCursorKeys();
            
                if (cursors.left.isDown) {
                    player.setVelocityX(-270);
                    player.flipX = true;
                    player.anims.play('run', true);
                    
                }else if (cursors.right.isDown) {
                    player.setVelocityX(270);
                    player.flipX = false;
                    player.anims.play('run', true);
                }else {
                    player.setVelocityX(0);
                    player.anims.play('idle', true);
                }

                if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor()) {
                    player.body.setVelocityY(-400); // jump up
                }
        }
