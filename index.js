const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mutProfiles = {
    ['Alsyi']: {
        name: 'Alsyi Sabarini',
        dob: '1996-11-13',
        profilePic:'https://media-exp1.licdn.com/dms/image/C5603AQEbkEQ0jcMkOg/profile-displayphoto-shrink_200_200/0?e=1595462400&v=beta&t=-nh8RHkMmGDbBKfPXCThAAx9t38I7yTWuda87xC-qKg',
        workExperiences: [
            {
                startDate: '2020-01-01',
                endDate: null,
                jobTitle: 'Talent Acquisition',
                company: 'Glints',
                companyLogo: 'https://images.glints.com/unsafe/1200x0/glints-dashboard.s3.amazonaws.com/company-logo/805d861f71c172ce260a247028cb0718.png',
                jobDescription: 'Making hiring easier',
            },
            {
                startDate: '2020-06-21',
                endDate: null,
                jobTitle: 'Student',
                company: 'University of Indonesia',
                companyLogo: 'https://images.glints.com/unsafe/1200x0/glints-dashboard.s3.amazonaws.com/company-logo/805d861f71c172ce260a247028cb0718.png',
                jobDescription: 'Learn awesome Russian and European history',
            },
        ]
    },
    ['Helen']: {
        name: 'Helen',
        dob: '1995-12-07',
        profilePic: '',
        workExperiences: [
            {
                startDate: '2020-06-21',
                endDate: null,
                jobTitle: 'Software Engineer Lead',
                company: 'Glints',
                companyLogo: 'https://images.glints.com/unsafe/1200x0/glints-dashboard.s3.amazonaws.com/company-logo/805d861f71c172ce260a247028cb0718.png',
                jobDescription: 'Making hiring easier',
            },
            {
                startDate: '2018-06-25',
                endDate: '2020-06-20',
                jobTitle: 'Software Engineer',
                company: 'E-commerce based in Jakarta',
                companyLogo: 'https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online.jpg',
                jobDescription: 'Bringing easier life for Seller and Tokopedia users',
            },
        ],
    }
};

app.get('/profile/:profileId', (req, res) => {
    const profile = mutProfiles[req.params.profileId];
    if (!profile) {
        res.json({
            profile: null,
            status: 'PROFILE_NOT_FOUND'
        })
    }
    res.json({
        profile,
        status: 'OK',
    });
});

app.post('/profile', (req,res) => {
    const profileId = `${req.body.name.split(' ').join('-')}-${new Date().getTime()}`;
    mutProfiles[profileId] = req.body;
    res.json({
        status: 'OK',
        profileId,
        profile: req.body,
    });
});

app.post('/profile/:profileId', (req, res) => {
    mutProfiles[req.params.profileId] = req.body;
    res.json({
        status: 'OK',
        profileId: req.params.profileId,
        profile: req.body,
    });
});

app.listen(PORT, () => {
    console.log('glitter-be express app started at port ' + PORT);
});
