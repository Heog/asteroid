define(["three.min", "utils", "bullets"], function (th, ut, bu){

  //console.log("player cons");

  return{
    player: function(name, world){
      this.name = name;
      this.size = 4;
      this.geometry = new THREE.CylinderGeometry( 0, 4, this.size * 2, 8 );
      this.material = new THREE.MeshPhongMaterial( {color: 0xff00ff, shading: THREE.FlatShading, shininess: 0.1} );
      this.mesh = new THREE.Mesh( this.geometry, this.material );
      this.velocity = new THREE.Vector2(0, 0);
      this.world = world;
      this.reset = reset;
      this.init = init;
      this.update = update;
      this.collid = collid;
      this.bullets = new bu.bullets("bullets", this.world);
    }
  }

  function reset(){
    this.mesh.position.setX(0);
    this.mesh.position.setY(0);
    this.velocity = new THREE.Vector2(0, 0);
    //console.log("reset");
  }
function collid(){
  //console.log("collid player");
  this.reset();
}
  function update(){


    if ( this.world.moveLeft ) this.mesh.rotation.z += 0.1;
    if ( this.world.moveRight ) this.mesh.rotation.z -= 0.1;

    if ( this.world.moveForward ) {

      this.velocity.x += 80 * this.world.delta * Math.sin( - this.mesh.rotation.z);
      this.velocity.y += 80 * this.world.delta * Math.cos( - this.mesh.rotation.z);

    }
    if(this.world.fire && this.world.canFire){
        this.bullets.addBullet();
        this.world.canFire = false;
    }

    this.bullets.update();


    ut.moveBox2D(this.world, this);

    //this.setRays();

    /*for ( var i = 0; i < this.intersects.length; i++ ) {
      if(this.intersects[i].object.id == sphere.id && this.intersects[i].distance < 4)
      this.reset();
    }*/
  }

  function resetPlayer(){

  }
  function init(){
    this.mesh.position.setX(0);
    this.mesh.position.setY(0);
    this.mesh.position.setZ(0);
    this.mesh.rotation.set(0, 0, 0);
    this.velocity.setX(0);
    this.velocity.setY(0);

    this.world.scene.add(this.mesh);

  }
  /*function setRays(){
    this.rays[0].set(this.mesh.position, new THREE.Vector3(1,0,0));
    this.rays[1].set(this.mesh.position, new THREE.Vector3(-1,0,0));
    this.rays[2].set(this.mesh.position, new THREE.Vector3(0,1,0));
    this.rays[3].set(this.mesh.position, new THREE.Vector3(0,-1,0));

    var intersectsXp = this.rays[0].intersectObjects(scene.children);
    var intersectsXm = this.rays[1].intersectObjects(scene.children);
    var intersectsYp = this.rays[2].intersectObjects(scene.children);
    var intersectsYm = this.rays[3].intersectObjects(scene.children);

    this.intersects = intersectsXp.concat(intersectsXm, intersectsYp, intersectsYm);
  }*/


});
