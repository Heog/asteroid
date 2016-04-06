define(["three.min"], function(th){

  return{
    moveBox2D : function(world, object){


      object.mesh.position.x = object.mesh.position.x + (object.velocity.x * world.delta);
      object.mesh.position.y = object.mesh.position.y + (object.velocity.y * world.delta);


      if(object.mesh.position.x<0) object.mesh.position.x = ((object.mesh.position.x - world.worldWidth) % (2*world.worldWidth)) + 1*world.worldWidth;
      else object.mesh.position.x = ((object.mesh.position.x + 1*world.worldWidth) % (2*world.worldWidth)) - 1*world.worldWidth;

      if(object.mesh.position.y<0) object.mesh.position.y = ((object.mesh.position.y - 1*world.worldHeight) % (2*world.worldHeight)) + 1*world.worldHeight;
      else object.mesh.position.y = ((object.mesh.position.y + 1*world.worldHeight) % (2*world.worldHeight)) - 1*world.worldHeight;
    }
  }
});
