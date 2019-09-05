import appState from '../store/appState';
import infoData from '../data/000_info.json';
import knownPeopleData from '../data/001_known.people.json';
import educationData from '../data/010_education.json';
import experienceData from '../data/020_experience.json';
import courseworkData from '../data/011_coursework.json';
import publicationData from '../data/030_publication.json';
import awardData from '../data/040_award.json';
import projectData from '../data/050_project.json';
import skillData from '../data/060_skill.json';
import React from 'react';

const setupData = () => {
  appState.info.data = infoData;
  appState.award.data = awardData;
  appState.coursework.data = courseworkData;
  appState.education.data = educationData;
  appState.experience.data = experienceData;
  appState.skill.data = skillData;
  appState.project.data = projectData;
  appState.publication.data = publicationData;
  appState.people.data = knownPeopleData;
};

const getListOf = (component, dataArray, featured = false) => {
  dataArray = dataArray.filter(e => !e.archived);
  dataArray = featured ? dataArray.filter(e => e.featured) : dataArray;
  return dataArray.map((e, i) =>
    React.createElement(component, { ...e, key: i })
  );
};

export { setupData, getListOf };
