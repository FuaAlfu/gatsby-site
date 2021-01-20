import React from "react";
import { Link,graphql } from "gatsby";

import Layout from "../components/layout";
import NoteItem from "../components/NoteItem";
import styled from 'styled-components';
//import Image from "../components/image"
//import SEO from "../components/seo"

const LinkButton = styled.div`
text-align: right;

a{
  padding:8px;
  /* margin-bottom: 16px; */
  /* background:rebeccapurple; */
  background: #fde8cd;
  color:#000;

  border-radius:8px;
  text-decoration:none;
  transition: all 0.5s ease;
  &:hover{
    /* background:indigo; */
    background:#ffcda3;
  }
}
`;

//noteCover={edge.node.imageUrl} //old but gold
const IndexPage = (props) => {
  console.log(props);
 return (
    <section>
    {props.data.allNote.edges.map(edge =>(
      <NoteItem
       noteCover={edge.node.localImage.childImageSharp.fixed}
      noteTitle={edge.node.title}
      noteSummary={edge.node.sammary}
      authorName={edge.node.author.name}
       key={edge.node.id}>
       <LinkButton>
        <Link to={`/note/${edge.node.id}`}>
        join conversation
        </Link>
        </LinkButton>
      </NoteItem>
    ))}
  </section>
);
}

//we use imageUrl in query but we change it to  localImage{
         // publicURL
        //}
//set up our query :: to query up our notes
//old  fixed(width: 200){
           //   src
          //  }
export const query = graphql`
{
  allNote {
    edges {
      node {
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
  }
  }
`;

export default IndexPage
