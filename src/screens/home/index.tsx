import React from 'react';
import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {Container, styles} from './styles';

const {set, cond, block, eq, add, Value, event, concat, multiply} = Animated;

const App = () => {
  const translateX = new Value(0);
  const translateY = new Value(0);
  const rotate = new Value(0);
  const scaleZ = new Value(1);
  const offsetX = new Value(0);
  const offsetY = new Value(0);
  const offsetRotate = new Value(0);
  const offsetScale = new Value(1);

  const handlePan = event([
    {
      nativeEvent: ({translationX: x, translationY: y, state}) =>
        block([
          set(translateX, add(x, offsetX)),
          set(translateY, add(y, offsetY)),
          cond(eq(state, State.END), [
            set(offsetX, add(offsetX, x)),
            set(offsetY, add(offsetY, y)),
          ]),
        ]),
    },
  ]);

  const handleRotate = event([
    {
      nativeEvent: ({rotation: r, state}) =>
        block([
          set(rotate, add(r, offsetRotate)),
          cond(eq(state, State.END), [set(offsetRotate, add(offsetRotate, r))]),
        ]),
    },
  ]);

  const handleZoom = event([
    {
      nativeEvent: ({scale: z, state}) =>
        block([
          cond(eq(state, State.ACTIVE), set(scaleZ, multiply(z, offsetScale))),
          cond(eq(state, State.END), [
            set(offsetScale, multiply(offsetScale, z)),
          ]),
        ]),
    },
  ]);

  const panRef = React.createRef();
  const rotateRef = React.createRef();
  const pinchRef = React.createRef();

  return (
    <Container>
      <PanGestureHandler
        ref={panRef}
        minDist={10}
        simultaneousHandlers={[rotateRef, pinchRef]}
        onGestureEvent={handlePan}
        onHandlerStateChange={handlePan}>
        <Animated.View>
          <PinchGestureHandler
            ref={pinchRef}
            simultaneousHandlers={[rotateRef, panRef]}
            onGestureEvent={handleZoom}
            onHandlerStateChange={handleZoom}>
            <Animated.View>
              <RotationGestureHandler
                ref={rotateRef}
                simultaneousHandlers={[pinchRef, panRef]}
                onGestureEvent={handleRotate}
                onHandlerStateChange={handleRotate}>
                <Animated.Image
                  resizeMode="contain"
                  style={[
                    styles.box,
                    {
                      transform: [
                        {translateX: translateX},
                        {translateY: translateY},
                        {rotate: concat(rotate, 'rad')},
                        {scale: scaleZ},
                      ],
                    },
                  ]}
                  source={require('./react-hexagon.png')}
                />
              </RotationGestureHandler>
            </Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
};
export default App;
