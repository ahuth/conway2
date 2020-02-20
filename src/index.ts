import Simulation from './Simulation';
import './index.css';

window.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('canvas');

  if (!(canvas instanceof HTMLCanvasElement)) {
    return;
  }

  const context = canvas.getContext('2d')!;
  const { height, width, left, top } = canvas.getBoundingClientRect();
  const simulation = new Simulation(context, height, width);

  simulation.randomize();

  canvas.addEventListener('click', function (event) {
    simulation.blast(event.clientX - left, event.clientY - top);
  });

  function compute() {
    simulation.step();
    requestAnimationFrame(compute);
  }

  compute();
});
