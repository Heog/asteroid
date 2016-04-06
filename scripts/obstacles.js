define(["three.min", "utils", "rock"], function (th, ut, ro){

  return{
    obstacles: function(name, world){
      this.name = name;
      this.obstacles = [];
      this.world = world;

      this.init = init;
      this.update = update;

      this.addObstacle = addObstacle;
      this.removeObstacle = removeObstacle;
    }
  }
  function init(){
  }
  function update(){
    if(this.obstacles.length == 0 ){
      for(var i=0 ; i< 8; i++){
        this.addObstacle(Math.pow(2, Math.floor(3+Math.random()*2)));
      }
    }

    for(var i=0; i<this.obstacles.length; i++)
    this.obstacles[i].update();
  }
  function addObstacle(size, startPosition, startVelocity){
    //var obs;
    this.obstacles.push(new ro.rock("asteroid1", size, this.world, startPosition, startVelocity));
    this.obstacles[this.obstacles.length-1].init();
  }
  function removeObstacle(obs){
    //console.log("remove");
    var pos = -1;
    for(var i = 0; i< this.obstacles.length; i++) {
      if(this.obstacles[i] == obs)
      pos = i;
    }
    if(pos != -1){
      this.obstacles[pos] = this.obstacles[this.obstacles.length-1];
      this.obstacles.length--;
      this.world.scene.remove(obs.mesh);
    }
  }
});
