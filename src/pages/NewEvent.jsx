import React from 'react';
import EventCreationForm from '../components/EventForm';
import DashboardLayout from './DashboardLayout'

// ok


const NewEvent = () => {
    return (
        <DashboardLayout>
            <h2 className="text-2xl px-4 mt-4 mb-4 text-orange ">Create Event</h2>
            <EventCreationForm />
        </DashboardLayout>
    );
};

export default NewEvent;
