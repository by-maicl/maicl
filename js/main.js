const fileName = 'data.json'

const projectsContainer = document.querySelector('.projects__container')
const projectDetails = document.querySelector('.project-modular')
const projectDetailsContainer = document.querySelector('.project-modular__container')
let companiesData = []

const getData = async fileName => {
    try {
        const response = await fetch(fileName)
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

const showProjects = data => {
    data.forEach(project => {
        const projectEl = document.createElement('div')
        projectEl.classList.add('projects__element')
        projectEl.dataset.projectName = project.name
        projectEl.innerHTML = `
            <img src="assets/companies/logo/${project.logo}" class="projects__company-logo">
            <h1 class="projects__company-name">${project.name}</h1>
            <div class="projects__more-info">
                <span class="projects__more-info-title">Детальніше</span>
                <button class="projects__btn"><img src="assets/icons/dots.png"></button>
            </div>`
        projectsContainer.appendChild(projectEl)
    })
}

const showProjectsDetails = projectData => {
    const companyName = document.querySelector('.project-modular__title')
    const imgPreview = document.querySelector('.project-modular__preview')
    const companyDescription = document.querySelector('.project-modular__info')
    const companyLink = document.querySelector('#companyLink')
    const closeModular = document.querySelector('#closeModular')

    showModal()
    
    closeModular.addEventListener('click', showModal)

    companyName.textContent = projectData.name
    imgPreview.src = `assets/companies/preview/${projectData.preview}`
    companyDescription.textContent = projectData.description
    companyLink.href = projectData.link
}

const showModal = () => {
    projectDetails.classList.toggle('project-modular--active')
    projectDetailsContainer.classList.toggle('project-modular__container--active')
    // document.body.style.overflow = 'hidden'
}

const init = async () => {
    companiesData = await getData(fileName)
    showProjects(companiesData)
}

init()

projectsContainer.addEventListener('click', e => {
    const moreInfo = e.target.closest('.projects__more-info')

    if (moreInfo) {
        const projectElement = e.target.closest('.projects__element')
        const projectName = projectElement.dataset.projectName
        const projectData = companiesData.find(project => project.name === projectName)

        showProjectsDetails(projectData)
    }
})