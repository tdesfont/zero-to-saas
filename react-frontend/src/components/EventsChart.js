import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';





const EventsChart = ({ data }) => {

    const processEvents = (events) => {

        let aggregatedData = {}

        events.forEach((event) => {
            const start = moment(event.starttimestamp);
            const end = moment(event.endtimestamp);
            const key = moment(start).format('YYYY-MM-DD');
            if (!(key in aggregatedData)) {
                aggregatedData[key] = 0;
            }
            aggregatedData[key] = aggregatedData[key] + end.diff(start);
        });

        let finalData = [];
        for (const key in aggregatedData) {
            finalData.push({ date: key, total: aggregatedData[key] })
        }

        return finalData;
    };

    const processedEvents = processEvents(data);
    console.log("Processed events", processedEvents);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={processedEvents} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="red" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default EventsChart;
