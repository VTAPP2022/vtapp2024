import { GoogleAuthProvider, signInWithRedirect, signOut, getAuth } from "@firebase/auth"
import { app } from "./firebase"

const authApp = getAuth(app);
authApp.useDeviceLanguage();

const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("email");
    provider.addScope("profile");

    try {
        await signInWithRedirect(authApp, provider);
    } catch (error) {
        // Do something
        console.error(error)
    }
};

const signOutGoogle = async () => {
    try {
        await signOut(authApp);
    } catch (error) {
        console.error(error);
    }
}

export { authApp, signInWithGoogle, signOutGoogle };

