define(["three.min", "utils"], function (th, ut){

  //console.log("player cons");

  return{
    rock: function(name, size, world, startPosition, startVelocity){
      this.name = name;
      this.geometry = new THREE.SphereGeometry(size, 6, 4 );
      this.material = new THREE.MeshPhongMaterial( {color: 0xffff00, shading: THREE.FlatShading, shininess: 0.2} );
      this.mesh = new THREE.Mesh( this.geometry, this.material );
      this.velocity = new THREE.Vector2(0, 0);
      this.revolution = new THREE.Vector2((0.5 - Math.random())/20, (0.5 - Math.random())/20);
      this.startPosition = startPosition;
      this.startVelocity = startVelocity;
      this.world = world;
      this.size = size;
      this.intersects = [];
      this.rays = [new THREE.Raycaster(), new THREE.Raycaster(), new THREE.Raycaster(), new THREE.Raycaster()];
      this.init = init;
      this.update = update;
      this.setRays = setRays;
      this.collid = collid;

    }
  }

function collid(){
  //console.log("collid rock");
  //this.world.scene.remove(this.mesh);
  if(this.size > 4){
    this.world.obstacles.addObstacle(this.size / 2, this.mesh.position, this.velocity);
    this.world.obstacles.addObstacle(this.size / 2, this.mesh.position, this.velocity.negate());
  }
  this.world.obstacles.removeObstacle(this);
}

  function setRays(){
    this.rays[0].set(this.mesh.position, new THREE.Vector3(1,0,0));
    this.rays[1].set(this.mesh.position, new THREE.Vector3(-1,0,0));
    this.rays[2].set(this.mesh.position, new THREE.Vector3(0,1,0));
    this.rays[3].set(this.mesh.position, new THREE.Vector3(0,-1,0));

    var intersectsXp = this.rays[0].intersectObjects(this.world.scene.children);
    var intersectsXm = this.rays[1].intersectObjects(this.world.scene.children);
    var intersectsYp = this.rays[2].intersectObjects(this.world.scene.children);
    var intersectsYm = this.rays[3].intersectObjects(this.world.scene.children);

    this.intersects = intersectsXp.concat(intersectsXm, intersectsYp, intersectsYm);
  }

  function init(){

    this.mesh.position.setZ(0);
    this.mesh.rotation.set(0, 0, 0);

    if(this.startPosition === undefined){
      this.mesh.position.setX(Math.pow(-1, Math.floor( 2 * Math.random())) * this.world.cameraDistanceX/1.5 + this.world.cameraDistanceX * (0.5 * Math.random()));
      this.mesh.position.setY(Math.pow(-1, Math.floor( 2 * Math.random())) * this.world.cameraDistanceY/1.5 + this.world.cameraDistanceY * (0.5 * Math.random()));
    }
    else{
      this.mesh.position.setX(this.startPosition.x);
      this.mesh.position.setY(this.startPosition.y);


    }
    if(this.startVelocity === undefined){
      this.velocity.setX(60  * (0.5 - Math.random()));
      this.velocity.setY(40 * (0.5 - Math.random()));
    }
    else{
      this.velocity.setX(this.startVelocity.x);
      this.velocity.setY(this.startVelocity.y);
    }

    //console.log( " vel : " + this.velocity.x + " , " + this.velocity.y);

    this.world.scene.add(this.mesh);
  }

  function update(){
    ut.moveBox2D(this.world, this);

    this.mesh.rotation.x += this.revolution.x;
    this.mesh.rotation.y += this.revolution.y;


    this.setRays();

    for ( var i = 0; i < this.intersects.length; i++ ) {
      if(this.intersects[i].object.id == this.world.player.mesh.id && this.intersects[i].distance < (this.size+2)){
          this.collid();
          this.world.player.collid();
      }
      for(var j = 0; j<this.world.player.bullets.bullets.length; j++){
        if(this.intersects[i].object.id == this.world.player.bullets.bullets[j].mesh.id && this.intersects[i].distance < (this.size)){
          this.collid();
          this.world.player.bullets.bullets[j].collid();
        }
      }
    }
  }
});
