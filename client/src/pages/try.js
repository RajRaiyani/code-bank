// import  { useState } from 'react';
// import ReactMarkdown from 'react-markdown';

// const BlogEditor = () => {
//   const [markdownText, setMarkdownText] = useState('');

//   const handleMarkdownChange = (event) => {
//     setMarkdownText(event.target.value);
//   };

//   return(
//     <div>
//       <textarea
//         value={markdownText}
//         onChange={handleMarkdownChange}
//         placeholder="Write your blog in Markdown..."
//         rows={10}
//         cols={50}
//       />
//       <div>
//         <ReactMarkdown children={markdownText}  />
//       </div>
//     </div>
//   )
// }

// export default BlogEditor;


import React, { useEffect, useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import {marked} from 'marked'; 
import 'easymde/dist/easymde.min.css'; // Import CSS for SimpleMDE

const BlogEditor = () => {
  const [markdownText, setMarkdownText] = useState('<b> you can write a blog using </b> <Span style="font-size: 30px"><b>Html</b> </span> ');
  useEffect(() => {
    const htmlOutput =marked(markdownText); // Convert Markdown text to HTML
    console.log(htmlOutput); // Output HTML in console
  }, [markdownText]);

  return (
    <div className='m-2'>
      <SimpleMDE value={markdownText} onChange={setMarkdownText} />
      {/* Display the Markdown preview separately */}
      <div >
        <span>OUTPUT</span> <button className='px-2 py-2 gc-bg-green text-white border rounded-lg hover:text-xl'>Post Blog</button>
        <div dangerouslySetInnerHTML={{ __html: marked(markdownText) }}></div>
      </div>
    </div>
  );
};

export default BlogEditor;


