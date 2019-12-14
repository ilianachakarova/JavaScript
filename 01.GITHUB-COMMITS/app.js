function loadCommits() {
    // Try it with Fetch API
    
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const commitsContainer = document.getElementById('commits');
    fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
    
    .then(res=>res.json())
    .then(data=>{
    
        let commits = data.map(x=>[x.commit.author.name, x.commit.message]);
        commits.forEach(c=>{
            let li = document.createElement('li');
           li.textContent = `${c[0]}: ${c[1]}`;
           commitsContainer.appendChild(li);
        })
        }).catch(err=>{
                commitsContainer.innerHTML = '';
                let li = document.createElement('li');
                li.textContent = `Error: ${err.status} ${err.statusText}`
                commitsContainer.appendChild(li)
            
               })
        
    
}