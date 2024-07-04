import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DocumentPicker, {
  DocumentPickerResponse,
  pick,
} from 'react-native-document-picker';
import {RootStackParamList} from '../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import moment from 'moment-timezone';

export let screen_width = Dimensions.get('window').width;
export let screen_height = Dimensions.get('window').height;
type MainProps = NativeStackScreenProps<RootStackParamList, 'Main'>;
interface timeCheck {
  requestSent: Date;
  responseReceived: Date;
  requestReceivedServer: Date;
  responseSentServer: Date;
}
const Main = ({navigation}: MainProps) => {
  const [result, setResult] = React.useState<DocumentPickerResponse | null>(
    null,
  );

  const [timeObject, setTimeObject] = useState<timeCheck | undefined>();
  const [timeObjectBase64, setTimeObjectBase64] = useState<
    timeCheck | undefined
  >();
  const [byteTime1, setByteTime1] = useState(new Date());
  const [byteTime2, setByteTime2] = useState(new Date());
  const [base64Time1, setBase64Time1] = useState(new Date());
  const [base64Time2, setBase64Time2] = useState(new Date());
  const [result2, setResult2] = React.useState<DocumentPickerResponse | null>(
    null,
  );
  const formatDate = (date: moment.MomentInput) => {
    // Convert date to UTC
    const utcDate = moment.utc(date);
  
    // Convert UTC to Indian Standard Time (IST)
    const istDate = utcDate.tz('Asia/Kolkata');
  
    // Format the date to match the required format
    return istDate.format('YYYY-MM-DDTHH:mm:ss.SSSSSSS');
  };
  const postByteData = async () => {
    console.log('IN Post Byte Data', result);
  
    if (!result) {
      console.log('No file selected');
      return;
    }
  
    try {
      const requestSentTime = new Date();
      setByteTime1(requestSentTime);
  
      const formData = new FormData();
      formData.append('file', result);
      console.log('Data:', formData);
  
      const response = await axios({
        method: 'post',
        url: `http://192.168.1.3:8080/uploadFile`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });
  
      console.log('success', response.data);
  
      if (response.status === 200) {
        const responseReceivedTime = new Date();
        setByteTime2(responseReceivedTime);
        console.log('success');
  
        setTimeObject(prevState => ({
          ...prevState,
          requestSent: requestSentTime,
          responseReceived: responseReceivedTime,
          requestReceivedServer: response.data.requestTime,
          responseSentServer: response.data.responseTime,
        }));
      } else {
        Alert.alert('Failed');
      }
    } catch (error) {
      console.log('postData error', error);
    }
  };
  const buttonClick = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });

      setResult(pickerResult);
    } catch (e) {
      console.log('error');
    }
  };
  const postBase64Data = async () => {
    console.log('Base 64 data');
    try {
      const requestSentTime = new Date();
      setBase64Time2(requestSentTime);
      const formData = new FormData();
      formData.append('file', result2);

      const response = await axios({
        method: 'post',
        url: `http://192.168.1.3:8080/uploadBase64`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });
      console.log(response.data);

      if (response.status === 200) {
        const responseReceivedTime = new Date();
        setBase64Time2(responseReceivedTime);
        console.log('success', response.data);
        setTimeObjectBase64(prevState => ({
          ...prevState,
          requestSent: base64Time1,
          responseReceived: base64Time2,
          requestReceivedServer: response.data.requestTime,
          responseSentServer: response.data.responseTime,
        }));
      } else {
        Alert.alert('Failed');
      }
    } catch (error) {
      console.log('postData error', error);
    }
  };
  console.log( timeObject&&timeObject,timeObjectBase64&&timeObjectBase64)
  return (
    <View>
      <Text>Main</Text>
      <TouchableOpacity
        style={[
          //   result?.name ? styles.SODInputFilled : styles.SODInputField,
          {
            borderRadius: 8,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#a8a8a8',
            padding: screen_width * 0.05,
            backgroundColor: 'black',
          },
        ]}
        onPress={buttonClick}>
        {result ? (
          <Image
            source={{uri: result.uri}} // Path to your image
            style={{
              width: 30,
              height: 30,
              paddingLeft: screen_width * 0.02,
            }}
          />
        ) : (
          <Icon
            name="upload"
            size={23}
            color="white"
            style={{paddingLeft: screen_width * 0.02}}
          />
        )}
        <Text style={{color: 'white', fontWeight: '700'}}>
          {result?.name != null
            ? result.name.length > 10
              ? result.name.substring(0, 10) + '...'
              : result.name
            : `Upload Image`}
        </Text>
      </TouchableOpacity>
      {timeObject && (
        <View style={{borderWidth: 2, margin: 10, padding: 10}}>
          <Text style={{fontWeight: 'bold',color:'black'}}>Timings:</Text>
          <Text>
            <Text style={styles.timeText}>Request Sent Time: </Text>
            {formatDate(timeObject.requestSent)}
          </Text>
          <Text>
            <Text style={styles.timeText}>Request Received On Server: </Text>
            {timeObject.requestReceivedServer.toString()}
          </Text>
          <Text>
            <Text style={styles.timeText}>Response Sent From Server: </Text>
            {timeObject.responseSentServer.toString()}
          </Text>
          <Text>
            <Text style={styles.timeText}>Response Received Time: </Text>
            {formatDate(timeObject.responseReceived)}
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={{
          borderRadius: 8,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          borderWidth: 1,
          borderColor: '#a8a8a8',
          padding: screen_width * 0.035,
          margin: screen_width * 0.025,
          backgroundColor: 'black',
          width: screen_width * 0.5,
          alignSelf: 'flex-end',
        }}
        onPress={() => postByteData()}>
        <Text style={{color: 'white', fontWeight: '700'}}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          //   result?.name ? styles.SODInputFilled : styles.SODInputField,
          {
            borderRadius: 8,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#a8a8a8',
            padding: screen_width * 0.05,
            backgroundColor: 'black',
          },
        ]}
        onPress={async () => {
          try {
            const pickerResult = await DocumentPicker.pickSingle({
              presentationStyle: 'fullScreen',
              copyTo: 'cachesDirectory',
            });

            setResult2(pickerResult);
            // postByteData(pickerResult);
          } catch (e) {
            console.log('error');
          }
        }}>
        {result2 ? (
          <Image
            source={{uri: result2.uri}} // Path to your image
            style={{
              width: 30,
              height: 30,
              paddingLeft: screen_width * 0.02,
            }}
          />
        ) : (
          <Icon
            name="upload"
            size={23}
            color="white"
            style={{paddingLeft: screen_width * 0.02}}
          />
        )}
        <Text style={{color: 'white', fontWeight: '700'}}>
          {result2?.name != null
            ? result2.name.length > 10
              ? result2.name.substring(0, 10) + '...'
              : result2.name
            : `Upload Image`}
        </Text>
      </TouchableOpacity>
      {timeObjectBase64 && (
        <View style={{borderWidth: 2, margin: 10, padding: 10}}>
          <Text style={{fontWeight: 'bold',color:'black'}}>Timings:</Text>
          <Text>
            <Text style={styles.timeText}>Request Sent Time: </Text>
            {formatDate(timeObjectBase64.requestSent)}
          </Text>
          <Text>
            <Text style={styles.timeText}>Request Received On Server: </Text>
            {timeObjectBase64.requestReceivedServer.toString()}
          </Text>
          <Text>
            <Text style={styles.timeText}>Response Sent From Server: </Text>
            {timeObjectBase64.responseSentServer.toString()}
          </Text>
          <Text>
            <Text style={styles.timeText}>Response Received Time: </Text>
            {formatDate(timeObjectBase64.responseReceived)}
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={{
          borderRadius: 8,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          borderWidth: 1,
          borderColor: '#a8a8a8',
          padding: screen_width * 0.035,
          margin: screen_width * 0.025,
          backgroundColor: 'black',
          width: screen_width * 0.5,
          alignSelf: 'flex-end',
        }}
        onPress={() => postBase64Data()}>
        <Text style={{color: 'white', fontWeight: '700'}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  timeText: {
    fontWeight: '600',
    fontSize: 11.5,
    color:'black'
  },
});
