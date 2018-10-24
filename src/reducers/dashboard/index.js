/*
*******
ACTIONS
*******
*/

export const types = {
  INITIALIZE_DASHBOARD: '@@dashboard/INITIALIZE_DASHBOARD',
  DASHBOARD_INITIALIZED: '@@dashboard/DASHBOARD_INITIALIZED',
  GET_PROJECTS: '@@dashboard/GET_PROJECTS',
  SET_PROJECTS: '@@dashboard/SET_PROJECTS',
  GET_SELECTED_PROJECT: '@@dashboard/GET_SELECTED_PROJECT',
  SET_SELECTED_PROJECT: '@@dashboard/SET_SELECTED_PROJECT',
  GET_ACADEMY_VIDEOS: '@@dashboard/GET_ACADEMY_VIDEOS'
};

export const actions = {
  initializeDashboard: projectId => ({
    type: types.INITIALIZE_DASHBOARD,
    projectId
  }),
  getActiveProjects: () => ({ type: types.GET_PROJECTS }),
  selectProject: id => ({ type: types.GET_SELECTED_PROJECT, id })
};

/*
*******
REDUCER
*******
*/

const initialState = {
  dashboardInitialized: false,
  projects: [],
  selectedProject: {}
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case types.DASHBOARD_INITIALIZED:
      return { ...state, dashboardInitialized: true };

    case types.SET_PROJECTS:
      return { ...state, projects: action.payload.projects };

    case types.SET_SELECTED_PROJECT:
      return { ...state, selectedProject: action.payload.selectedProject };

    default:
      return state;
  }
};

export default reducer;
