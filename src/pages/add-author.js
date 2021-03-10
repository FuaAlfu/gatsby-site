import React, {useState,useContext} from 'react';
import {Form, Input, Button} from './components/common';
import {FirebaseContext} from '../components/Firebase'

const AddAuthor =  () => {
    const {firebase} = useContext(FirebaseContext);
    const [authorName,setAuthorName] = useState('');
    const [success, setSuccess] = useState(false);
    function handleSubmit(){
        e.preventDefault();
        firebase.ccreateAuthor({
            authorName
        }).then(() =>{
            setAuthorName('');
            setSuccess(true);
        })
    }
        return (
            <Form onSubmit={handleSubmit}>
                <Input onChange={(e) =>{
                    e.persist();
                    setSuccess(false);
                    setAuthorName(e.target.vale);
                }} value={authorName} placeholder="author name"/>
                {!!success && 
                <span>
                  Author created succesfully.
                </span>
                }
                <Button type="submit" block>
                  Add new Author
                </Button>
            </Form>
        )
}

export default AddAuthor;
