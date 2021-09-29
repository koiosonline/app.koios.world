import {useEffect, useRef, useState} from "react";
import world1 from '../../assets/data/threejs/world.json';
import world2 from '../../assets/data/threejs/world2.json';
import * as THREE from "three";

const WorldDemo = (props) => {
  const [world, setWorld] = useState<any>(null)

  const mountRef = useRef(null);

  const handleWorldSelection = (selectedWorld) => {
    switch(selectedWorld) {
      case 1:
        setWorld(world1)
        console.log(world)
        break;
      case 2:
        setWorld(world2)
        console.log(world)
        break;
    }
  }

  useEffect(() => {

    handleWorldSelection(props.world);

    if (world != null) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      const loader = new THREE.ObjectLoader();

      renderer.setSize( window.innerWidth, window.innerHeight );

      mountRef.current.appendChild( renderer.domElement );

      const project = world.project;
      if ( project.vr !== undefined ) renderer.xr.enabled = project.vr;
      if ( project.shadows !== undefined ) renderer.shadowMap.enabled = project.shadows;
      if ( project.shadowType !== undefined ) renderer.shadowMap.type = project.shadowType;
      if ( project.toneMapping !== undefined ) renderer.toneMapping = project.toneMapping;
      if ( project.toneMappingExposure !== undefined ) renderer.toneMappingExposure = project.toneMappingExposure;
      if ( project.physicallyCorrectLights !== undefined ) renderer.physicallyCorrectLights = project.physicallyCorrectLights;

      const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
      scene.add( directionalLight );

      const ambientLight = new THREE.AmbientLight( 0xffffff, 2 );
      scene.add( ambientLight );

      const objects = loader.parse( world.scene );
      scene.add( objects );

      camera.position.z = 5;
      scene.background = new THREE.Color( 0xf2f2f2 );

      const animate = () => {
        requestAnimationFrame( animate );
        objects.rotation.y += 0.01;
        renderer.render( scene, camera );
      };

      animate();

      return () => mountRef.current.removeChild(renderer.domElement);
    }
  });

  return (
    <div ref={mountRef} style={{overflow: 'hidden'}}>

    </div>
  )
}

export default WorldDemo;
