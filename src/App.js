import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import Histogram from './Histogram';

const App = () => {
  const [histogramData, setHistogramData] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get('https://www.terriblytinytales.com/test.txt');
      const data = response.data;

      // Parse the content and calculate word frequencies
      const words = data.split(/\s+/);
      const wordFrequency = words.reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {});

      // Sort the word frequencies and get the top 20 most occurring words
      const sortedWords = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1]);
      const top20Words = sortedWords.slice(0, 20);

      // Prepare the histogram data
      const histogramData = top20Words.map(([word, frequency]) => ({
        word,
        frequency,
      }));

      setHistogramData(histogramData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleExport = () => {
    // Generate the CSV content
    const csvContent = `Word,Frequency\n${histogramData.map(data => `${data.word},${data.frequency}`).join('\n')}`;

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a temporary link and trigger the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'histogram.csv';
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {!submitted && 
      (<div className='button-container'>
      <button class="button-background-move" role="button" onClick={fetchData}>SUBMIT</button>
      </div>)}
      {histogramData.length > 0 && (
        <>
          <Histogram data={histogramData} />
          <div className='d-4'onClick={handleExport}>Export</div>
        </>
      )}
    </div>
  );
};

export default App;
