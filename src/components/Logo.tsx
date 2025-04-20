import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LogoProps {
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ size = 40 }) => {
  return (
    <View style={[styles.container, { width: size * 5, height: size }]}>
      <Text style={[styles.text, { fontSize: size * 0.8 }]}>ORCA</Text>
      <Text style={[styles.subText, { fontSize: size * 0.3 }]}>Softwares</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: '#4DA8DA',
  },
  subText: {
    color: '#F39C12',
    marginTop: -5,
  },
});

export default Logo; 