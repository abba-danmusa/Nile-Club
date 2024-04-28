import React from 'react';
import { Text } from 'react-native';

const TruncateText = ({
  text,
  maxLength,
  style = {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'grey'
  }
}) => {
  if (!text) {
    return null;
  }

  if (text.length <= maxLength) {
    return <Text style={{...style}}>{text}</Text>
  }

  const shortenedText = text.substring(0, maxLength) + '...';
  return <Text style={{...style}}>{shortenedText}</Text>;
};

export default TruncateText;