const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [256, 256],
  animate: true,
  fps: 30,
  duration: 6,
};

interface Props {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  time: number;
  playhead: number;
}

interface Offset {
  oX: number;
  oY: number;
}

const spinningRect = (
  { context, width, height, playhead }: Props,
  { oX, oY }: Offset = { oX: 1, oY: 1 },
  color: string = 'red'
) => {
  const t = Math.sin(Math.PI * playhead);
  const thickness = Math.max(5, Math.pow(t, 0.55) * width * 0.5);
  const rotation = playhead * Math.PI;

  const cx = width / (2 * oX);
  const cy = height / (2 * oY);
  const length = height * 0.5;
  context.strokeStyle = color;
  context.lineWidth = 4;
  context.save();
  context.translate(cx, cy);
  context.rotate(rotation);
  context.strokeRect(-thickness / 2, -length / 2, thickness, length);
  context.restore();
};

const sketch = () => {
  return (props: Props) => {
    const { context, width, height } = props;

    // Fill the canvas with pink
    context.fillStyle = '#181828';
    context.fillRect(0, 0, width, height);

    spinningRect(props, { oX: 2, oY: 2 }, 'red');
    spinningRect(props, { oX: 1, oY: 1 }, 'magenta');
    spinningRect(props, { oX: 2 / 3, oY: 2 / 3 }, 'yellow');
    spinningRect(props, { oX: 2, oY: 2 / 3 }, 'blue');
    spinningRect(props, { oX: 2 / 3, oY: 2 }, 'lightgreen');

    // // Now draw a white rectangle in the center
    // context.strokeStyle = 'white';
    // context.lineWidth = 4;
    // context.strokeRect(width / 8, height / 8, width / 2, height / 2);
  };
};

canvasSketch(sketch, settings);
