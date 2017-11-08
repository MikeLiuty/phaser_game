function Level2(game){
    {
        var nplayer;
        var map;
        var layer;
        var nplayerSpeed = 150;
        var jumpTimer = 0 ;
        var ncursors;

        this.create = function(){
            this.stage.backgroundColor = '#ff004a';
            this.physics.arcade.gravity.y = 1400;
            map = this.add.tilemap ('begin', 64,64);
            map.addTilesetImage('tilesets');
            layer = map.createLayer(1);

            console.log('1');

            nplayer = game.add.sprite(game.world.centerX,game.world.centerY, 'nplayer');
            map.setCollisionBetween(0,1000,true);
            nplayer.anchor.setTo(0.5,0.5);
            nplayer.animations.add('left', [0, 1, 2, 3]);
            nplayer.animations.add('right', [5, 6, 7, 8]);
            nplayer.animations.add('idle', [4]);
            this.physics.arcade.enable(nplayer);
            this.camera.follow(nplayer);
            //nplayer.body.collideWorldBounds = true;
            console.log('2');

            ncursors = game.input.keyboard.createCursorKeys();
            nactKey  = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        }
        this.update = function() {
            {
                this.physics.arcade.collide(nplayer, layer);
                console.log('test collide between player and layer');
               // nplayer.body.velocity.x = 0;

                if (ncursors.left.isDown) {
                    nplayer.body.velocity.x -= nplayerSpeed;
                    nplayer.animations.play('left');
                }

                else if (ncursors.right.isDown) {
                    nplayer.body.velocity.x += nplayerSpeed;
                    nplayer.animations.play('right');
                }

                else {
                    nplayer.animations.stop();
                    nplayer.animations.play('idle');
                }

                if (ncursors.up.isDown && (nplayer.body.onFloor()) && this.time.now > jumpTimer) {
                    nplayer.body.velocity.y = -600;
                    jumpTimer = this.time.now + 600;
                }
            }}
        this.render = function () {
            game.debug.spriteInfo(nplayer, 60, 32);
            //game.debug.spriteInfo(npc, 300, 32);
        }
    }};
