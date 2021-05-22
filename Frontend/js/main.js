const URL_BASE = "http://localhost:3001";

window.onload = function () {
    readAll();
}

function callAPI(url, method, callback, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url, true);
    if (method == 'POST' || method == 'PATCH' || method == 'PUT') {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }
    xhr.onload = function () {
        callback(xhr.status, xhr.response);
    }
    if (data) {
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
}

function readAll() {
    const url = URL_BASE + "/professores";
    callAPI(url, 'GET', function (status, response) {
        if (status === 200) {
            var content = document.getElementById('content');
            content.innerHTML = "";
            for (var i = 0; i < response.length; i++) {
                var str = createCard(response[i]);
                content.innerHTML += str;
            }

        } else {
            alert("Erro ao contatar o servidor. Tente novamente mais tarde!");
        }
    });
}

function insertProfessor() {
    event.preventDefault();
    var professor = {
        nome: document.getElementById('nome').value,
        drt: document.getElementById('drt').value,
        disciplinas: document.getElementById('disciplinas').value,
        departamento: document.getElementById('departamento').value
    }

    const url = URL_BASE + "/professores/";

    callAPI(url, "POST", function (status, response) {
        if (status === 200 || status === 201) {
            readAll();
            clear();
        } else {
            alert("ERRO: " + status + "Não foi possivel inserir um professor");
        }
    }, professor);
}

function deleteProfessor(drt) {
    const resp = confirm('Deseja realmente apagar o professor com tia ' + drt + '?');
    if (resp) {
        const url = URL_BASE + "/professores/" + drt;
        callAPI(url, "DELETE", function () {
            readAll();
        });
    }
}

function findProfessor(drt) {
    const url = URL_BASE + "/professores/" + drt;
    callAPI(url, "GET", function (status, response) {
        if (status === 200 || status === 201) {
            document.getElementById('nome').value = response.nome;
            document.getElementById('drt').value = response.drt;
            document.getElementById('disciplinas').value = response.disciplinas;
            document.getElementById('departamento').value = response.departamento;
            document.getElementById('button').innerHTML = "Atualizar";
            document.getElementById('button').onclick = updateProfessor;
        } else {
            alert("ERRO: " + status + "Não foi possivel encontrar o professor");
        }
    });
}

function updateProfessor() {
    event.preventDefault();
    var professor = {
        nome: document.getElementById('nome').value,
        drt: document.getElementById('drt').value,
        disciplinas: document.getElementById('disciplinas').value,
        departamento: document.getElementById('departamento').value
    }

    const url = URL_BASE + "/professores";

    callAPI(url, "PATCH", function (status, response) {
        if (status === 200 || status === 201) {
            readAll();

            clear();

            document.getElementById('button').innerHTML = "Inserir";
            document.getElementById('button').onclick = insertProfessor;

        } else {
            alert("ERRO: " + status + "Não foi possivel atualizar os dados");
        }
    }, professor);
}

function clear() {
    document.getElementById('nome').value= "";
    document.getElementById('drt').value= "";
    document.getElementById('disciplinas').value= "";
    document.getElementById('departamento').value= "";
}

function createCard(professor) {
    var str = "<article>";
    str += "<div class=card>"
    str += "<h3> Nome: " + professor.nome + "</h1>";
    str += "<p> DRT: " + professor.drt + "</p>";
    str += "<p> Disciplinas: " + professor.disciplinas + "</p>";
    str += "<p> Departamento: " + professor.departamento + "</p>";
    str += "<button onclick='deleteProfessor(" + professor.drt + ")'>X</button>";
    str += "<button onclick='findProfessor(" + professor.drt + ")'>Editar</button>";
    str += "</div>" 
    str += "</article>";
    return str;
}
