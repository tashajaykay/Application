const form = document.getElementById('vote-form');


// Form Submit Event
form.addEventListener('submit', e => {
    const choice = document.querySelector('input[name=os]:checked').value;
    const data = { os: choice };

    fetch('http://localhost:8088/poll', {
      method: 'post',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
    e.preventDefault();
});

fetch('http://localhost:8088/poll')
  .then(res => res.json())
  .then(data => {
    const votes = data.votes;
    const totalVotes = votes.length;
    // Count vote points - acc/current
    const voteCounts = votes.reduce(
      (acc, vote) => (
        (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)),acc),{});

      let dataPoints = [
        { label: 'Chrome', y: voteCounts.Chrome },
        { label: 'FireFox', y: voteCounts.FireFox },
        { label: 'Safari', y: voteCounts.Safari },
        { label: 'Explorer', y: voteCounts.Explorer },
      ];
    
      const chartContainer = document.querySelector('#chartContainer');
    
      if (chartContainer) {
        const chart = new CanvasJS.Chart('chartContainer', {
          animationEnabled: true,
          theme: 'theme1',
          title: {
              text: `Total votes ${totalVotes}`
          },
          data: [
            {
              type: 'pie',
              dataPoints: dataPoints
            }
          ]
        });
        chart.render();
    
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;
    
        var pusher = new Pusher('445601f6421fae734a5e', {
          cluster: 'eu',
          encrypted: true
        });
    
        var channel = pusher.subscribe('os-poll');
        channel.bind('os-vote', function(data) {
            dataPoints = dataPoints.map(x => {
                if (x.label == data.os) {
                  x.y += data.points;
                  return x;
                } else {
                  return x;
                }
              });
              chart.render();
        });
    
    }
  });




