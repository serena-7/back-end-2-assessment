const baseURL = "http://localhost:4000/api";
const addForm = document.getElementById('addActivity');
const container = document.getElementById('activity-container');
const getRand = document.getElementById('getRandAct');
const randomSect = document.getElementById('random-sect');
//-------------------------------------------------------------------//

document.getElementById("complimentButton").onclick = function () {
    axios.get(`${baseURL}/compliment`)
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
};

document.getElementById("fortuneButton").onclick = function () {
    axios.get(`${baseURL}/fortune`)
        .then((res) => {
            const data = res.data;
            alert(data);
        });
};

//-------------------------------------------------------------------//

const activityCallBack = ({data: activities}) => displayActivities(activities);
const errCallback = err => console.log(err);

const getAllActivities = () => axios.get(`${baseURL}/activities`).then(activityCallBack).catch(errCallback);
const createActivity = body => axios.post(`${baseURL}/activities`, body).then(activityCallBack).catch(errCallback);
const deleteActivity = id => axios.delete(`${baseURL}/activities/${id}`).then(activityCallBack).catch(errCallback);
const updateActivity = (id, type) => axios.put(`${baseURL}/activities/${id}`, {type}).then(activityCallBack).catch(errCallback);

function addSubmitHandler(evt) {
    evt.preventDefault();

    let activity = document.querySelector('#activityInput');
    let imgURL = document.querySelector('#activityImgURL');
    let ratingOptions = document.querySelector('#rating');
    let rating = ratingOptions.options[ratingOptions.selectedIndex];

    let bodyObj = {
        activity: activity.value,
        imgURL: imgURL.value,
        rating: rating.value
    }

    createActivity(bodyObj);

    activity.value = '';
    imgURL.value = '';
    ratingOptions.value = "1";

}


function createActivityCard(item) {
    const activityCard = document.createElement('div');
    activityCard.innerHTML = `
    <h2 class="activity">${item.activity}</h2>
    <a href=${item.imgURL}>link to activity</a>
    <div class="rating-btns">
        <button onclick="updateActivity(${item.id}, 'minus')">-</button>
        <p class="act-rating">${item.rating}</p>
        <button onclick="updateActivity(${item.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteActivity(${item.id})">delete</button>
    `;

    container.appendChild(activityCard);
}

function displayActivities(arr){
    container.innerHTML = ``;
    for(let i = 0; i < arr.length; i++){
        createActivityCard(arr[i]);
    };
};

function addRandom(act,url){
    const randRatingOpt = document.querySelector('#randRating');
    const randRating = randRatingOpt.options[randRatingOpt.selectedIndex];
    const newObj = {
        activity: act,
        imgURL: url,
        rating: randRating.value
    }
    createActivity(newObj);

    clearRandom();
}

function clearRandom(evt) {
    const div = document.querySelectorAll('#random-sect>div');
    for(let i = 0; i < div.length; i++){
        div[i].remove();
    }
}

function randSubmitHandler(e){
    e.preventDefault();
    clearRandom();
    axios.get('http://www.boredapi.com/api/activity/').then(res => {
        randActivity = res.data.activity;
        randImgURL = res.data.link;
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <h2 id="randomAct">${randActivity}</h2>
        <a id="randLink" href=${randImgURL}>link</a>
        <form id="randomAddForm">
            <div id="rand-div">
                <label for="randRating">Choose a Rating:</label>
                <select id="randRating" name="randRating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <button id="randAddBtn">Add to List</button>
        </form>
        <button id="randClearBtn">Clear</button>
        `
        randomSect.appendChild(newDiv);
        const randomAddForm = document.querySelector("#randAddBtn");
        randomAddForm.addEventListener('click',function(e){
            e.preventDefault();
            addRandom(randActivity,randImgURL)
        })
        const clearBtn = document.querySelector('#randClearBtn');
        clearBtn.addEventListener('click',clearRandom);
    })
}

addForm.addEventListener('submit',addSubmitHandler);
getRandAct.addEventListener('click',randSubmitHandler);
getAllActivities();