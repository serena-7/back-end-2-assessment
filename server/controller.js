const compliments = ["Gee, you're a smart cookie!",
"Cool shirt!",
"Your Javascript skills are stellar."];

const fortunes = ["A hunch is creativity trying to tell you something.", "An important person will offer you support.", "Because you demand more from yourself, others respect you deeply.", "Bide your time, for success is near.", "Dedicate yourself with a calm mind to the task at hand."]

const activities = [];
let activityID = 1;

module.exports = {
    getCompliment: (req, res) => {
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];

        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];

        res.status(200).send(randomFortune);
    },
    getActivities: (req, res) => {
        res.status(200).send(activities);
    },
    createActivity: (req, res) => {
        const {activity, imgURL, rating} = req.body;
        let newActivity = {
            id:activityID,
            activity,
            imgURL,
            rating: +rating
        }
        activities.push(newActivity);
        activityID++;
        res.status(200).send(activities);
    },
    deleteActivity: (req,res) => {
        const index = activities.findIndex(e => e.id === +req.params.id);
        activities.splice(index,1);
        res.status(200).send(activities);
    },
    updateActivity: (req,res) => {
        const id = req.params.id;
        const type = req.body.type;
        const index = activities.findIndex(e => e.id === +id);
        if(type === 'minus' && activities[index].rating > 0){
            activities[index].rating--;
            res.status(200).send(activities);
        } else if (type === 'plus' && activities[index].rating < 5){
            activities[index].rating++;
            res.status(200).send(activities);
        } else{
            res.status(400).send('request failed');
        }
    }
  }