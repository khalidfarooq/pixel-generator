import React, { useEffect, useState } from 'react';
import './App.css'
function App() {
  const [file, setFile] = useState(null);
  const [ids, setIds] = useState([]);
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'text/plain') {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = handleFileRead;
      reader.readAsText(selectedFile);
    } else {
      alert('Please select a .txt file.');
    }
  };

async function handleCopyClick(event, text) {
  await navigator.clipboard.writeText(text);
    const button = event.target;
    button.textContent = "Copied";
    button.style.backgroundColor = "green";

}

  const handleFileRead = (event) => {
    const content = event.target.result;
    const lines = content.trim().split('\n');
    const idList = lines.map((line) => line.trim().split(' ')[0]);
    setIds(idList);
  };
function HtmlTemplate({ id }) {
  const html = `<script src="https://unpkg.com/analytics/dist/analytics.min.js"></script>
    <script type="text/javascript">
    const pixelIdAudienceLab = window.atob("${window.btoa(id)}");
    </script>
    <script src="https://cdn.audiencelab.io/pixel_1.0.js" type="text/javascript"></script>\n`;

  return html;
}


  return (
    <div id='main-app'>
      <div className='main-app-header'>
        <h1>PIXEL GENERATOR</h1>
        <h2>Upload a .txt File</h2>
        <input id="file-upload" type="file" accept=".txt" onChange={handleFileUpload}/>
      </div>
      {file && <p>You have selected: {file.name}</p>}
      {ids.length > 0 && (
        <div>
          <h3>IDs extracted from file:</h3>
          <ol>
            {ids.map((id) => (
              <li key={id}>
                <h4>{id}</h4>
                <pre className='code'>
                  {HtmlTemplate({ id })}
                </pre>
                <button
                  className="btn"
                  onClick={(event) => handleCopyClick(event, HtmlTemplate({ id }))}
                >
                  Copy to clipboard
                </button>
                <hr style={{marginTop:'20px'}}></hr>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
export default App;
