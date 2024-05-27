import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserProfile.module.css';  

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(1);

    const fetchUser = async () => {
        setLoading(true); 
        try {
            const response = await axios.get('https://randomuser.me/api/');
            setUser(response.data.results[0]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [userId]);
    const handleNextUser = () => {
        setUserId(prevId => prevId + 1);
    }

    return (
        <div className={styles.profileContainer}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <img className={styles.profileImage} src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
                    <h2>{user.name.first} {user.name.last}</h2>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <button onClick={handleNextUser}>Load New User</button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
