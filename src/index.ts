import './index.css';

window.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('canvas');

  if (!(canvas instanceof HTMLCanvasElement)) {
    return;
  }

  const context = canvas.getContext('2d');
  console.log(context);
});
