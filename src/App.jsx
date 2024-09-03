import React from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import OverviewPage from "./pages/OverviewPage";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import NewEvent from "./pages/NewEvent";
import UserEvents from "./pages/UserEvents.jsx";
import EditEvent from "./pages/EditEvent.jsx";
import TicketingRegistrationPage from "./pages/TicketingAndRegistration.jsx";
import QueryParam from "./auth/QueryParam.jsx";
import UserEventDetailsPage from "./pages/UserEventDetailsPage.jsx";
import AttendeePage from "./pages/AttendeePage.jsx";
import RegisteredEvents from "./pages/RegisteredEvents.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";

const PrivateRoutes = () => {
  const user = useSelector((state) => state.user)?.user;
  return user?.token ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoutes = () => {
  const user = useSelector((state) => state.user).user;
  return user ? <Navigate to="/" /> : <Outlet />;
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Landing />} />
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path={`/oauth/login`} element={<QueryParam/>}/>
            </Route>
            <Route path="/events" element={<Events />} />
            <Route
              path="/events/ticket-register/:id"
              element={<TicketingRegistrationPage />}
            />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<OverviewPage />} />
              <Route path="/dashboard/new-event" element={<NewEvent />} />
              <Route path="/dashboard/my-events" element={<UserEvents />} />
              <Route path="/dashboard/my-events/preview/:id" element={<UserEventDetailsPage />} />
              <Route path="/dashboard/my-events/:id" element={<EditEvent />} />
              <Route path="/dashboard/my-events/attendee/:id" element={<AttendeePage />} />
              <Route path="/dashboard/registered-events" element={<RegisteredEvents />} />
              <Route path="/dashboard/notification" element={<NotificationPage />} />
              <Route/>

              
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
