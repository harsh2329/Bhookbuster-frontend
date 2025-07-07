import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
 import  { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
     
      const [restaurantCount, setRestaurantCount] = useState(0);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        fetchRestaurantCount();
      }, []);
    
      const fetchRestaurantCount = async () => {
        try {
          setLoading(true);
          // Use the same endpoint you're using in RestaurantView
          const response = await axios.get('https://bhookbuster-backend-3.onrender.com/location/all');
          
          // Set the count based on the length of the data array
          if (response.data && response.data.data) {
            setRestaurantCount(response.data.data.length);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching restaurant count:", error);
          setLoading(false);
        }
      };

      const [offerCount, setOfferCount] = useState(0);

      useEffect(() => {
        fetchOfferCount();
      }, []);

      const fetchOfferCount = async () => {
        try {
          // Use the same endpoint you're using in OfferList
<<<<<<< HEAD
          const response = await axios.get('https://bhookbuster-backend-3.onrender.com/offer/alll');
=======
          const response = await axios.get('https://bhookbuster-backend-3.onrender.com/offer/all');
>>>>>>> 1d24839e3da21de7b74504993d9dcc2b993ecb3d
          
          // Set the count based on the length of the data array
          if (response.data && response.data.data) {
            setOfferCount(response.data.data.length);
          }
        } catch (error) {
          console.error("Error fetching offer count:", error);
        }
      };

      const [userCount, setUserCount] = useState(0);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchUserCount = async () => {
          try {
            setIsLoading(true);
            const response = await axios.get('/usr/users');
            // Assuming your API returns data in the format {message: string, data: array}
            const users = response.data.data;
            setUserCount(users.length);
            setIsLoading(false);
          } catch (err) {
            setError('Failed to fetch users');
            setIsLoading(false);
            console.error('Error fetching users:', err);
          }
        };

        fetchUserCount();
      }, []);
  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
        <div className='card'>
      <div className='card-inner'>
        <h3>RESTAURANTS</h3>
        <BsFillArchiveFill className='card_icon' />
      </div>
      <h1>{loading ? "Loading..." : restaurantCount}</h1>
    </div>
    <div className='card'>
      <div className='card-inner'>
        <h3>OFFERS</h3>
        <BsFillGrid3X3GapFill className='card_icon' />
      </div>
      <h1>{loading ? "..." : offerCount}</h1>
    </div>
    <div className='card'>
      <div className='card-inner'>
        <h3>CUSTOMERS</h3>
        <BsPeopleFill className='card_icon'/>
      </div>
      <h1>{isLoading ? 'Loading...' : error ? 'Error' : userCount}</h1>
    </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>ALERTS</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>42</h1>
            </div>
        </div>

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default Home