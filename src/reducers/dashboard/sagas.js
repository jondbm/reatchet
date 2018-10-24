import { put, takeLatest, call, select } from 'redux-saga/effects';
import { types as dashboardTypes } from './';
import * as api from '../../api/dashboard';

/*
*********
SELECTORS
*********
*/

const selectProjects = state => state.dashboard.projects;

/*
*********
WORKERS
*********
*/

export function* initializeDashboard(action) {
  // Populate the entire active projects list
  yield call(getActiveProjects);

  // Initialise the selected project for the rest of the widgets
  let projectId = action.projectId || '';
  if (!projectId) {
    const projects = yield select(selectProjects);
    projectId = projects.sort((a, b) => b.createdOn - a.createdOn)[0].id;
  }

  yield call(getSelectedProject, { id: projectId });
  yield put({ type: dashboardTypes.DASHBOARD_INITIALIZED });
}

export function* getActiveProjects(action) {
  try {
    const response = yield call(api.getProjects);
    const projects = response.data;

    const projectsArray = Object.keys(projects).map(project => projects[project]);
    const activeProjects = projectsArray.filter(project => project.status === 'live');
    const sortedProjects = activeProjects.sort((a, b) => b.createdOn - a.createdOn);
    const slicedProjects = sortedProjects.slice(0, 4);

    yield put({
      type: dashboardTypes.SET_PROJECTS,
      payload: { projects: slicedProjects }
    });
  } catch (err) {
    throw new Error(err);
  }
}

export function* getSelectedProject(action) {
  try {
    // Fetch the selected project by ID
    const response = yield call(api.getSelectedProject, action.id);
    const selectedProject = response.data;

    // Sort the returned values as we need them
    const { recentUploads, shots, topContributors } = selectedProject;

    const sortedValues = {};

    sortedValues.recentUploads = recentUploads.sort((a, b) => b.uploadedOn - a.uploadedOn);
    sortedValues.shots = shots.sort((a, b) => b.uploads - a.uploads);
    sortedValues.topContributors = topContributors.sort((a, b) => b.uploads - a.uploads);

    const project = { ...selectedProject, ...sortedValues };

    yield put({
      type: dashboardTypes.SET_SELECTED_PROJECT,
      payload: { selectedProject: project }
    });
  } catch (err) {
    throw new Error(err);
  }
}

export function* getAcademyVideos(action) {}

/*
********
WATCHERS
********
*/

export default [
  takeLatest(dashboardTypes.INITIALIZE_DASHBOARD, initializeDashboard),
  takeLatest(dashboardTypes.GET_PROJECTS, getActiveProjects),
  takeLatest(dashboardTypes.GET_SELECTED_PROJECT, getSelectedProject),
  takeLatest(dashboardTypes.GET_ACADEMY_VIDEOS, getAcademyVideos)
];
