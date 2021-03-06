import React, {useState} from 'react';
import {Form, Input, Button} from './components/common';

const AddAuthor =  () => {
    const [authorName,setAuthorName] = useState('');
    function handleSubmit(){
        e.preventDefault();
        
    }
        return (
            <Form onSubmit={handleSubmit}>
                <Input onChange={(e) =>{
                    e.persist();
                    setAuthorName(e.target.vale);
                }} value={authorName} placeholder="author name"/>
                <Button type="submit" block>
                  Add new Author
                </Button>
            </Form>
        )
}

export default AddAuthor;
