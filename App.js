import React from 'react';
import {SafeAreaView, Text, PermissionsAndroid} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';

var filter = {
  box: 'inbox',
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // create.initDb();
  }

  componentDidMount() {
    console.log('mounted done');
    this.requestReadSmsPermission();
    this.Readsms_list();
  }

  Readsms_list = async () => {
    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        console.log('Count: ', count);
        console.log('List: ', smsList);
        var arr = JSON.parse(smsList);

        arr.forEach(function (object) {
          // 'Object: ' +
          console.log(object);
          // console.log('-->' + object.date);
          // console.log('-->' + object.body);
        });
      },
    );
  };

  requestReadSmsPermission = async () => {
    try {
      var granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'Auto Verification OTP',
          message: 'need access to read sms, to verify OTP',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('sms read permissions granted', granted);
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
          {
            title: 'Receive SMS',
            message: 'Need access to receive sms, to verify OTP',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('RECEIVE_SMS permissions granted', granted);
        } else {
          console.log('RECEIVE_SMS permissions denied');
        }
      } else {
        console.log('sms read permissions denied');
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <SafeAreaView>
        <Text>hdsdsdi</Text>
      </SafeAreaView>
    );
  }
}
