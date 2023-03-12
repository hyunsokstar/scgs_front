import React, { ReactElement } from 'react'
import ProjectProgressList from '../components/ProjectProgressList'

interface Props {
    
}

function ProjectAdminPage({}: Props): ReactElement {
    return (
        <div>
            <ProjectProgressList />
        </div>
    )
}

export default ProjectAdminPage
