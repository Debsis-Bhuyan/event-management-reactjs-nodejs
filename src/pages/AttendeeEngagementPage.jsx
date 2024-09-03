// import React from 'react';
// import LiveQandA from './LiveQandA';
// import PollsAndSurveys from './PollsAndSurveys';
// import DiscussionForum from './DiscussionForum';
// import EventFeedback from './EventFeedback';

import DiscussionForum from "../components/attendee/DiscussionForum";
import EventFeedback from "../components/attendee/EventFeedback";
import LiveQandA from "../components/attendee/LiveQandA";
import PollsAndSurveys from "../components/attendee/PollsAndSurveys";

function AttendeeEngagementPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <LiveQandA />
      <PollsAndSurveys />
      <DiscussionForum />
      <EventFeedback />
    </div>
  );
}

export default AttendeeEngagementPage;
