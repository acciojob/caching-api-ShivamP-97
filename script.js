const fetchButton = document.getElementById("fetch-button");
const resultsDiv = document.getElementById("results");

const cache = new Map();
const cacheKey = "triviaData";
const CACHE_DURATION = 60000;

const fetchData = async () => {
  const now = Date.now();

  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    if (now - cached.timestamp < CACHE_DURATION) {
      console.log("Serving data from cache");
      return cached.data;
    }
  }

  console.log("Making API call");
  const response = await fetch("https://opentdb.com/api.php?amount=3");
  const data = await response.json();

  cache.set(cacheKey, {
    timestamp: now,
    data
  });

  return data;
};

const displayData = (data) => {
  if (!data || !data.results || !data.results[0]) {
    resultsDiv.textContent = "No data available";
    return;
  }

  const question = data.results[0].question;
  resultsDiv.textContent = question;
};

fetchButton.addEventListener("click", async () => {
  const data = await fetchData();
  displayData(data);
});
