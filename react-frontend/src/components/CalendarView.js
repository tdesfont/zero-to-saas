import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';





const CalendarView = ({ data }) => {

    const processEvents = (events) => {
        const data = [];

        events.forEach((event) => {
            const start = moment(event.starttimestamp);
            const end = moment(event.endtimestamp);

            for (let m = moment(start); m.isBefore(end) || m.isSame(end, 'day'); m.add(1, 'days')) {
                data.push({ date: m.format('YYYY-MM-DD'), event: event.title });
            }
        });

        return data;
    };

    const processedEvents = processEvents(data);
    console.log("Processed events", processedEvents);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={processedEvents} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="event" fill="red" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CalendarView;
