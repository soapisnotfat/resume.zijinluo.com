import jwt from 'jsonwebtoken';
import React from 'react';
import appState from '../store/appState';

class Util {
  query = `{
    info{
      firstName,
      lastName,
      preferredName,
      location,
      position,
      pastLocations,
      phone,
      school_email,
      personal_email,
      official_email,
      primary_email,
      website_url,
      github_url,
      blog_url,
      resume_download_url,
      cv_download_url
    },
    award{
      title,
      awardedBy,
      notes,
      date,
      featured,
      archived
    },
    coursework{
      name, 
      items
    },
    education{
      name,
      study,
      startDate,
      endDate,
      isCurrent,
      notes,
      featured,
      archived
    },
    experience{
      title,
      company,
      companyLink,
      location,
      skills,
      startDate,
      endDate,
      notes,
      featured,
      archived,
    },
    skill{
      name, 
      items
    },
    project{
      title,
      notes,
      date,
      featured,
      archived
    },
    publication{
      title,
      authors,
      venue,
      links {
        PDF,
        AAAI,
        Arxiv
      },
      date,
      featured,
    },
    people{
      names,
      me,
      link
    }
  }`;

  getListOf = (component, dataArray, featured = false) => {
    dataArray = dataArray.filter(e => !e.archived);
    dataArray = featured ? dataArray.filter(e => e.featured) : dataArray;
    return dataArray.map((e, i) =>
      React.createElement(component, { ...e, key: i })
    );
  };

  dataQuery = async query => {
    const token = await jwt.sign(
      { time: new Date().getTime() },
      process.env.REACT_APP_AUTHENTICATION_TOKEN,
      { algorithm: 'HS256' }
    );

    const response = await fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ query: query })
    });

    const data = await response.json();
    return data.data;
  };

  setupData = data => {
    appState.info.data = data.info;
    appState.award.data = data.award;
    appState.coursework.data = data.coursework;
    appState.education.data = data.education;
    appState.experience.data = data.experience;
    appState.skill.data = data.skill;
    appState.project.data = data.project;
    appState.publication.data = data.publication;
    appState.people.data = data.people;
  };
}

const util = new Util();
export default util;
