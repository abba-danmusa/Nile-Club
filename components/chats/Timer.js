import React, { useState, useEffect } from 'react';
import { Text } from 'react-native'
import { formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ date }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const distance = formatDistanceToNow(new Date(date), { addSuffix: true });
      setTimeAgo(distance);
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <Text
      style={{
        color: '#365486',
        fontFamily: 'Poppins',
        fontSize: 10
      }}
    > 
      {timeAgo}
    </Text>
  )
}

export default TimeAgo;