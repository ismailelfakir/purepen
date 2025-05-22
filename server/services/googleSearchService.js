import axios from 'axios';

export const searchRelatedContent = async (text) => {
  try {
    const API_KEY = process.env.GOOGLE_API_KEY;
    const SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;
    const query = encodeURIComponent(text);

    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`
    );

    const items = response.data.items || [];
    
    // Filter and transform results
    const resources = items.slice(0, 5).map(item => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      type: item.pagemap?.videoobject ? 'video' : 'article'
    }));

    return resources;
  } catch (error) {
    console.error('Google Search API error:', error);
    return [];
  }
};