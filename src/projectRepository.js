export default class ProjectRepository{
    #projects;
    constructor(){
        this.#projects = [];
    }

    addProject(project){
        this.#projects.push(project);
    }

    deleteProject(index){
        this.#projects.splice(index,1);
    }

    get projects(){
        return this.#projects;
    }
    
    getLastProject(){
        return this.#projects[this.#projects.length - 1];
    }
}