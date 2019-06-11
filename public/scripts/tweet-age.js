function timeAgo(ts) {
   // This function computes the delta between the
   // provided timestamp and the current time, then test
   // the delta for predefined ranges.

   var d = new Date(); // Gets the current time
   var nowTs = d.getTime();
   var seconds = Math.floor((nowTs - ts) / 1000); // Get diff of Miliseconds, divide by 1000 to get seconds for calcs later

   // more than a year
   if(seconds > 365 * 24* 3600){
      return "Over a year ago";
   }

   // more that two days
   if (seconds > 2 * 24 * 3600) {
      return Math.floor(seconds / 60 / 60 / 24) + " days ago";
   }
   // a day
   if (seconds > 24 * 3600) {
      return "Yesterday";
   }
   // Hours
   if (seconds > 3600) {
      const hours = Math.floor(seconds / 60 / 60).toString();
      const hour = (hours > 1 ? "hours" : "hour").toString();
      return hours + " " + hour + " ago";
   }
   // Half Hour
   if (seconds > 1800) {
      return "Half an hour ago";
   }
   // Minutes
   if (seconds > 60) {
      return Math.floor(seconds / 60) + " minutes ago";
   }

   // Within a minute
   if (seconds > 10){
      return seconds + " seconds ago";
   }
   // Just now
   if (seconds > 0){
      return "Just a moment ago"
   }
   // Default condition
   return "Unable to calculate age"
}
