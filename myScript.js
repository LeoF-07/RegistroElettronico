const materie = [
    {
        nome: "ed. civica",
        id: "votoEdCivica"
    },
    {
        nome: "italiano",
        id: "votoItaliano"
    },
    {
        nome: "storia",
        id: "votoStoria"
    },
    {
        nome: "inglese",
        id: "votoInglese"
    },
    {
        nome: "matematica",
        id: "votoMatematica"
    },
    {
        nome: "informatica",
        id: "votoInformatica"
    },
    {
        nome: "sistemi",
        id: "votoSistemi"
    },
    {
        nome: "TPSIT",
        id: "votoTPSIT"
    },
    {
        nome: "telecomunicazioni",
        id: "votoTelecomunicazioni"
    },
    {
        nome: "scienze motorie",
        id: "votoScienzeMotorie"
    }
];

let studenti = [];

function onLoad_Setup(){
    let materieEVoti = document.getElementById("materieEVoti");

    materie.forEach(materia => {
        let input = `<input type="text" name="votoMateria" class="voto" id="${materia.id}"><br>`;
        let votoEMateria = `<div class="votoEMateria">${materia.nome + ":" + input}</div>`
        materieEVoti.innerHTML += votoEMateria;
    });


    let selezioneMateria = document.getElementById("selezioneMateria");

    materie.forEach(materia => {
        let opzione = document.createElement('option');
        opzione.append(materia.nome);
        opzione.setAttribute("value", `"${materia.id}"`);
        selezioneMateria.append(opzione);
    });
}

function aggiungiStudente(){
    let form = document.getElementById("form");
    let cognome = document.getElementById("cognome").value;
    let nome = document.getElementById("nome").value;

    if(trovaPosizioneStudente(cognome, nome) != -1) {
        alert("Studente già presente, se vuoi puoi modificare");
        return;
    }

    let radioSesso = document.getElementsByName('sesso');
    let sesso;
    for (i = 0; i < radioSesso.length; i++) {
        if (radioSesso[i].checked){
            sesso = radioSesso[i].value;
            break;
        }
    }

    let votiMaterie = [
        document.getElementById("votoEdCivica").value,
        document.getElementById("votoItaliano").value,
        document.getElementById("votoStoria").value,
        document.getElementById("votoInglese").value,
        document.getElementById("votoMatematica").value,
        document.getElementById("votoInformatica").value,
        document.getElementById("votoSistemi").value,
        document.getElementById("votoTPSIT").value,
        document.getElementById("votoTelecomunicazioni").value,
        document.getElementById("votoScienzeMotorie").value
    ];

    studenti.push(
        {
            "cognome": cognome,
            "nome": nome,
            "sesso": sesso,
            "votiMaterie": votiMaterie
        }
    );

    let studente = `<div onclick=riprendiDati(${studenti.length - 1}) id="${cognome}_${nome}" class="contenitoreStudente">${cognome + " " + nome + " " + sesso + " " + materieTesto(votiMaterie)}</div>`;
    document.getElementById("registro").innerHTML += studente;

    form.reset(); // poi potrei anche toglierlo
}

function modificaStudente(){
    let cognome = document.getElementById("cognome").value;
    let nome = document.getElementById("nome").value;

    let posizioneStudente = trovaPosizioneStudente(cognome, nome);

    if(posizioneStudente == -1) {
        alert("Studente non presente, se vuoi puoi aggiungerlo");
        return;
    }

    studenti[i].votiMaterie = [
        document.getElementById("votoEdCivica").value,
        document.getElementById("votoItaliano").value,
        document.getElementById("votoStoria").value,
        document.getElementById("votoInglese").value,
        document.getElementById("votoMatematica").value,
        document.getElementById("votoInformatica").value,
        document.getElementById("votoSistemi").value,
        document.getElementById("votoTPSIT").value,
        document.getElementById("votoTelecomunicazioni").value,
        document.getElementById("votoScienzeMotorie").value
    ];

    let divStudente = document.getElementById(`${cognome}_${nome}`);
    divStudente.innerHTML = `${cognome + " " + nome + " " + studenti[i].sesso + " " + materieTesto(studenti[i].votiMaterie)}`;
}

function trovaPosizioneStudente(cognome, nome){
    for(let i = 0; i < studenti.length; i++){
        if(studenti[i].cognome == cognome && studenti[i].nome == nome) return i;
    }

    return -1;
}

function materieTesto(votiMaterie){
    let materieTesto = "";
    votiMaterie.forEach(materia => {
        materieTesto += `${materia} `;
    });
    return materieTesto;
}

function riprendiDati(i){
    let studente = studenti[i];

    document.getElementById("cognome").value = studente.cognome;
    document.getElementById("nome").value = studente.nome;
    
    let radioSesso = document.getElementsByName("sesso");
    if(studente.sesso == "M") radioSesso[0].checked = true;
    else radioSesso[1].checked = true;

    let votiMaterie = document.getElementsByName("votoMateria");
    for(let i = 0; i < votiMaterie.length; i++){
        votiMaterie[i].value = studente.votiMaterie[i];
    }
}

function rimuoviStudente(){
    let cognome = document.getElementById("cognome").value;
    let nome = document.getElementById("nome").value;

    let posizioneStudente = trovaPosizioneStudente(cognome, nome);

    if(posizioneStudente == -1) {
        alert("Studente non presente, se vuoi puoi aggiungerlo");
        return;
    }

    studenti.splice(posizioneStudente, 1);

    let divStudente = document.getElementById(`${cognome}_${nome}`);
    divStudente.remove();

    let contenitoriStudenti = document.getElementsByClassName("contenitoreStudente");
    for(let i = posizioneStudente; i < contenitoriStudenti.length; i++){
        contenitoriStudenti[i].removeAttribute("onclick");
        contenitoriStudenti[i].setAttribute("onclick", `riprendiDati(${studenti.length - 1})`);
    }
}

function ordinaStudenti(){
    let temp;
    let swapped;
    for(let i = 0; i < studenti.length; i++){
        swapped = false;

        for(let j = 0; j < studenti.length - i - 1; j++){
            if((studenti[j].cognome + studenti[i].none) > (studenti[j + 1].cognome + studenti[j + 1].cognome)){
                temp = studenti[j];
                studenti[j] = studenti[j + 1];
                studenti[j + 1] = temp;
                swapped = true;
            }
        }

        if(!swapped) break;
    }

    let registro = document.getElementById("registro");
    registro.innerHTML = "";

    for(let i = 0; i < studenti.length; i++){
        let studente = `<div onclick=riprendiDati(${i}) id="${studenti[i].cognome}_${studenti[i].nome}" class="contenitoreStudente">${studenti[i].cognome + " " + studenti[i].nome + " " + studenti[i].sesso + " " + materieTesto(studenti[i].votiMaterie)}</div>`;
        document.getElementById("registro").innerHTML += studente;
    }
}

function calcolaMedia(){
    let selezioneMateria = document.getElementById("selezioneMateria");
    let indiceSelezionato = selezioneMateria.selectedIndex;

    let materiaSelezionata = selezioneMateria.options[indiceSelezionato];
    let valoreOpzione = opzioneSelezionata.value;
    //let testoOpzione = valoreSelezionato.text;
}