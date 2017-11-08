Game.Level1 = function(game){


};

var map;
var layer;
var player;
var control = {};
var playerSpeed = 150;
var jumpTimer = 0 ;

//function create(){
//		game.add.sprite(0, 0, 'sky');
//
//	};
Game.Level1.prototype = 
{

	create:function(){
		
		console.log("color start");
	
		this.stage.backgroundColor = '#00AEFF';

		this.physics.arcade.gravity.y = 1400;

		map = this.add.tilemap ('begin', 64,64);

		map.addTilesetImage('tilesets');

		
		layer = map.createLayer(0);

		layer.resizeWorld();

		player = game.add.sprite(32,150, 'player');

		map.setCollisionBetween(0,2);

		player.anchor.setTo(0.5,0.5);

		player.animations.add('left', [0, 1, 2, 3], 10, true);
   		player.animations.add('right', [5, 6, 7, 8], 10, true);
   		player.animations.add('idle', [4], 10, true);

		this.physics.arcade.enable(player);

		this.camera.follow(player);

		player.body.collideWorldBounds = true;



	/*	control = {

			right: this.input.keyboard.addkey(Phaser.Keyboard.D),
			right: this.input.keyboard.addkey(Phaser.Keyboard.D),
			right: this.input.keyboard.addkey(Phaser.Keyboard.D),
		}
	*/
		cursors = game.input.keyboard.createCursorKeys();

	},
	
	update: function()
	{

		this.physics.arcade.collide(player,layer);

		player.body.velocity.x = 0;


	if (cursors.left.isDown)
	{
        
        player.body.velocity.x -= playerSpeed;

        player.animations.play('left');
    }
  	else if (cursors.right.isDown)
  	{

        player.body.velocity.x += playerSpeed;

        player.animations.play('right');
    }
    else
    {
        
        player.animations.stop();

        player.animations.play('idle');

        player.frame = 4;
    }
    
    
    if (cursors.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer)
    {

		player.body.velocity.y = -600;

		jumpTimer = this.time.now + 600;

    }

}

	}