import { StyleSheet, useWindowDimensions, View } from 'react-native';

import Svg, { Path } from 'react-native-svg';

type CardContainerProps = {
  index?: number;
  numberOfCards?: number;
  children: React.ReactNode;
};

export function CardContainer({ index, numberOfCards, children }: CardContainerProps) {

  const { width } = useWindowDimensions();
  const height = 400;

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 4,
          left: 4,
          width: '100%',
          height: '100%',
          borderRadius: 25,
          backgroundColor: 'rgb(46, 76, 72)',
          zIndex: 0,
        }}
      />
      <View style={{
        borderRadius: 25,
        gap: 10,
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgb(72, 117, 111)',
        overflow: 'hidden',
      }}>
        <Svg
          style={StyleSheet.absoluteFill}
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >
          <Path
            d={`
              M0,${height * 0.45}
              C${width * 0.25},${height * 0.8}
              ${width * 0.6},${-height * 0.2}
              ${width},${height * 0.4}
              L${width},0
              L0,0
              Z
            `}
            fill="rgba(255,255,255,0.25)"
          />
          <Path
            d={`
              M0,${height * 0.85}
              C${width * 0.3},${height * 0.6}
              ${width * 0.7},${height * 1.3}
              ${width},${height * 0.75}
              L${width},0
              L0,0
              Z
            `}
            fill="rgba(255,255,255,0.08)"
          />
        </Svg>
        
        <View style={{ width: '100%', padding: 20, gap: 10 }}>
          {children}
          {numberOfCards && (
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              {Array.from({ length: numberOfCards }).map((_, i) => (
                <View
                  key={i}
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: 13,
                    backgroundColor: i === index ? 'white' : 'grey',
                  }}
                />
              ))}
            </View>
          )}
        </View> 
      </View>
    </View>
  );
}