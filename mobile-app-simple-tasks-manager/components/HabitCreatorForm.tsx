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


const HabitCreatorForm = () => {
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
            const response = await axios.post(flaskBackendUrl + 'api/create_event', formData, {
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

            <Text style={styles.label}>Category</Text>
            <Picker
                selectedValue={status}
                onValueChange={(itemValue: string) => setStatus(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Sports" value="sports" />
                <Picker.Item label="Health" value="health" />
                <Picker.Item label="Work" value="work" />
            </Picker>

            <Text style={styles.label}>Habit title:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title"
            />

            <Text style={styles.label}>Description (optional):</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description"
                multiline
            />

            <Text style={styles.label}>Frequence:</Text>
            <Picker
                selectedValue={status}
                onValueChange={(itemValue: string) => setStatus(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Every day" value="daily" />
                <Picker.Item label="Every week" value="weekly" />
                <Picker.Item label="Custom" value="custom" />
            </Picker>

            <Text style={styles.label}>Start date:</Text>
            <TextInput
                style={styles.input}
                value={endTimestamp}
                onChangeText={setEndTimestamp}
                placeholder={new Date().toISOString()}
            />

            <Text style={styles.label}>End date (optional):</Text>
            <TextInput
                style={styles.input}
                value={endTimestamp}
                onChangeText={setEndTimestamp}
                placeholder={new Date().toISOString()}
            />

            <Text style={styles.label}>Priority:</Text>
            <Picker
                selectedValue={status}
                onValueChange={(itemValue: string) => setStatus(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="low" value="low" />
                <Picker.Item label="medium" value="medium" />
                <Picker.Item label="high" value="high" />
            </Picker>

            <Text style={styles.label}>Notification and reminder policy:</Text>
            <Picker
                selectedValue={status}
                onValueChange={(itemValue: string) => setStatus(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="low" value="low" />
                <Picker.Item label="medium" value="medium" />
                <Picker.Item label="high" value="high" />
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

export default HabitCreatorForm;
