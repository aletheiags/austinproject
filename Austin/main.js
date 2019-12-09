const menuItems = document.querySelectorAll(".menuItem")
const content = document.getElementById("content");

let tr = localStorage.getItem("entries");
const entries = tr ? JSON.parse(tr) : [];

const itemClicked = (evt) => {
    console.log(evt.target.id);
    let id = evt.target.id;
    menuItems.forEach((mi) => {
        mi.setAttribute("class", "menuItem")
        if (mi.id == id) {
            mi.setAttribute("class", "menuItem selected");
        }

    })
    if (id == "main") {
        launchmain();
    } else if (id == "addEntry") {
        launchAddEntry();
    } else if (id == "listEntries") {
        launchListEntries();
    }
}


menuItems.forEach((mi) => mi.addEventListener("click", itemClicked))

const launchmain = () => {
    let date = new Date().toDateString();
    let entryCount = entries.length
    let recent = entries.sort((a,b)=>a.date-b.date)[entries.length-1]


    content.innerHTML = `
    <h1>Daily Journal</h1>
    <div class="today">TODAY IS ${date}</div>
    <div class="entryCount">You Have ${entryCount} Entries</div>
    <div class="recent">Most Recent - ${recent.title}</div>
    `;
}

const submitForm = () =>{
    let title = document.getElementById("title").value;
    let entry = document.getElementById("entry").value;
    
    let newEntry = {
        title:title,
        entry:entry,
        date:new Date().getTime()
    }

    entries.push(newEntry);

    localStorage.setItem("entries",JSON.stringify(entries))
    
    console.log(entries);
    itemClicked({target:{id:"listEntries"}});
    //launchListEntries();
}

const launchAddEntry = () => {
    content.innerHTML = `
        <h1>Add Entry</h1>
        <div class="form">
            <input class="title" id="title" placeholder="Journal Title" />
            <textarea class="entry" id="entry" placeholder="Write about your day"></textarea>
            <button class="button" type="button" id="submitForm">Add Entry</button>
         </div>  
     `

//let cont = document.createElement("div");
//let form = document.createElement("form");
//let input = document.createElement("input");

//input.setAttribute("class", "title");
//input.setAttribute("placeHolder", "With something Here");

document.getElementById("submitForm")
.addEventListener("click", submitForm)
}

const launchListEntries = ()=>{       
        const entryItem = (entry,index)=>{
            return ` 
            <div class="anEntry">
            <button class="delete" delId="${index}">x</button>
            <div class="entry_date">${new Date(entry.date).toDateString()}</div>
            <div class="entry_title">${entry.title}</div>
            <div class="entry_text">${entry.entry}</div>
            </div>`
        }

        content.innerHTML=`
        <h1>List Entries</h1>
        <div class="entriesList">${entries.map(entryItem).join("")}</div>
        `
        document.querySelectorAll(".delete").forEach((item,idx)=>{
            item.addEventListener("click",()=>{
                console.log('Im Deleting Item'+idx);
                entries.splice(idx,1);
                localStorage.setItem("entries",JSON.stringify(entries));
                launchListEntries();
            })
        })
       
        document.querySelectorAll(".anEntry").forEach((item,idx)=>{
            console.log(entries[idx]); 
            item.addEventListener("click",()=>{
                let ent = entries[idx];
                let html = `
                    <div class="modal">
                        <button id="back"> BACK </button>
                        <div class="modalTitle">${ent.title}</div>
                        <div class="modalText">${ent.entry}</div>
                    </div>
                    `
                    content.innerHTML = html;
                    document.getElementById("back").addEventListener("click",  launchListEntries)
                    

            })
        })

    }

launchmain();