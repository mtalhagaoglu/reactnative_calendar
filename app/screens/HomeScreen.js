import React, {useState} from 'react';
import {SafeAreaView, View, Pressable, Text, StyleSheet} from 'react-native';

import MyAwesomeCalendar from '../components/MyAwesomeCalendar';

import ShowDate from '../components/ShowDate';

export default function HomeScreen() {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [showCalendar, setShowCalendar] = useState();
  const [calendarType, setCalendarType] = useState(null);

  const toggleCalendar = (show = false, type = null) => {
    setShowCalendar(show);
    setCalendarType(type);
  };

  return (
    <SafeAreaView style={[StyleSheet.absoluteFill, styles.page]}>
      <View style={styles.datesContainer}>
        <ShowDate
          onPress={() => toggleCalendar(true, 'check-in')}
          title="Check-In Date"
          date={checkIn}
          isSelected={calendarType === 'check-in'}
        />
        <ShowDate
          onPress={() => toggleCalendar(true, 'check-out')}
          title="Check-Out Date"
          date={checkOut}
          isSelected={calendarType === 'check-out'}
        />
      </View>
      {showCalendar ? (
        <MyAwesomeCalendar
          checkIn={checkIn}
          checkOut={checkOut}
          handleSetDate={calendarType === 'check-in' ? setCheckIn : setCheckOut}
          calendarType={calendarType}
          onCancel={() => toggleCalendar(false)}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
  },
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
});
