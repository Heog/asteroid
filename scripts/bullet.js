define(["three.min", "utils"], function (th, ut){

  return{
    bullet: function(world){
      this.name = name;
      this.size = 0.5;
      this.geometry = new THREE.CylinderGeometry( this.size, this.size, 8, 8 );
      this.material = new THREE.MeshPhongMaterial( {color: 0x00ffff, shading: THREE.FlatShading, shininess: 0.1} );
      this.mesh = new THREE.Mesh( this.geometry, this.material );
      this.velocity = new THREE.Vector2(0, 0);
      this.world = world;
      //this.rays = [new THREE.Raycaster(), new THREE.Raycaster(), new THREE.Raycaster(), new THREE.Raycaster()]
      //this.reset = reset;
      this.init = init;
      //this.setRays = setRays;
      //this.intersects = [];
      //this.getSize = getSize;
      this.update = update;
      this.collid = collid;

      this.timeLife;
    }
  }

  function init(){
    this.mesh.position.setX(this.world.player.mesh.position.x);
    this.mesh.position.setY(this.world.player.mesh.position.y);
    this.mesh.position.setZ(0);

    this.mesh.rotation.z = this.world.player.mesh.rotation.z;

    this.velocity.x += 8000 * this.world.delta * Math.sin( - this.world.player.mesh.rotation.z);
    this.velocity.y += 8000 * this.world.delta * Math.cos( - this.world.player.mesh.rotation.z);

    this.world.scene.add(this.mesh);

    this.timeLife = new THREE.Clock();
  }

  function update(){
    ut.moveBox2D(this.world, this);
    if(this.timeLife.getElapsedTime() > 1.5){
      this.collid();
    }
  }
  function collid(){
    //console.log("collid bubul");
    this.world.player.bullets.removeBullet(this);
  }
});
