import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.deleteUser = functions.firestore.document('users/{id}').onDelete((res, context) => {
    const id = context.params.id;
    return admin.auth().deleteUser(id);
});

exports.createUser = functions.firestore
.document('newUsers/{userId}')
.onCreate(async (snap,ctx) =>{
    const userId = ctx.params.userId;
    const newUser = await admin.auth().createUser({
        disabled: false,
        displayName: snap.get('name'),
        email: snap.get('email'),
        password: snap.get('password')
    });

    await admin.firestore().collection('users').doc(newUser.uid).set({
        id: newUser.uid,
        email: newUser.email,
        name: newUser.displayName,
        roles: snap.get('roles')
    });
    // Delete the temp document
    return admin.firestore().collection('newUsers').doc(userId).delete();
});
