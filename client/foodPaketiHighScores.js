const scores= [];
const headers=['Position', 'Player', 'Score', 'Time']

const getHighScores = async () => {
    const highscores = await fetch('/fdHighscores')
    const response = await highscores.json()
    scores.push(response)
}


const highscoresTable = document.getElementById('highscores-table');

const populateText = () => {

    let sortScores = scores[0].sort((a,b)=>b.score-a.score)
    const table = document.createElement('table');
    const thead = document.createElement('thead')
    const tbody = document.createElement('tbody');

    highscoresTable.appendChild(table);
    table.appendChild(thead)
    table.appendChild(tbody)
    

    headers.forEach(head=>{
        const prop= document.createTextNode(head)
        const th= document.createElement('th'); 
        thead.appendChild(th);

        th.appendChild(prop)
        th.classList.add('text')
    })

    for(let i=0; i<scores[0].length; i++){
        
        const name=document.createTextNode(sortScores[i].username)
        const points= document.createTextNode(sortScores[i].score)
        const time= document.createTextNode(sortScores[i].time || 'NA')
        const position= document.createTextNode(i+1)
    
        const tdName= document.createElement('td');
        const tdPoints= document.createElement('td')
        const tdPosition= document.createElement('td');
        const tdTime= document.createElement('td');
        const tr= document.createElement('tr'); 

        tbody.appendChild(tr);
        tr.appendChild(tdPosition);
        tr.appendChild(tdName);
        tr.appendChild(tdPoints);
        tr.appendChild(tdTime);
        tdPosition.appendChild(position);
        tdName.appendChild(name);
        tdPoints.appendChild(points);
        tdTime.appendChild(time)

        tdName.classList.add('text')
        tdPoints.classList.add('text')
        tdPosition.classList.add('text')
        tdTime.classList.add('text')
        tr.classList.add('tableRow')

    }   

    //Classes
    table.classList.add('table')
    highscoresTable.classList.add('table-container')
}


const populateFile = async() =>{
    await getHighScores();
    populateText();
}

populateFile()


