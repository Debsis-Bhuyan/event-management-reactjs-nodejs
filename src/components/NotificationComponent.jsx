import React, { useEffect, useState } from "react";
import axios from "axios";
import { APP_URL } from "../utils";
import { useSelector } from "react-redux";

const NotificationComponent = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${APP_URL}/message/recipient`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        console.log(response.data);
        setNotifications(response.data);
      } catch (error) {
        setError("Failed to fetch notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="w-full  py-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-orange">Notifications</h2>
      <hr  className="border-t-2 border-red-500"/>
      <div className="w-full pt-6">
            
       
      {notifications.length > 0 ? (
        
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="p-4 border border-gray-200 rounded-md shadow-sm hover:bg-gray-50"
            >
              <p className="font-medium text-lg">{notification.title}</p>
              <p className="text-gray-600">{notification.message}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(notification.sentAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-600">
          No notifications available.
        </div>
      )}
       </div>
    </div>
  );
};

export default NotificationComponent;
