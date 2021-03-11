import React, {useContext,useState,useEffect} from 'react';
import {FirebaseContext} from '../components/Firebase'

const AddNote = () => {
    //destructor firebase
    const {firebase} = useContext(FirebaseContext);
    const [authors,setAuthors] = useState([]);
    
    useEffect(() =>{
        //query all availabe authors
        if(firebase){
        firebase.getAuthors()
        .then(snapshot => {
            //console.log(snaoshot); //for testing
        const availabeAuthors = [];
        snaoshot.forEach(doc => {
            availabeAuthors.push({
                id: doc.id,
                ...doc.data()
            })
        } )

        setAuthors(availabeAuthors);
        })
      }
    },[firebase]);

    console.log(authors);
    return (<div />) //empty div
}

export default AddNote;
