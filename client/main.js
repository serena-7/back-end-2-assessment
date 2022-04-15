const baseURL = "http://localhost:4000/api";
const addForm = document.getElementById('addActivity');
const container = document.getElementById('activity-container');

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

addForm.addEventListener('submit',addSubmitHandler);

getAllActivities();