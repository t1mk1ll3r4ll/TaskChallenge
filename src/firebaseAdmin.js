const admin = require("firebase-admin");
const serviceAccount = require("../secrests.json");

export const verifyIdToken = (token) => {
  if (!admin.apps.lenght) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://taskchallenge-111c6-default-rtdb.firebaseio.com",
    });
  }
  return admin
    .auth()
    .verifyIdToken(token)
    .cathc((error) => {
      throw error;
    });
};
