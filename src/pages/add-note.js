import React, {useContext,useState,useEffect} from 'react';
import {FirebaseContext} from '../components/Firebase';
import {Form, Input, Button} from '../components/common';
import styled from 'styled-components';

const FormField = styled.div`
margin-bottom: 20px;

`;

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
   // return (<div />) //empty div
   return(

    <Form>
    <FormField>
     <Input placeholder="note name"/>
    </FormField>
    {/*end of input*/}
    <FormField>
    <strong>Author</strong>
    <div>
     <select >
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
       <Input type="file"/>
    </FormField>
    <Button block type="submit">
       Add new note
    </Button>
    </Form>
   )
}

export default AddNote;
