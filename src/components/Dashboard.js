import React, { useEffect, useState } from 'react';
import destinationService from '../services/destinationService';
import DestinationList from './Dashboard/DestinationList';
import Footer from './Dashboard/Footer';
import TopBar from './Dashboard/TopBar';
import HeroSection from './Dashboard/HeroImage';


export default function Dashboard() {

    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        destinationService.getAllDestinations()
            .then(res => {
                console.log(res.data.data)
                setDestinations(res.data.data)
            }).catch(err => console.log(err))
    }, [])




    return (
        <>
            {/* <h1>Welcome to Trip Planner</h1> */}
            <TopBar />
            <HeroSection />
            <DestinationList
                destinations={destinations}
            />
            <Footer />

        </>
    )
}
