/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

//from tom philips
exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === "develop-html" || stage === "build-html") {
    actions.setWebpackConfig({
      resolve: {
        mainFields: ["main"],
      },
    })
  } else {
    actions.setWebpackConfig({
      resolve: {
        mainFields: ["browser", "module", "main"],
      },
    })
  }
}

//this is not a random function.. must type the same name below
exports.createPages =({graphql,actions}) =>{
    //actions ref to redux : behind the scene
    const {createPage} = actions;
    const noteTemplate = path.resolve('src/templates/noteTemplate.js')

    return graphql(`
    {
  allNote {
    edges {
      node {
        id
        }
      }
    }
  }
    `).then((result) =>{  //this is a promise
    if(result.errors){
        throw result.errors;
    }

    result.data.allNote.edges.forEach(note => {
        createPage({
            path: `/note/${note.node.id}`,
            component: noteTemplate, //null : old
            context: {noteId: note.node.id}
        });
    });
    })

}

/**
old code
   {
  allNote {
    edges {
      node {
        title
        sammary
        id
          localImage{
          childImageSharp{
            fixed(width: 200){
              src
            }
          }
        }
        author {
          name
        }
      }
    }
  }
  }

  ----
      result.data.allNote.edges.forEach(note => {
        createPage({
            path: `/note/${note.node.id}`,
            component: noteTemplate, //null : old
            context: note.node
        });
    });
    })

 */