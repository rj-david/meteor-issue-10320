// Meteor Packages
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

if (Meteor.isServer) {
  // Initialize Accounts object
  Accounts.config({
    sendVerificationEmail: false,
    forbidClientAccountCreation: true,
    loginExpirationInDays: null
  });

  // register service name: 'sample'
  Accounts.registerLoginHandler("sample", options => {
    // ensure that this is the right loginhandler
    if (options.type === "sample-login") {
      const user = Meteor.users.findOne({});

      if (user) {
        return { userId: user._id };
      }

      throw new Meteor.Error("failed-login", "Login failed");
    }

    return null;
  });
}

export default Accounts;
