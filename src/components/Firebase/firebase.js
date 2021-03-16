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

   getUserProfile({userId,onSnapshot}){
    return this.db.collection('publicProfiles')
    .where('userId','==',userId)
    .limit(1)
    .onSnapshot(onSnapshot) //any time update will run this func

    /* no more need
    return this.db.collection('publicProfiles').where('userId', '==', userId).get(); //where() func allows us to look fo, filtering or checking
    */
  }

  async createAuthor({authorName}){
    const createAuthorCallable = this.functions.httpsCallable('createAuthor');
    return createAuthorCallable({
      authorName
    })
  }

  async getAuthors(){
    return this.db.collection('authors').get(); 
  }

  async createNote({noteName,authorId,noteCover}){
    const creatNoteCallable = this.functions.httpsCallable('createNote');
    return creatNoteCallable({
      noteName,
      authorId,
      noteCover
    })
  }

  async register({email,password, username}){
    
    /*old...
    const newUser = await this.auth.createUserWithEmailAndPassword(email,password);
     return this.db.collection('publicProfiles').doc(username).set({
      userId: newUser.user.uid
    })
    */
    const createProfileCallable = this.functions.httpsCallable('createPublicProfile');
    return createProfileCallable({
      username
    })
  }

  async postComment({text,noteId}){
    const postCommentCallable = this.functions.httpsCallable('postComment') //ref to firebase func
    return postCommentCallable({
      text,
      noteId
    });
  }

   subscribeToNoteComments({noteId,onSnapshot}){
    const noteRef = this.db.collection('notes').doc(noteId);
    return this.db.collection('comments')
    .where('note','==',noteRef)
    .orderBy('dateCreated','desc') //descending
    .onSnapshot(onSnapshot) //any time update will run this func
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
