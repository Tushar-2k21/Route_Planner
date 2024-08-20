
async function fetchDataFromFirebase() {
    try {
      const response = await firebase.firestore().collection('graphData').get();
      const data = response.docs.map(doc => doc.data());
      return data;
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      return [];
    }
  }
  
  // Function to parse the string and create adjacency list
  function createAdjacencyList(data) {
    const adjacencyList = {};
  
    // Function to calculate edge weight
    function calculateWeight(cost, time, x) {
      return x * cost + (1 - x) * time;
    }
  
    data.forEach(item => {
      const [city1, mode_of_transport, name, cost, time, city2] = item.split('-');
      const edgeWeight = calculateWeight(parseFloat(cost), parseInt(time), 0.5); // Assuming x = 0.5
  
      if (!adjacencyList[city1]) {
        adjacencyList[city1] = [];
      }
      adjacencyList[city1].push({ destination: city2, weight: edgeWeight });
    });
  
    return adjacencyList;
  }
  let EdgeString;
  // Example usage
  (async () => {
    const firebaseData = await fetchDataFromFirebase();
    const adjacencyList = createAdjacencyList(firebaseData);
    console.log(adjacencyList);
  })();
  
async function fetchDataFromFirebase() {
    try {
      const response = await firebase.firestore().collection('graphData').get();
      const data = response.docs.map(doc => doc.data());
      return data;
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      return [];
    }
  }
  
  // Function to parse the string and create adjacency list
  function createAdjacencyList(data) {
    const adjacencyList = {};
  
    // Function to calculate edge weight
    function calculateWeight(cost, time, x) {
      return x * cost + (1 - x) * time;
    }
  
    data.forEach(item => {
      const [city1, mode_of_transport, name, cost, time, city2] = item.split('-');
      const edgeWeight = calculateWeight(parseFloat(cost), parseInt(time), 0.5); // Assuming x = 0.5
  
      if (!adjacencyList[city1]) {
        adjacencyList[city1] = [];
      }
      adjacencyList[city1].push({ destination: city2, weight: edgeWeight });
    });
  
    return adjacencyList;
  }
  
  // Modified-Dijkstra's Algorithm to find shortest paths

  
  function dijkstra(adjacencyList, start) {
    const distances = {};
    const visited = {};
    const previous = {};
    const queue = [];
    let PredecessorMap = new map();
  
    for (let vertex in adjacencyList) {
      distances[vertex] = Infinity;
      previous[vertex] = null;
      visited[vertex] = false;
    }
  
    distances[start] = 0;
    queue.push({ vertex: start, weight: 0 });
  
    while (queue.length > 0) {
      queue.sort((a, b) => a.weight - b.weight);
      const { vertex, weight } = queue.shift();
      if (!visited[vertex]) {
        visited[vertex] = true;
        adjacencyList[vertex].forEach(neighbor => {
          const alt = distances[vertex] + neighbor.weight;
          if (alt < distances[neighbor.destination]) {
            distances[neighbor.destination] = alt;
            previous[neighbor.destination] = vertex;
            queue.push({ vertex: neighbor.destination, weight: alt });
            PredecessorMap.push({vertex,EdgeString});
          }
        });
      }
    }
  
    return { distances, previous };
  }
  
  // Function to get all paths from start to end
  function getAllPaths(previous, end) {
    const paths = [];
    for (let vertex = end; vertex !== null; vertex = previous[vertex]) {
      paths.unshift(vertex);
    }
    return paths;
  }
  
  // Example usage
  (async () => {
    const firebaseData = await fetchDataFromFirebase();
    const adjacencyList = createAdjacencyList(firebaseData);
    const { distances, previous } = dijkstra(adjacencyList, 'StartCity');
    const sortedDistances = Object.entries(distances).sort((a, b) => a[1] - b[1]);
  
    sortedDistances.forEach(([city, distance]) => {
      const path = getAllPaths(previous, city);
      // console.log(`Shortest Path to ${city}: ${distance} - ${path.join(' -> ')}`);
    });
  })();

  