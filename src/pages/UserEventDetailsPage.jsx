import React from 'react';
import Event from '../components/EventDetails';
import {useLocation, useParams} from "react-router-dom";
import Layout from './Layout';
import UserEventDetails from './UserEventDetails';


const UserEventDetailsPage = () => {
    const location =useLocation();
    const data= location.state;
   
    return (
        <Layout>
            <UserEventDetails event={data?.event} />
        </Layout>
    );
};

export default UserEventDetailsPage;
