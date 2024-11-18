/*
  Debug server host & port for device > Dev settings port dev server - 10.0.1.1:8081
*/

import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

import { flaskBackendUrl } from '@/constants/BackendUrl';

async function checkFileExists(fileUri: string) {
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  if (fileInfo.exists) {
    console.log('Checked that file does exists:', fileInfo.uri);
  } else {
    console.log('File does not exist');
  }
}

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [transcribedCommand, setTranscribedCommand] = useState<string | null>(null);
  const [suggestedActions, setSuggestedActions] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      console.log('Requesting permissions...');
      const status = await Audio.requestPermissionsAsync();
      if (status.status !== 'granted') {
        console.log('Permission to access audio recording was denied');
      } else {
        console.log('Permission to access audio recording was granted');
      }
    })();
  }, []);

  const startRecording = async () => {
    try {
      // Backend: Audio file could not be read as PCM WAV, AIFF/AIFF-C, or Native FLAC; check if file is corrupted or in another format
      const recording = new Audio.Recording();

      const recordingOptions = {
        android: {
          extension: '.wav',
          outputFormat: Audio.AndroidOutputFormat.DEFAULT,
          audioEncoder: Audio.AndroidAudioEncoder.DEFAULT,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.wav',
          outputFormat: Audio.IOSOutputFormat.LINEARPCM,
          audioQuality: Audio.IOSAudioQuality.MAX,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {
          mimeType: 'audio/webm',
        },
      };

      console.log('Preparing to record sync');
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        console.log('Stopping recording');
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Retrieving uri of the recording on Android:', uri);
        setAudioUri(uri);
        setRecording(null);
        setIsRecording(false);
      }
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const uploadUserAudio = async () => {
    if (!audioUri) {
      console.error('No audio URI to upload');
      return;
    }

    checkFileExists(audioUri);

    console.log('Fetching audio file');
    const response = await fetch(audioUri);
    console.log('Done fetching audio file');
    const blob = await response.blob();
    console.log('Blob size:', blob.size);
    console.log('Blob type:', blob.type);

    const formData = new FormData();

    formData.append('file', {
      // Directly use the Blob object with a name and type
      uri: audioUri, // Local file path, e.g. "file:///data/user/0/.../Audio/recording.wav"
      name: 'voice.wav', // The name of the file you want to send
      type: 'audio/wav'  // MIME type of the file
    });

    try {
      console.log("formData", formData);
      // TODO: Change server url to real production server
      const response = await fetch(flaskBackendUrl + '/api/upload_audio', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        console.log('Audio uploaded successfully');
        let transcribedResponse = await response.json();
        console.log("Transcribed whisper response:", transcribedResponse);
        setTranscribedCommand(transcribedResponse.text);
        setSuggestedActions(transcribedResponse.answer);
      } else {
        console.error('Failed to upload audio');
      }
    } catch (error) {
      console.error('Error uploading audio', error);
    }
  };

  const triggerSuggestedActions = async () => {
    try {
      const response = await fetch(flaskBackendUrl + '/api/actions', {
        method: 'POST',
        body: JSON.stringify(suggestedActions),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        console.log('Triggered suggested actions');
        console.log(await response.json());
      } else {
        console.error('Failed to trigger suggested actions');
      }
    } catch (error) {
      console.error('Error triggering actions', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title={isRecording ? 'Stop Recording' : 'Start Recording'} onPress={isRecording ? stopRecording : startRecording} />
      <Text>{isRecording ? 'Recording...' : 'Press to start recording'}</Text>
      {audioUri && <Text>Audio URI: {audioUri.slice(0, 30)} ...</Text>}
      <Button title="Upload Recording" onPress={uploadUserAudio} />
      {transcribedCommand &&
        <View>
          <Text>This is the text that was transcribed from your audio recording:</Text>
          <Text style={{backgroundColor: "yellow"}}>{transcribedCommand}</Text>
          <Text>This is the actions recommanded by the LLM:</Text>
          <Text style={{backgroundColor: "yellow"}}>{suggestedActions}</Text>
          <Button title="Validated actions" onPress={triggerSuggestedActions} />
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AudioRecorder;
