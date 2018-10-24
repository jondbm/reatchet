import React, { Component } from 'react'
import styled from 'styled-components'

import theme from '../../theme'

/*
*****************
STYLED COMPONENTS
*****************
*/

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing.md};
`

const Container = styled.div`
  flex: 0 0 auto;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

/*
*********
COMPONENT
*********
*/

class Dashboard extends Component {
  componentWillMount() {
    const { initializeDashboard, match } = this.props

    let projectId = ''
    if (match.params.projectId) {
      projectId = match.params.projectId
    }
    initializeDashboard(projectId)
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props
    const prevMatch = prevProps.match
    if (match.params && match.params.projectId) {
      const { projectId } = match.params
      const prevProjectId = prevMatch.params.projectId || ''
      if (projectId !== prevProjectId) {
        this.props.selectProject(projectId)
      }
    }
  }

  selectProject = e => {
    this.props.history.push(`/dashboard/${e.target.value}`)
  }

  render() {
    const { projects, selectedProject, user } = this.props
    return (
      <div>TEST</div>
    )
  }
}

export default Dashboard
