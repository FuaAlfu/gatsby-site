import firebaseConfig from "./config";
import axios from 'axios';

class Firebase {
  constructor(app) {
    if(!firebaseInstance) {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
    }
  }

  async getUserProfile({userId}){
    return this.db.collection('publicProfiles').where('userId', '==', userId).get(); //where() func allows us to look fo, filtering or checking
  }

  async register({email,password, username}){
    const newUser = await this.auth.createUserWithEmailAndPassword(email,password);
    return this.db.collection('publicProfiles').doc(username).set({
      userId: newUser.user.uid
    })
  }

   subscribeToNoteComments({noteId,onSnapshot}){
    const noteRef = this.db.collection('notes').doc(noteId);
    return this.db.collection('comments').where('note','==',noteRef).onSnapshot(onSnapshot) //any time update will run this func
  }

  async login({email, password}) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }
}

let firebaseInstance;

function getFirebaseInstance(app) {
  if(!firebaseInstance && app){
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  }else if(firebaseInstance){
    return firebaseInstance
  }else{
    return null;
  }
}

export default getFirebaseInstance;
