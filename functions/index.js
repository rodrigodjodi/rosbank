const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.adjustBalance = functions.firestore
  .document("accounts/{account}/transactions/{transaction}")
  .onWrite((change, context) => {
    console.log(change.after.data());
    return change.after.data();
    /*return change.after.ref.parent.parent.get().then(snapshot => {
      console.log(snapshot.get("balance"));
      return snapshot.get("balance");
    });*/
    //* If we set `/users/marie/incoming_messages/134` to {body: "Hello"} then
    //* context.params.userId == "marie";
    //* context.params.messageCollectionId == "incoming_messages";
    //* context.params.messageId == "134";
    //* ... and ...
    //* change.after.data() == {body: "Hello"}
  });
