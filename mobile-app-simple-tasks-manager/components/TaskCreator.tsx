import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import TaskSchedulerForm from './TaskSchedulerForm';
import TaskCreatorForm from './TaskCreatorForm';
import { flaskBackendUrl } from '@/constants/BackendUrl';

const TaskCreator: React.FC = () => {

    const getRandomId = () => { 
        /* Generate a random resource id for the event as the id is a primary key and should be unique.
        */
        const id = "event.id." + Math.random().toString(16).slice(2);
        return id;
    }


    let event = {
        "eventid": 'sample-event-id', // Placeholder for the eventId (Will be set in the call directly)
        "title": "Deploying Cloud backend for Task Scheduler application",
        "description": "Need to create a backend (Likely in GCP) in order to support task creation, storage and retrieval.", 
        "starttimestamp": "Fri, 11 Oct 2024 13:24:00 GMT", 
        "endtimestamp": "Fri, 11 Oct 2024 14:24:00 GMT", 
        "status": "To be done",
    };
    const sendEventToServer = async () => {
        try {
            event.eventid = getRandomId();
            event.starttimestamp = new Date().toISOString();
            event.endtimestamp = new Date().toISOString();
            const response = await axios.post(flaskBackendUrl + '/api/create_event', event, {
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
            <View style={styles.tilesContainer}>
                <TaskCreatorForm />
                <TouchableOpacity
                    onPress={() => sendEventToServer()}
                >
                    <Text style={styles.tileText}>Create new Task</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    tilesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    tile: {
        width: 80,
        height: 80,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    tileText: {
        color: 'black',
        fontSize: 18,
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default TaskCreator;
