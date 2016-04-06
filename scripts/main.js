require(["three.min", "player", "obstacles", "rock"], function(thr, pl, obs, ro){

  this.cameraDistance = 10;
  this.cameraDistanceX = window.innerWidth / cameraDistance;
  this.cameraDistanceY = window.innerHeight / cameraDistance;

  this.worldWidth = cameraDistanceX + 4;
  this.worldHeight = cameraDistanceY + 4;


  this.camera = new THREE.OrthographicCamera( -cameraDistanceX, cameraDistanceX, cameraDistanceY, -cameraDistanceY, 1, 1000 );
  camera.position.z = 30;

  this.scene = new THREE.Scene();
  this.direct = new THREE.DirectionalLight(0xdddddd);
  direct.rotation.set( 0, 0, Math.PI / 4);
  this.scene.add(this.direct);

  /*this.direct2 = new THREE.DirectionalLight(0xffffff, 10);
  direct2.rotation.set( Math.PI/2, Math.PI/2, Math.PI/2);
  scene.add(new THREE.DirectionalLightHelper(this.direct2, 100));
  this.scene.add(this.direct2);*/


  this.ambient = new THREE.AmbientLight(0x333333, 0.2);
  this.scene.add(this.ambient);

  this.renderer = new THREE.WebGLRenderer();
  this.clock = new THREE.Clock();
  this.prevTime = performance.now();

  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  this.moveForward = false;
  this.moveBackward = false;
  this.moveLeft = false;
  this.moveRight = false;
  this.fire = false;
  this.canFire = true;



  var onKeyDown = function ( event ) {

    switch ( event.keyCode ) {

      case 38: // up
      case 87: // w
      moveForward = true;
      break;

      case 37: // left
      case 65: // a
      moveLeft = true;
      break;

      case 40: // down
      case 83: // s
      moveBackward = true;
      break;

      case 39: // right
      case 68: // d
      moveRight = true;
      break;

      case 32: // space
      fire = true;
      break;

    }

  };

  var onKeyUp = function ( event ) {

    switch( event.keyCode ) {

      case 38: // up
      case 87: // w
      moveForward = false;
      break;

      case 37: // left
      case 65: // a
      moveLeft = false;
      break;

      case 40: // down
      case 83: // s
      moveBackward = false;
      break;

      case 39: // right
      case 68: // d
      moveRight = false;
      break;

      case 32: // space
      fire = false;
      canFire = true;
      break;

    }

  };

  document.addEventListener( 'keydown',onKeyDown, false );
  document.addEventListener( 'keyup', onKeyUp, false );

  this.player = new pl.player("spaceCraft", this);
  player.mesh.add(new THREE.AxisHelper(10));

  this.obstacles = new obs.obstacles("obstacles", this);
  /*obstacles.addObstacle(10);
  obstacles.addObstacle(5);
  obstacles.addObstacle(5);
  obstacles.addObstacle(5);
  obstacles.addObstacle(5);
  obstacles.addObstacle(15);
  obstacles.addObstacle(8);
  obstacles.addObstacle(12);
  obstacles.addObstacle(20);*/


  player.init();


  var render = function () {
    requestAnimationFrame( render );

    this.time = performance.now();
    this.delta = ( time - prevTime ) / 1000;

    player.update();
    //astero.update();
    obstacles.update();

    /*if(canJump){
      obstacles.addObstacle(4 + Math.floor(Math.random() * 10));
    }*/
    prevTime = time;

    renderer.render(scene, camera);
  };
  render();


});
