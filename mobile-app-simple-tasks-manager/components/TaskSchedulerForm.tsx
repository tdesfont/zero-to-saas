import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { flaskBackendUrl } from '@/constants/BackendUrl';

const getRandomId = () => { 
    /* Generate a random resource id for the event as the id is a primary key and should be unique.
    */
    const id = "event.id." + Math.random().toString(16).slice(2);
    return id;
}


const TaskSchedulerForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTimestamp, setStartTimestamp] = useState(new Date().toISOString());
    const [endTimestamp, setEndTimestamp] = useState(new Date().toISOString());
    const [status, setStatus] = useState('To be done');
    const eventId = 'sample-event-id';

    const handleSubmit = async () => {

        let formData = {
            eventId,
            title,
            description,
            startTimestamp: startTimestamp,
            endTimestamp: endTimestamp,
            status,
        };

        console.log(formData);

        try {
            formData.eventId = getRandomId();
            formData.startTimestamp = new Date(formData.startTimestamp).toISOString();
            formData.endTimestamp = new Date(formData.endTimestamp).toISOString();
            const response = await axios.post(flaskBackendUrl + '/api/create_event', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Event sent successfully:', response.data);
        } catch (error) {
            console.error('Error sending events:', error);
        }

    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title"
            />

            <Text style={styles.label}>Description:</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description"
                multiline
            />

            <Text style={styles.label}>Start Timestamp:</Text>
            <TextInput
                style={styles.input}
                value={startTimestamp}
                defaultValue={new Date().toISOString()}
                onChangeText={setStartTimestamp}
                placeholder={new Date().toISOString()}
            />

            <Text style={styles.label}>End Timestamp:</Text>
            <TextInput
                style={styles.input}
                value={endTimestamp}
                onChangeText={setEndTimestamp}
                placeholder={new Date().toISOString()}
            />

            <Text style={styles.label}>Status:</Text>
            <Picker
                selectedValue={status}
                onValueChange={(itemValue: string) => setStatus(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="To be done" value="To be done" />
                <Picker.Item label="In progress" value="In progress" />
                <Picker.Item label="Completed" value="Completed" />
            </Picker>

            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginTop: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 5,
        paddingHorizontal: 10,
    },
    picker: {
        height: 50,
        width: '100%',
        marginTop: 5,
    },
});

export default TaskSchedulerForm;
