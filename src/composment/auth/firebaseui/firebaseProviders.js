import firebase from 'firebase'

const providers = {
    [firebase.auth.EmailAuthProvider.PROVIDER_ID]: {
        provider: firebase.auth.EmailAuthProvider,
        name: "email",
        icon: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg",
        btnClass: "firebaseui-idp-password",
    },
    [firebase.auth.GoogleAuthProvider.PROVIDER_ID]: {
        provider: firebase.auth.GoogleAuthProvider,
        name: "Google",
        icon: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg",
        btnClass: "firebaseui-idp-google"
    },
    [firebase.auth.GithubAuthProvider.PROVIDER_ID]: {
        provider: firebase.auth.GithubAuthProvider,
        name: "Github",
        icon: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/github.svg",
        btnClass: "firebaseui-idp-github"
    },
    [firebase.auth.FacebookAuthProvider.PROVIDER_ID]: {
        provider: firebase.auth.FacebookAuthProvider,
        name: "Facebook",
        icon: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg",
        btnClass: "firebaseui-idp-facebook"
    },
    [firebase.auth.PhoneAuthProvider.PROVIDER_ID]: {
        provider: firebase.auth.PhoneAuthProvider,
        name: "phone",
        icon: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/phone.svg",
        btnClass: "firebaseui-idp-phone"
    },
    [firebase.auth.TwitterAuthProvider.PROVIDER_ID]: {
        provider: firebase.auth.TwitterAuthProvider,
        name: "Twitter",
        icon: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/twitter.svg",
        btnClass: "firebaseui-idp-twitter"
    }
}

export default providers