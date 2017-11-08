export default class enemy extends Phaser.sprite{

	constructor (game){

		super(game, 0, 0, 'Enemy');

		this.anchor.setTo(0.5,0.5);

		this.body.allowGravity = false;

		this.body.immovable = ture;

		this.body.collideWorldBounds = ture;

		//this.animations.add('die', [0, 1, 2, 3], 10, true);
	}

	// die

	//drop
};

import Enemy from 'Enemy';

class monsters extends Enemy{

	constructor (game){

		super(game);

		this.animations.add('monster1', [0], 1, true);

		this.animations.add('monster2', [0], 1, true);

		this.animations.add('monster3', [0], 1, true);

		



	}
}
