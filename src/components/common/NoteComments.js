import React, { useEffect,useState } from 'react'
import styled from 'styled-components';
import {Button} from './Button';
import {Input} from './Input';
import moment from 'moment';

const CommentForm = styled.form`
display: flex;
margin-top: 32px;

/* targeting input & button */
${Input}{
    margin-right: 8px;
    margin-top: auto;
    margin-bottom: auto;
}

${Button}{
    margin: auto 0;
}

`;

const CommentListItem = styled.div`
>strong{
    font-size: 80%;
    color: #666;
}
border-bottom: 1px solid #ddd;
padding: 4px 0;

`;

export const NoteComments = ({firebase,noteId}) => {
    const [comments,setComments] = useState([]);
    const [commentText, setCommentText] = useState('');

   const unsubscribe = useEffect(() =>{
        firebase.subscribeToNoteComments({
            noteId,
            onSnapshot: (snapshot) =>{
                console.log(snapshot);
                const snapshotComments = [];
                //using foreach from firebase libaries
                snapshot.forEach(doc => {
                   snapshotComments.push({
                       id: doc.id,
                       ...doc.data()
                   }) 
                })
                setComments(snapshotComments);
            }
        })

        return () =>{
            if(unsubscribe){
                unsubscribe();
            }
        }
    },[])

  //  console.log(comments); //for checking
  function handlePostCommentSubmit(e){
      e.preventDefault();
      //console.log(commentText); //testo-no-tame
      firebase.postComment({
          text: commentText,
          noteId
      })
  }
        return (
            <div>
            <CommentForm onSubmit={handlePostCommentSubmit}>
            <Input value={commentText} onChange={e => {
                e.persist();
                setCommentText(e.target.value); //async
            }}/>
            <Button type="submit">
            Post comment
            </Button>
            </CommentForm>
               {comments.map(comment => (
                   <CommentListItem key={comment.id}>
                   <strong>
                       {comment.username} - {moment(comment.dateCreated.toDate()).format('HH:mm Do MMM YYYY')} {/*'hh:mm DD MMM YYYY ||hh to show 12 hour*/}
                       </strong>
                       <div>
                           {comment.text}
                       </div>
                   </CommentListItem>
               ))}
            </div>
        )
    };

