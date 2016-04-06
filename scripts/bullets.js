define(["three.min", "utils", "bullet"], function (th, ut, bu){

  return{
    bullets: function(name, world){
      this.name = name;
      this.bullets = [];
      this.world = world;

      this.init = init;
      this.update = update;

      this.addBullet = addBullet;
      this.removeBullet = removeBullet;

      this.collid = collid;
    }
  }
  function init(){
  }
  function update(){
    for(var i=0; i<this.bullets.length; i++)
      this.bullets[i].update();
  }
  function addBullet(){
    this.bullets.push(new bu.bullet(this.world));
    this.bullets[this.bullets.length-1].init();
  }
  function removeBullet(obs){
    //console.log("remove");
    var pos = -1;
    for(var i = 0; i< this.bullets.length; i++) {
        if(this.bullets[i] == obs)
          pos = i;
    }
    if(pos != -1){
      this.bullets[pos] = this.bullets[this.bullets.length-1];
      this.bullets.length--;
      this.world.scene.remove(obs.mesh);
    }
  }

  function collid(){
    for(var i=0; i<this.bullets.length; i++)
      this.bullets[i].collid();
  }
});
