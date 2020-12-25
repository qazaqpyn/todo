const Folder = (name, dataTasks) => {
    const getName = () => {
        return name;
    }

    const getTasks = () => {
        return dataTasks;
    }

    const addTask = (name, date, done) => {
        dataTasks.push(Task(name,date,done)); 
    }

    const deleteTask = (id) => {
        dataTasks.splice(id,1);
    }
    

    return {getName,getTasks,addTask,deleteTask}
}


const Task = (name, date, done) => {
    const getName = () => {
        return name;
    }
    const getDone = () => {
        return done;
    }
    const getDate = () => {
        return date;
    }
    const changeDone = () => {
        done = !done;
    }
    return {getName, getDone, changeDone, getDate}
}

export {Task, Folder};