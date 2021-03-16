import React, {useContext,useState,useEffect} from 'react';
import {FirebaseContext} from '../components/Firebase';
import {Form, Input, Button} from '../components/common';
import styled from 'styled-components';

const FormField = styled.div`
margin-bottom: 20px;

`;

const fileReader = new FileReader();

const AddNote = () => {
    //destructor firebase :: create state itemes
    const {firebase} = useContext(FirebaseContext);
    const [authors,setAuthors] = useState([]);
    const [noteCover, setNoteCover] = useState('');
    const [noteName, setNoteName] = useState('');
    const [authorId, setAuthorId] = useState('');

    useEffect(() => {  //connected to setNoteCover
       fileReader.addEventListener('load', () =>{
          setNoteCove(fileReader.result);
       });
    },[]);
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

    //console.log(authors); //for testing
   // return (<div />) //empty div
   return(

    <Form onSubmit={(e) => {
       e.preventDefault()
       console.log(noteCover);
       console.log(authorId);
       console.log(noteName);
    }}>
    <FormField>
     <Input placeholder="note name" value={noteName} onChange={e => {
        e.persist();
        setNoteName(e.target.value);
     }}/>
    </FormField>
    {/*end of input*/}
    <FormField>
    <strong>Author</strong>
    <div>
     <select value={authorId} onChange={e => {
      e.persist();
      seAuthorId(e.target.value);
     }}>
       {authors.map(a => {
          <option key={a.id} value={a.id}>
             {a.name}
          </option>
       })}
     </select>
     </div>
    </FormField>
    {/*end of select*/}
    <FormField>
       <strong>Note Cover</strong>
       <Input type="file" onchange={e => {
         e.persist();
         //convert a file to base 64 encoded string , to make sure that file will be less than 10mg..
         fileReader.readAsDataURL(e.target.files[0];)
       }} />
    </FormField>
    <Button block type="submit">
       Add new note
    </Button>
    </Form>
   )
}

export default AddNote;
