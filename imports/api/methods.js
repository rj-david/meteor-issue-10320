import { Meteor } from "meteor/meteor";
import Accounts from "./accounts-sample";

Meteor.methods({
  "register.user"({ username }) {
    const serviceData = {
      id: username
    };
    const newUser = Accounts.updateOrCreateUserFromExternalService(
      "sample",
      serviceData,
      {
        username
      }
    );

    return { username };
  }
});
