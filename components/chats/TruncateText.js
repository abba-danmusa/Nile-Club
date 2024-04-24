import React from 'react';
import { Text } from 'react-native';

const TruncateText = ({ text, maxLength }) => {
  if (!text) {
    return null;
  }

  if (text.length <= maxLength) {
    return <Text style={{
      fontFamily: 'Poppins',
      fontSize: 12,
      color: 'grey'
    }}>{text}</Text>;
  }

  const shortenedText = text.substring(0, maxLength) + '...';
  return <Text style={{
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'grey'
  }}>{shortenedText}</Text>;
};

export default TruncateText;