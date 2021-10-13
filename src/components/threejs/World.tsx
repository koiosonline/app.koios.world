import {useEffect, useRef, useState} from "react";
import world1 from '../../assets/data/threejs/world.json';
import world2 from '../../assets/data/threejs/world2.json';
import world3 from '../../assets/data/threejs/world3.json';
import world4 from '../../assets/data/threejs/world4.json';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


const World = (props: any) => {
  const [world, setWorld] = useState<any>(null)

  //Ref for the div to place the world into
  const mountRef = useRef(null);

  //Switch to select world state based on different json objects
  const handleWorldSelection = (selectedWorld: any) => {
    switch(selectedWorld) {
      case 1:
        setWorld(world1)
        break;
      case 2:
        setWorld(world2)
        break;
      case 3:
        setWorld(world3)
        break;
      case 4:
        setWorld(world4)
        break;
    }
  }

  useEffect(() => {

    //World selection function
    handleWorldSelection(props.world);

    //Threejs init after worldState has been set
    if (world != null) {
      //Default setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera( 75, mountRef.current.clientWidth/mountRef.current.clientHeight, 0.1, 1000 );
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      const loader = new THREE.ObjectLoader();
      const controls = new OrbitControls( camera, renderer.domElement );
      let requestID;

      //Size and pixel radius settings
      renderer.setSize( mountRef.current.clientWidth, mountRef.current.clientHeight );
      renderer.setPixelRatio(window.devicePixelRatio);

      //Change size of canvas on window resize
      window.addEventListener('resize', () => {
        renderer.setSize( mountRef.current.clientWidth, mountRef.current.clientHeight );
      })

      //Render the domElement to the div
      mountRef.current.appendChild( renderer.domElement );

      //Project settings
      const project = world.project;
      if ( project.vr !== undefined ) renderer.xr.enabled = project.vr;
      if ( project.shadows !== undefined ) renderer.shadowMap.enabled = project.shadows;
      if ( project.shadowType !== undefined ) renderer.shadowMap.type = project.shadowType;
      if ( project.toneMapping !== undefined ) renderer.toneMapping = project.toneMapping;
      if ( project.toneMappingExposure !== undefined ) renderer.toneMappingExposure = project.toneMappingExposure;
      if ( project.physicallyCorrectLights !== undefined ) renderer.physicallyCorrectLights = project.physicallyCorrectLights;

      //Directional lighting
      const directionalLight = new THREE.DirectionalLight( 0xffffff, 7 );
      directionalLight.position.set( 5, 10, 5 );
      scene.add( directionalLight );

      //Ambient lighting
      const ambientLight = new THREE.AmbientLight( 0x820fc9, 1.5 );
      scene.add( ambientLight );

      //Parsing the objects to the scene
      const objects = loader.parse( world.scene );
      scene.add( objects );

      //Select all different objects
      const sphere = scene.getObjectByName('Sphere');
      const torus1 = scene.getObjectByName('Torus1');
      const torus2 = scene.getObjectByName('Torus2');
      const torus3 = scene.getObjectByName('Torus3');
      const torus4 = scene.getObjectByName('Torus4');

      //Transparent background of renderer
      renderer.setClearColor(0x000000, 0);

      //Default camera position
      camera.position.set( 0, 0, 1.7 );

      //Camera position viewport
      if (window.innerWidth < 400) {
        camera.position.set( 0, 0, 3.5 );
      }
      controls.update();

      //Animation function
      const animate = () => {
        requestID = requestAnimationFrame( animate );
        if (window.innerWidth < 400) {
          controls.enablePan = false;
          controls.enableRotate = false
        }
        controls.enableZoom = false;
        controls.target.set( 0, 0, 0 )

          if (sphere) {
            sphere.rotation.y += 0.001
            sphere.rotation.z = 0.15
          }

          if (torus1) {
            torus1.rotation.z += 0.0075
            torus1.rotation.y = 1
            torus1.rotation.x = 1.75
          }

          if (torus2) {
            torus2.rotation.z += 0.015
            torus2.rotation.y = -0.5
            torus2.rotation.x = 5
          }

          if (torus3) {
            torus3.rotation.z += 0.02
            torus3.rotation.y = -1
            torus3.rotation.x = -5
          }

          if (torus4) {
            torus4.rotation.z += 0.005;
            torus4.rotation.y = -2
            torus4.rotation.x = -0.25
          }
        renderer.render( scene, camera );
      }

      renderer.getContext().canvas.addEventListener("webglcontextlost", (event) => {
        event.preventDefault();
        // animationID would have been set by your call to requestAnimationFrame
        cancelAnimationFrame(requestID);
        renderer.render( scene, camera );
      }, false);

      const stop = () => {
        cancelAnimationFrame( requestID );
        renderer.renderLists.dispose();
        // renderer.forceContextLoss();
        renderer.render( scene, camera );
      }

      if (props.animate) {
        animate();
      } else {
        stop();
      }
      // animate();
      return () => mountRef.current.removeChild(renderer.domElement);
    }
  }, [props.animate, props.world, world]);

  return (
    <div className={'world-container'}>
      <div ref={mountRef} style={{overflow: 'hidden'}} className={'world-container__world'}>

      </div>
    </div>
  )
}

export default World;
