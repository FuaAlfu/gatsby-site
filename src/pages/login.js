import React, {useState, useContext} from "react"
import { Link } from "gatsby"
import {FirebaseContext} from '../components/Firebase';
import {Form, Input, Button, ErrorMessage} from '../components/common';


import Layout from "../components/layout"
import SEO from "../components/seo"

const Login = () => {

    const [formValues, setFormValues] = useState({email: '',password: ''});
    const {firebase} = useContext(FirebaseContext);
    const [errorMessage, setErrorMessage] = useState('');

    function handleSubmit(e){
        e.preventDefault();

        //because its promise, we could add catch
        firebase.login({email: formValues.email, password:formValues.password}).catch(error =>{
          console.log(error);
          setErrorMessage(error.message);
        });
    }

     function handleInputChange(e){
       e.persist();
       setErrorMessage('');
        setFormValues(currentValues => ({
            //... spread operator
            ...currentValues,
            [e.target.name]: e.target.value
        }));
    }

    return(
  <section>
  <Form onSubmit={handleSubmit}>
  <Input required value={formValues.email} name="email" onChange={handleInputChange} placeholder="email" type="email" />
  <Input required value={formValues.password} name="password" onChange={handleInputChange}  placeholder="password" type="password"/>
  {!! errorMessage &&
  <ErrorMessage>
  {errorMessage}
  </ErrorMessage>}
  <Button type="submit" block>
  login
  </Button>
  </Form>
  </section>
);
}

export default Login
