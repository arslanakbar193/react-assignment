import React, { useState } from 'react';
import "../src/App.css"

function App() {
  const [imageDataList, setImageDataList] = useState([]);
  const [imageDataList1, setImageDataList1] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImageDataList = [...imageDataList, reader.result];
        setImageDataList(newImageDataList);
        localStorage.setItem('uploadedImages', JSON.stringify(newImageDataList));
      };
      reader.readAsDataURL(file);
    }
  };

  

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const pageStyle = {
    backgroundColor: isDarkMode ? '#5374a5' : 'white',
    color: isDarkMode ? 'white' : 'black',
    minHeight: '100vh',
    transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
  };

  

  const retrieveImagesFromLocalStorage = () => {
    const storedImageData = localStorage.getItem('uploadedImages');
    if (storedImageData) {
      setImageDataList1(JSON.parse(storedImageData));
    }
  };

  const clearImages = () => {
    setImageDataList([]);
    setImageDataList1([]);
    localStorage.removeItem('uploadedImages');
  };

  return (
    <div className='wrapper'>
    <div style={pageStyle}>
      <button className="button button-1" onClick={toggleDarkMode}>Toggle Color</button>
      <h1 className='heading'> Image Storage Example</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      
      <div>
        {imageDataList.map((imageData, index) => (
          <img key={index} src={imageData} alt={`Uploaded ${index}`} style={{ maxWidth: '200px' }} />
        ))}
      </div>
      <div className='flex'>
      <button className="space button-2" onClick={retrieveImagesFromLocalStorage}>Retrieve Images</button>
      <button className="button-2" onClick={clearImages}>Clear Images</button>
      </div>
      <div>
        {imageDataList1.map((imageData, index) => (
          <img
            key={index}
            src={imageData}
            alt={`Uploaded ${index}`}
            style={{ maxWidth: '400px', margin: '10px'  ,  height:"300px" , objectFit:'cover' }}
          />
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;