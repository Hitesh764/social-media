import React, { useState, useEffect } from 'react';
import './Trendcard.css';

function NewsHeadlines() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=in&apiKey=18fc6de3712c4b45b32252c9d6acf5e7');
        const data = await response.json();
        // Extracting headlines and image URLs from the data
        const articlesData = data.articles.map(article => ({
          title: article.title,
          image: article.urlToImage
        }));
        const shuffledArticles = shuffleArray(articlesData);
        // Take the first 10 shuffled articles
        setArticles(shuffledArticles.slice(0, 10));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className='newscard Chat-containerss'>
      <h2 className='headline'>Latest Headlines</h2>
      <div className="news-con">
        <div className='news-container'>
          {articles.map((article, index) => (
            <div className="news-card" key={index}>
              <img src={article.image} alt="Article" className="article-image" />
              <h5>{article.title}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsHeadlines;
