import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const TruncateText = ({ text }) => {
  const [showFullText, setShowFullText] = useState(false);

  // Function to toggle between showing full text and truncated text
  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <View>
      <Text
        style={{ fontFamily: 'Poppins', fontSize: 12, }}
        numberOfLines={showFullText ? undefined : 5}>{text}</Text>
      {!showFullText ? (
        <TouchableOpacity onPress={toggleShowFullText}>
          <Text style={{ color: 'grey', marginTop: 5, fontFamily: 'Poppins', fontSize: 12 }}>View more</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={toggleShowFullText}>
          <Text style={{ color: 'grey', marginTop: 5, fontFamily: 'Poppins', fontSize: 12 }}>Show less</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TruncateText
