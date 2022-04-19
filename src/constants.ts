import * as Realm from "realm-web";

export const app = new Realm.App({
    id: process.env.REACT_APP_REALM_APP_ID ?? "",
});
