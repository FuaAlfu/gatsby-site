import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

// create style sheet
const NoteItemWrapper = styled.section`
*{
     font-family: 'Playfair Display', 'Imbue', 'Reem Kufi', sans-serif, serif;
}
border: 1px solid #ddd;
background: #fff;
padding:8px;
margin-bottom: 8px;
display:flex;
h2{
    small{
        font-weight: normal;
        font-size:15px;
        padding-ledt: 8px;
    }
}
`;

const NoteItemImageWrapper = styled.div`
max-width: 200px;

img{
    max-width: 200px;
}
`;

const NoteItemContentWrapper = styled.div`
flex-grow: 1;
padding-left: 8px
`;

 /* <img src={noteCover} alt="note cover"/> old but gold */
const NoteItem = ({authorName, noteTitle,noteSummary,noteCover,children}) =>{
    return(
        <NoteItemWrapper>
        <NoteItemImageWrapper>
        <Img fixed={noteCover}/>
        </NoteItemImageWrapper>
        <NoteItemContentWrapper>
                 <h2>
                {/*  {noteTitle} - <small>{authorName}</small>  old but gold*/}
                {noteTitle} <small>{authorName}</small>
                </h2>
                <p>{noteSummary}</p>
                <div>
                    {children}
                </div>
                </NoteItemContentWrapper>
        </NoteItemWrapper>
    )
}

export default NoteItem;