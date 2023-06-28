import P5 from 'p5';

const sketch = (p5: P5) => {
  let _canvas;

  let _margins = 40;
  let _drawingSize;

  let _nbGridSquares = 20;
  let _gridSquaresSize;

  let _looping = true;

  p5.windowResized = () => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight)

    _drawingSize = Math.min(window.innerWidth, window.innerHeight);
    _gridSquaresSize = (_drawingSize - 2 * _margins) / _nbGridSquares;
  }


  p5.setup = () => {
    _canvas = p5.createCanvas(window.innerWidth, window.innerHeight)

    p5.frameRate(8)
    p5.angleMode(p5.DEGREES);
    p5.colorMode(p5.HSB, 360, 100, 100, 100);

    p5.ellipseMode(p5.CORNER)
    p5.rectMode(p5.CORNER)

    _drawingSize = Math.min(window.innerWidth, window.innerHeight);
    _gridSquaresSize = (_drawingSize - 2 * _margins) / _nbGridSquares;
  }


  p5.draw = () => {
    p5.background(240, 42, 23);
    p5.fill(21, 6, 95);
    p5.noStroke();

    p5.translate((window.innerWidth - _drawingSize) / 2 + _margins, (window.innerHeight - _drawingSize) / 2 + _margins);

    for (let i = 0; i < _nbGridSquares; i++) {
      for (let j = 0; j < _nbGridSquares; j++) {
        let shape: Shapes = p5.int(p5.random(0, 4));

        switch (shape) {
          case Shapes.CIRCLE:
            p5.circle(
              i*_gridSquaresSize, 
              j*_gridSquaresSize, 
              _gridSquaresSize
            );
            break;
          case Shapes.SEMICIRCLE:
            let angle = p5.int(p5.random(0, 4));

            p5.arc(
              i*_gridSquaresSize, 
              j*_gridSquaresSize, 
              _gridSquaresSize, 
              _gridSquaresSize, 
              angle*90, 
              180+angle*90
            );
            break;
          case Shapes.TWOSEMICIRCLE:
            let orientation = p5.int(p5.random(0, 2));
            switch (orientation) {
              case 0:
                p5.arc(
                  i * _gridSquaresSize,
                  j * _gridSquaresSize - _gridSquaresSize / 2,
                  _gridSquaresSize,
                  _gridSquaresSize,
                  0,
                  180
                );
                p5.arc(
                  i * _gridSquaresSize,
                  j * _gridSquaresSize + _gridSquaresSize / 2,
                  _gridSquaresSize,
                  _gridSquaresSize,
                  180,
                  360
                );
                break;
              case 1:
                p5.arc(
                  i * _gridSquaresSize + _gridSquaresSize / 2,
                  j * _gridSquaresSize,
                  _gridSquaresSize,
                  _gridSquaresSize,
                  90,
                  270
                );
                p5.arc(
                  i * _gridSquaresSize - _gridSquaresSize / 2,
                  j * _gridSquaresSize,
                  _gridSquaresSize,
                  _gridSquaresSize,
                  270,
                  450
                );
                break;
            }
        }
      }
    }
  }

  p5.keyPressed = () => {
    if (_looping) {
      p5.noLoop();
    } else {
      p5.loop();
    }
    _looping = !_looping;
  }
}



enum Shapes {
  SEMICIRCLE,
  CIRCLE,
  // QUARTERCIRCLE,
  TWOSEMICIRCLE,
}

const shapes = () => {
  let _shapes = {
    [Shapes.CIRCLE]: (p5: P5, props: any) => p5.circle(
      props.i*props.gridSquaresSize, 
      props.j*props.gridSquaresSize, 
      props.gridSquaresSize
    ),
  }

}


/* 
Gradient experimentation

    // console.log(window.innerWidth/2, window.innerHeight/2, _drawingSize)
    // let gradient = _canvas.drawingContext.createRadialGradient(
    //   window.innerWidth/2, window.innerHeight/2, 20, // from
    //   window.innerWidth/2, window.innerHeight/2, _drawingSize, // to
    // );
    // gradient.addColorStop(0, p5.color(333, 85, 97));
    // gradient.addColorStop(0.2, p5.color(276, 95, 72));
    // gradient.addColorStop(0.4, p5.color(258, 93, 64));
    // gradient.addColorStop(0.6, p5.color(229, 72, 93));
    // gradient.addColorStop(0.8, p5.color(194, 68, 94));
    // _canvas.drawingContext.fillStyle = gradient;


enum GradientTypes {
  LINEAR,
  RADIAL,
  CONIC,
}

const gradients = (
  type: GradientTypes = GradientTypes.LINEAR,
  canvas: any,
  props: any = {}
) => {
  let _gradients = {
    [GradientTypes.LINEAR]: () => canvas.drawingContext.createLinearGradient(
      props.from[0], props.from[1],
      props.to[0], props.to[1]
    ),
    [GradientTypes.RADIAL]: () => canvas.drawingContext.createRadialGradient(
      props.from[0], props.from[1], props.from[2],
      props.to[0], props.to[1], props.to[2]
    ),
    // 'conic' : () => canvas.drawingContext.createConicGradient(
    //     radians(_props.from[2]), _props.from[0], _props.from[1],
    // )
  }

  let _gradient = (_gradients[_type])();
}
*/

new P5(sketch)
