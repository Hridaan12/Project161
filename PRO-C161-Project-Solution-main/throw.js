AFRAME.registerComponent("bowling-balls", {
  init: function () {
    this.throwBall();
    
  },
  throwBall: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var  ball = document.createElement("a-entity");

        ball.setAttribute("gltf-model", "./models/bowling_ball/scene.gltf");

        ball.setAttribute("scale", { x: 5, y: 5,  z: 5});

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        ball.setAttribute("position", {
          x: pos.x,
          y: pos.y-1.2,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        ball.setAttribute("velocity", direction.multiplyScalar(-10));

        var scene = document.querySelector("#scene");

        scene.appendChild(ball);
      }
      ball.addEventListener("collide", this.removeBall)

    });
    removeBall: function (e){
      var element = e.detail.target.el;

      var elementHit = e.detail.body.el

      if(elemenHit.id.includes("pin")) {
          var impulse = new CANNON.Vec3(0,1,-15);
          var worldPoint = new CANNON.Vec3().copy(
            elementHit.getAttribute("position")
          );
        elementHit.body.applyForce(impulse, worldPoint);
        
        var scene = document.querySelector("#scene")
        scene.removeChild(element);
      }
    }
  },
});


