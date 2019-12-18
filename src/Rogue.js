import React, { useRef, useEffect, useState } from 'react';
import InputManager from './InputManager';
import Player from './Player';
import World from './World';

const Rogue = ({width, height, tilesize}) => {
  const canvasRef = useRef();
  // const [player, setPlayer] = useState(new Player(1,2, tilesize))
  const [world, setWorld] = useState(new World(width, height, tilesize));
  let inputManager = new InputManager();
  const handleInput = (action, data) => {
    console.log(`handle input: ${action}:${JSON.stringify(data)}`);
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.movePlayer(data.x, data.y);
    setWorld(newWorld)
  };

  useEffect(() => {
    console.log('Create Map!');
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.player);
    setWorld(newWorld)
  }, []); //does not calls createnewmap everytime player moves

  useEffect(() => {
    console.log('Binging')
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);
    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    }
  })

  useEffect(() => {
      console.log('Draw to canvas')
      const ctx = canvasRef.current.getContext('2d')
      ctx.clearRect(0,0,width*tilesize, height*tilesize);
      world.draw(ctx);
    });
    return (
      <canvas
        ref = {canvasRef}
        width = {width * tilesize}
        height = {height * tilesize}
        style={{ border: '1px solid black' }} >
        </canvas>
    );
}

export default Rogue;
