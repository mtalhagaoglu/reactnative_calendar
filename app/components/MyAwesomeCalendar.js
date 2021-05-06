import React, {useState} from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Alert,
} from 'react-native';

import moment from 'moment';

const {height, width} = Dimensions.get('window');

export default function MyAwesomeCalendar({
  checkIn,
  checkOut,
  handleSetDate,
  onCancel,
  calendarType,
}) {
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(null);

  const Day = ({item}) => {
    const {type, value} = item;
    const date = `${value}/${selectedMonth.format('MM')}/${selectedMonth.format(
      'YYYY',
    )}`;
    let color;
    let isBetween;
    if (checkIn && checkOut && type !== 'last') {
      const compareDate = moment(date, 'DD/MM/YYYY');
      const startDate = moment(checkIn, 'DD/MM/YYYY');
      const endDate = moment(checkOut, 'DD/MM/YYYY');
      isBetween = compareDate.isBetween(startDate, endDate);
      if (isBetween) {
        color = 'gray';
      }
    }
    switch (date) {
      case selectedDate:
        if (type != 'last') {
          color = '#D23B38';
        }
        break;
      case checkOut:
        color = '#60C0D2';
        break;
      case checkIn:
        color = '#60C0D2';
        break;
      default:
        break;
    }
    return (
      <Pressable
        disabled={type === 'last'}
        onPress={() => {
          setSelectedDate(date);
        }}
        style={[
          styles.dayContainer,
          {backgroundColor: color},
          color && styles.selectedDay,
        ]}>
        <Text
          style={[
            styles.dayText,
            color && {color: 'white'},
            type === 'last' && {color: 'gray'},
          ]}>
          {value}
        </Text>
      </Pressable>
    );
  };

  const handleMonth = (mode = 'asc') => {
    if (mode === 'asc') {
      setSelectedMonth(moment(selectedMonth).add(1, 'M'));
    } else {
      setSelectedMonth(moment(selectedMonth).subtract(1, 'M'));
    }
  };

  const Header = () => {
    return (
      <>
        <View style={styles.headerContainer}>
          <Pressable
            onPress={() => handleMonth('desc')}
            style={styles.headerButton}>
            <Image
              source={require('../assets/chevron.png')}
              style={{
                height: 15,
                width: 15,
                resizeMode: 'contain',
                transform: [{rotate: '180deg'}],
              }}
            />
          </Pressable>
          <Text style={styles.headerTitle}>{`${selectedMonth.format(
            'MMMM',
          )} ${selectedMonth.format('YYYY')}`}</Text>
          <Pressable
            onPress={() => handleMonth('asc')}
            style={styles.headerButton}>
            <Image
              source={require('../assets/chevron.png')}
              style={{height: 15, width: 15, resizeMode: 'contain'}}
            />
          </Pressable>
        </View>
        <View style={[styles.headerContainer, {}]}>
          <Text style={styles.dayName}>Mon</Text>
          <Text style={styles.dayName}>Tue</Text>
          <Text style={styles.dayName}>Wed</Text>
          <Text style={styles.dayName}>Thu</Text>
          <Text style={styles.dayName}>Fri</Text>
          <Text style={styles.dayName}>Sat</Text>
          <Text style={styles.dayName}>Sun</Text>
        </View>
      </>
    );
  };

  const handleDone = () => {
    if (calendarType === 'check-in' && checkOut) {
      if (moment(selectedDate, 'DD/MM/YYYY') > moment(checkOut, 'DD/MM/YYYY')) {
        Alert.alert(
          'Please Selecet a Valid Day',
          'You cannot checkout without checkin',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
        );
        setSelectedDate(null);
        return;
      }
    } else if (calendarType === 'check-out' && checkIn) {
      if (moment(selectedDate, 'DD/MM/YYYY') < moment(checkIn, 'DD/MM/YYYY')) {
        Alert.alert(
          'Please Selecet a Valid Day',
          'You cannot checkout without checkin',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
        );
        setSelectedDate(null);
        return;
      }
    }

    handleSetDate(selectedDate);
    //onCancel();
  };

  const Footer = () => {
    return (
      <View
        style={[
          styles.headerContainer,
          {
            borderBottomWidth: 0,
            borderTopWidth: 1,
            marginTop: 10,
            justifyContent: 'space-around',
          },
        ]}>
        <Pressable onPress={onCancel} style={styles.button}>
          <Text style={styles.buttonText}>CLOSE</Text>
        </Pressable>
        <Pressable
          disabled={!selectedDate}
          onPress={handleDone}
          style={styles.button}>
          <Text style={styles.buttonText}>DONE</Text>
        </Pressable>
      </View>
    );
  };

  const handleDays = () => {
    let days = [];
    const firstDay = parseInt(selectedMonth.startOf('month').format('d'));
    if (firstDay) {
      const last_month_day = moment(selectedMonth)
        .subtract(1, 'months')
        .daysInMonth();
      days = [...Array(firstDay - 1).keys()].map(d => {
        return {type: 'last', value: last_month_day - (firstDay - 2 - d)}; // -1 for index, -1 for first day of the week
      });
    }
    return [
      ...days,
      ...[...Array(selectedMonth.daysInMonth()).keys()].map(d => ({
        type: 'this',
        value: d + 1,
      })),
    ];
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<Header />}
        numColumns={7}
        keyExtractor={item =>
          `${selectedMonth.format('YYYY')}/${selectedMonth.format(
            'MM',
          )}/${item}`
        }
        key={`${selectedMonth.format('YYYY')}/${selectedMonth.format('MM')}`}
        data={handleDays()}
        renderItem={data => <Day {...data} />}
        contentContainerStyle={styles.daysContainer}
        ListFooterComponent={<Footer />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 245,
    alignSelf: 'center',
    margin: 10,
  },
  dayContainer: {
    width: 25,
    height: 25,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  dayName: {color: 'gray', flex: 1, textAlign: 'center'},
  daysContainer: {
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {},
  buttonText: {fontSize: 13},
  selectedDay: {
    borderRadius: 10,
  },
  selectedDayText: {},
});
