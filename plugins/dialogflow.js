// import dialogflow from "dialogflow";

// export default ({ app }, inject) => {
//   const projectId = "your-dialogflow-project-id"; // Replace with your Dialogflow project ID
//   const sessionClient = new dialogflow.SessionsClient();
//   const sessionPath = sessionClient.projectAgentSessionPath(
//     projectId,
//     "your-session-id"
//   ); // Replace with your session ID or user ID

//   inject("dialogflow", {
//     sendMessage: async (text) => {
//       const request = {
//         session: sessionPath,
//         queryInput: {
//           text: {
//             text: text,
//             languageCode: "en-US", // You can change this based on the language
//           },
//         },
//       };

//       const responses = await sessionClient.detectIntent(request);
//       return responses[0].queryResult.fulfillmentText;
//     },
//   });
// };
