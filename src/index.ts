import Simulation from './Simulation';
import './index.css';

window.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('canvas');
  const stepButton = document.getElementById('step')!;

  if (!(canvas instanceof HTMLCanvasElement)) {
    return;
  }

  const context = canvas.getContext('2d')!;
  const { height, width } = canvas.getBoundingClientRect();
  const simulation = new Simulation(context, height, width);

  simulation.randomize();

  stepButton.addEventListener('click', function () {
    simulation.randomize();
  });
});
