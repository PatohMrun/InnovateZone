import React, { useRef, useState, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
<link rel="stylesheet" href="https://cdn.quilljs.com/1.3.6/quill.snow.css"></link>


const RichTextEditor = () => {
  const editorRef = useRef(null);
  const [formData, setFormData] = useState({ text: '' });

  useEffect(() => {
    const editor = new Quill(editorRef.current, {
      theme: 'snow'
    });

    editor.on('text-change', () => {
      setFormData({ text: editor.root.innerHTML });
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData.text);
    // do something with formData.text, for example, send it to the server
  };

  return (
    <form onSubmit={handleSubmit}>
      <div ref={editorRef} />
      {/* <button type="submit">Submit</button> */}
    </form>
  );
};

export default RichTextEditor;