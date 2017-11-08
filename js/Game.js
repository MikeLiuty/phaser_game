function GameMain(game){
    {
        var map;
        var layer;
        var player;
        var playerSpeed = 150;
        var jumpTimer = 0;
        var cursors;
        var txt1;
        var tween;
        var sign;
        var npc;
        var txt;
        var enemies;
        var brown;
        var brownTween;
        var overscreen;
        var overtween;
        var bulletTime = 0;
        var bullet;

        this.create = function (game) {

            console.log('3');
            this.stage.backgroundColor = '#00AEFF';
            this.physics.arcade.gravity.y = 1400;
            map = this.add.tilemap('begin', 64, 64);
            map.addTilesetImage('tilesets');
            layer = map.createLayer(0);
            layer.resizeWorld();

            npc = game.add.sprite(840, 400, 'npc');
            map.setCollisionBetween(0, 10, true);
            npc.anchor.setTo(0.5, 0.5);
            npc.animations.add('idle', [0], false);
            this.physics.arcade.enable(npc);
            npc.body.collideWorldBounds = true;
            npc.body.immovable = true;

            player = game.add.sprite(32, 150, 'player');
            map.setCollisionBetween(0, 2);
            player.anchor.setTo(0.5, 0.5);
            player.animations.add('left', [0, 1, 2, 3], 10, true);
            player.animations.add('right', [5, 6, 7, 8], 10, true);
            player.animations.add('idle', [4], 10, true);
            this.physics.arcade.enable(player);
            this.camera.follow(player);
            player.body.collideWorldBounds = true;

            txt = game.add.sprite(800, 170, 'txt');
            txt.visible = false;

            txt1 = game.add.sprite(710, 330, 'txt1');
            txt1.anchor.setTo(0.5, 0.5);
            txt1.inputEnabled = true;
            txt1.scale.set(0);

            sign = this.game.add.text(900, 580, 'Click ');
            sign.font = 'Comic Sans MS';
            sign.fontSize = 30;
            sign.fill = 'white';
            sign.fontWeight = 'bold';
            sign.setShadow(10, 5, 'black', 0);
            sign.visible = false;

            bullets = game.add.group();
            bullets.enableBody = true;
            bullets.physicsBodyType = Phaser.Physics.ARCADE;

            for (var i = 0; i < 100; i++) {
                var b = bullets.create(0, 0, 'bullet');
                b.name = 'bullet' + i;
                b.exists = false;
                b.visible = false;
                b.checkWorldBounds = true;
                //b.events.onOutOfBounds.add(this.resetBullet, this);
            }

            //control
            cursors = game.input.keyboard.createCursorKeys();
            game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);


        },
            this.update = function () {
                {
                    this.physics.arcade.collide(player, layer);
                    this.physics.arcade.collide(player, npc);
                    this.physics.arcade.collide(layer, npc);
                    this.physics.arcade.collide(layer, enemies);
                    this.physics.arcade.overlap(enemies, player, this.die, null, this);
                    this.physics.arcade.overlap(bullets, enemies, this.collisionHandler, null, this);

                    player.body.velocity.x = 0;

                    if (cursors.left.isDown) {
                        player.body.velocity.x -= playerSpeed;
                        player.animations.play('left');
                    }

                    else if (cursors.right.isDown) {
                        player.body.velocity.x += playerSpeed;
                        player.animations.play('right');
                    }

                    else {
                        player.animations.stop();
                        player.animations.play('idle');
                        //player.frame = 4;
                    }

                    if (cursors.up.isDown && (player.body.onFloor()) && this.time.now > jumpTimer) {
                        player.body.velocity.y = -600;
                        jumpTimer = this.time.now + 600;
                    }

                    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                        this.fireBullet();
                    }
                    //control conditions
                    if (game.physics.arcade.distanceBetween(player, npc) < 80) {
                        txt.visible = true;
                        this.input.onDown.add(this.openWindow, this);
                        sign.visible = true;
                        console.log("too close?");
                    }
                }
            };
        this.openWindow = function () {
            tween = game.add.tween(txt1.scale).to({x: 1, y: 1}, 1300, Phaser.Easing.Elastic.Out, true);
            game.time.events.add(Phaser.Timer.SECOND * 2, this.next);

            console.log("before monster created");
        };

        this.render = function () {
            game.debug.spriteInfo(player, 32, 32);
            // game.debug.spriteInfo(brown, 400, 32);
        };
        this.next = function () {
            sign.destroy();
            npc.destroy();
            txt.destroy();
            txt1.destroy();
            //enemies.visible = true;
            enemies = game.add.physicsGroup(Phaser.Physics.ARCADE);
            game.physics.arcade.enable(enemies);

            enemies.inputEnabled = true;
            for (var i = 0; i < 8; i++) {
                var brown = enemies.create(Math.random() * 1264, 120 + Math.random() * 150, 'ball');
                brown.name = 'brown' + i;
                brown.anchor.setTo(0.5, 0.5);
                brown.enableBody = true;
                // brownTween = game.add.tween(brown).to(
                //     { x: this.rnd.realInRange(-2000, 2000)}, this.rnd.realInRange(1000, 3000), Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
                brown.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
            }
            console.log('brown')
            enemies.setAll('body.collideWorldBounds', true);
            enemies.setAll('body.bounce.x', 1);
            enemies.setAll('body.bounce.y', 1);
            enemies.setAll('body.gravity.y = 10', 1)
            if (enemies==0){
                this.restart();
                console.log('1?');
            }

            //enemies.visible = true;
            //game.add.sprite(0,430,'fireball');
        };

        this.fireBullet = function () {

            {

                if (game.time.now > bulletTime) {
                    bullet = bullets.getFirstExists(false);

                    //if (bullet) {
                        bullet.reset(player.x , player.y );
                        bullet.body.velocity.y = -500;
                        bulletTime = game.time.now + 300;
                    //}
                }

            }

           // this.resetBullet = function (bullet) {

             //   bullet.kill();

           // };

            this.collisionHandler = function (bullet, brown) {

                bullet.kill();
                brown.kill();

            };

            this.die = function () {
                player.kill();
                console.log('die?');
                this.gameover();
            };

            this.gameover = function () {
                overscreen = game.add.sprite(game.camera.x + 380, game.camera.y + 300, 'game-over');
                overscreen.anchor.setTo(0.5, 0.5);
                overscreen.scale.set(0.5);
                overtween = game.add.tween(overscreen.scale).to({x: 2, y: 2}, 8000, Phaser.Easing.Linear.None, true);
                overtween.onComplete.add(this.restart);

                console.log('over?');
            };

            this.restart = function () {
                game.state.start('boot');
            }


        }
    }}



