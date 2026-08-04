import { useState, useEffect } from 'react'
// import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"
// import Editor from "react-simple-code-editor"
import * as Editor from "react-simple-code-editor";
import prism from "prismjs"
// import Markdown from "react-markdown"
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [ count, setCount ] = useState(0)
  const [ code, setCode ] = useState(` function sum() {
  return 1 + 1
}`)

  const [ review, setReview ] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code })
    setReview(response.data)
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            {/* <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            /> */}
            <textarea
  value={code}
  onChange={(e) => setCode(e.target.value)}
/>
            {/* <textarea
  value={code}
  onChange={(e) => setCode(e.target.value)}
/> */}
          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        <div className="right">
          <Markdown

            rehypePlugins={[ rehypeHighlight ]}

          >{review}</Markdown>
        </div>
        
      </main>
    </>
  )
}
export default App



// import { useState } from 'react';
// import Markdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";
// import axios from 'axios';
// import './App.css';

// // Utilize environment variables for API configuration
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// function App() {
//   const [code, setCode] = useState(`function sum() {\n  return 1 + 1\n}`);
//   const [review, setReview] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   async function handleReviewCode() {
//     if (!code.trim()) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post(`${API_BASE_URL}/ai/get-review`, { code });
//       setReview(response.data);
//     } catch (err) {
//       console.error("Error fetching code review:", err);
//       setError("Failed to fetch review. Please check your backend connection and try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <main className="container">
//       <section className="left">
//         <div className="code-editor">
//           <textarea
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             placeholder="Enter your code here..."
//             aria-label="Code Input Editor"
//           />
//         </div>
//         <button
//           onClick={handleReviewCode}
//           className="review-btn"
//           disabled={isLoading || !code.trim()}
//         >
//           {isLoading ? 'Reviewing...' : 'Review Code'}
//         </button>
//       </section>

//       <section className="right">
//         {error && <div className="error-banner">{error}</div>}
        
//         <Markdown rehypePlugins={[rehypeHighlight]}>
//           {review || '*Submit code above to generate an AI review.*'}
//         </Markdown>
//       </section>
//     </main>
//   );
// }

// export default App;