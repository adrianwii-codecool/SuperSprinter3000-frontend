const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const taskBody = document.querySelector("#task-data");
const form = document.querySelector("#add-task-form");

fetch("http://localhost:8081/tasks", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result);

        result.forEach(task => {
            taskBody.innerHTML += `
            <tr>
                <td>${task.id}</td>
                <td>${task.title}</td>
                <td>${task.description}</td>
                <td>${task.estimationTime}</td>
            </tr>
            `
        })
    })
    .catch(error => console.log('error', error));


form.addEventListener("submit", (e) => {
    e.stopPropagation();
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "title": form.title.value,
        "description": form.description.value,
        "estimatedTime": +form.estimationTime.value
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8081/api/add-task", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

})