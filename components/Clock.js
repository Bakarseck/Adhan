import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';

const Clock = ({ size }) => {
    const [date, setDate] = useState(new Date());

    const start = "25";

    useEffect(() => {
        const timerId = setInterval(() => setDate(new Date()), 1000);
        return () => {
            clearInterval(timerId);
        };
    }, []);

    const secondsDegrees = (date.getSeconds() / 60) * 360;
    const minsDegrees = (date.getMinutes() / 60) * 360 + (date.getSeconds() / 60) * 6;
    const hourDegrees = (date.getHours() / 12) * 360 + (date.getMinutes() / 60) * 30;

    return (
        <View style={styles.clockFace}>
            <Image
                source={require('../assets/clock.png')}
                style={{ width: size, height: size }}
            />
            <Svg height={size} width={size} viewBox="0 0 50 50" style={styles.hands}>
                <Line
                    x1={start}
                    y1={start}
                    x2="25"
                    y2="17"
                    stroke="black"
                    strokeWidth="1.5"
                    transform={`rotate(${hourDegrees} 25 25)`}
                />
                <Line
                    x1={start}
                    y1={start}
                    x2="25"
                    y2="12"
                    stroke="black"
                    strokeWidth="1"
                    transform={`rotate(${minsDegrees} 25 25)`}
                />
                <Circle
                    cx={start}
                    cy={start}
                    r="1.5"
                    fill="black"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    clockFace: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hands: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
});

export default Clock;
