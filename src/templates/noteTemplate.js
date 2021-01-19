import React, {useContext} from 'react';
import Layout from "../components/layout";
import NoteItem from "../components/NoteItem";
import {FirebaseContext} from '../components/Firebase'
import {graphql} from 'gatsby';
import {NoteComments} from '../components/common';

//noteCover={props.pageContext.imageUrl} //old but gold
/*
old but gold
   noteCover={props.pageContext.localImage.childImageSharp.fixed}
        authorName={props.pageContext.author.name}
        noteSummary={props.pageContext.sammary}
        noteTitle={props.pageContext.title} />
*/
const NoteTemplate = (props) =>{
    //console.log(props.data);
    const {firebase} = useContext(FirebaseContext)
    return(
        <section>
        <NoteItem 
         noteCover={props.data.note.localImage.childImageSharp.fixed}
        authorName={props.data.note.author.name}
        noteSummary={props.data.note.sammary}
        noteTitle={props.data.note.title} />
        {!!firebase && 
        <NoteComments firebase={firebase} noteId={props.data.note.id}/>
        }
        </section>
    )
};

export const query = graphql`
query NoteQuery($noteId: String!) {
      note(id:{eq:$noteId}){
     title
         localImage{
          childImageSharp{
            fixed(width: 200){
              ...GatsbyImageSharpFixed
            }
          }
        }
        sammary
        id
        author {
          name
        }
  }
}
`;


export default NoteTemplate;

/**
here we got access to pageContext
query NoteQuery() {} :: use any name

string! .. ! means important

-----------------------
old
export const query = graphql`
query NoteQuery($noteId: String!) {
      note(id:{eq:$noteId}){
    title
  }
}
`;
*/