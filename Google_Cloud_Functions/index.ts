import * as admin from 'firebase-admin' //As this is simply to show code samples and not run the code I didn't bother with node modules
import * as functions from 'firebase-functions'

/**
 * Overview: This is a Google Cloud Function I wrote to clear auth before beginning beta testing with real users. 
 * It's callable via HTTP request. We have many other back-end functions like this, a few of which I have written,
 * but most of them I defined the specifications for. Typically these cloud functions react to events in the database 
 * and then perform business logic, but some are called directly from client-side. 
 */

export const listener = functions.https.onRequest(async (req: any, res: any) => {
    let usersList: Array<string> = []
    let idFound: boolean = false
    let deleteCount: number = 0
    let failCount: number = 0
    await admin.auth().listUsers()
      .then((listUsersResult: any) => {
        listUsersResult.users.forEach((userRecord: any) => {
          if (userRecord.uid !== 'tPQ1Q5EDqETd8l53cfD8cKHqfSp2')  usersList.push(userRecord.uid)
          else {idFound = true}
        });
      })
      .catch(function(error) {
        console.log('Error fetching user data:', error);
      });

      console.log(usersList);
      //DO NOT USE THIS FUNCTION, IT CLEARS ALL USERS FROM AUTH
      admin.auth().deleteUsers(usersList).then((deleteUsersResult: any) => {
        console.log('Successfully deleted ' + deleteUsersResult.successCount + ' users');
        console.log('Failed to delete ' +  deleteUsersResult.failureCount + ' users');
        deleteCount = deleteUsersResult.successCount;
        failCount = deleteUsersResult.failureCount;
        deleteUsersResult.errors.forEach((err: any) => {
          console.log(err.error.toJSON());
        });
      })
      .catch(function(error) {
        console.log('Error deleting users:', error);
      });


    res.send(`Hi if true, we found Resolvve, if not we didn't: ${idFound}. Deleted ${deleteCount} and failed ${failCount}`);
  })