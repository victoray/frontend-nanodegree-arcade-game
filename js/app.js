'use strict;'
// Enemies our player must avoid
// var Enemy = function() {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started
//
//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'images/enemy-bug.png';
// };
//
// // Update the enemy's position, required method for game
// // Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };
//
// // Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

class Enemy {
    constructor(x, y, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    update(dt) {
        this.x += dt * this.speed;
        if (this.x > 505) {
            this.x = -70;
        }

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    getCurrentPosition(){
        return [this.x, this.y];
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y, allEnemies) {
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        this.level = 1;
        this.score = 0;
        this.allEnemies = allEnemies;
        this.speed = 30;

    }

    update(key) {
        this.checkCollisions();
        if (this.y <= 0){
            this.levelUp();
            this.x = 220;
            this.y = 430;
        }
        switch (key) {
            case 'up':
                if (this.y - this.speed > -30) this.y -= this.speed;
                break;
            case 'down':
                if (this.y + this.speed < 450) this.y += this.speed;
                break;
            case 'left':
                if (this.x - this.speed > 0) this.x -= this.speed;
                break;
            case 'right':
                if (this.x + this.speed < 420) this.x += this.speed;
                break;
        }

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        this.update(key);
    }

    getCurrentPosition(){
        return [this.x, this.y];
    }

    checkCollisions(){

        for (const enemy of this.allEnemies){
            let enemyPos = enemy.getCurrentPosition();
            const test = enemyPos[0] + 30 > this.x && enemyPos[0] - 30 < this.x;
            const test2 = enemyPos[1] + 30 > this.y && enemyPos[1] - 30 < this.y;

            if (test2 && test){
                this.x = 220;
                this.y = 430;
            }
        }
    }

    levelUp(){
        this.allEnemies.add(new Enemy(Math.random() * 100, 145, Math.random() * 500));
    }

    reset(){

    }

}


const enemy4 = new Enemy(0, 60, 500);
const enemy3 = new Enemy(0, 145, 100);
const enemy = new Enemy(100, 225, 400);



const allEnemies = new Set([enemy, enemy3, enemy4]);
const player = new Player(220, 430, allEnemies);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        'ArrowUp': 'up',
        'ArrowRight': 'right',
        'ArrowDown': 'down',
        'ArrowLeft': 'left'
    };

    player.handleInput(allowedKeys[e.key]);
});
