


class Contact {
    constructor(name, landline, cellphone, imgLink, birthdate, email, cep, city, instagram, github) {

        this.name = name;
        this.landline = landline;
        this.cellphone = cellphone;
        this.imgLink = imgLink;
        this.birthdate = birthdate ;
        this.email = email;
        this.cep = cep;
        this.city = city;
        this.instagram = instagram;
        this.github = github;
        this.age = this.convertBirthdate() ;
        this.getZodiacSign = this.getZodiacSign();
        
    }

    getZodiacSign() {
        let birthdate = new Date(this.birthdate);
        let day = birthdate.getDate();
        let month = birthdate.getMonth() + 1;
        console.log("Passou pelo getSigno() da class User");

        if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
            return "Capricórnio ♑";
        } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
            return "Aquário ♒";
        } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
            return "Peixes ♓";
        } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
            return "Áries ♈";
        } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
            return "Touro ♉";
        } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
            return "Gêmeos ♊";
        } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
            return "Câncer ♋";
        } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
            return "Leão ♌";
        } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
            return "Virgem ♍";
        } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
            return "Libra ♎";
        } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
            return "Escorpião ♏";
        } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
            return "Sagitário ♐";
        }
    }

    convertBirthdate() {
        var hoje = new Date();
        var dataNasc = this.birthdate;
        let dataNascFormatado = new Date(dataNasc)

        var idade = hoje.getFullYear() - dataNascFormatado.getFullYear();

        var meses = hoje.getMonth() - dataNascFormatado.getMonth();

        if (meses < 0 || (meses === 0 && hoje.getDate() < dataNascFormatado.getDate())) {
            idade--;
        }

        return idade;
    }
}


const teste = new Contact("Joao", "199999999", "188888888", "blablaba", "17/11/2006", "joaodofuguete", "12345678", "taxilandia", "arroba", "sim");
console.log(teste);

//verificar inputs

function checkInputs() {
    let nome = document.getElementById("input-name").value;
    let telefone = document.getElementById("input-landline").value;
    let celular = document.getElementById("input-cellphone").value;
    let img = document.getElementById("input-imgLink").value;
    let data = document.getElementById("input-birthdate").value;
    let email = document.getElementById("input-email").value;
    let cep = document.getElementById("input-cep").value;
    let cidade = document.getElementById("input-city").value;
    let insta = document.getElementById("input-instagram").value;
    let git = document.getElementById("input-github").value;

    console.log(nome);
    console.log(telefone);
    console.log(celular);
    console.log(img);
    console.log(data);
    console.log(email);
    console.log(cep);
    console.log(cidade);
    console.log(insta);
    console.log(git);

    if (nome == "" || telefone == "" || celular == "" || img == "" || data == "" || email == ""|| cep == ""|| cidade == ""|| insta == ""|| git == "") {
        console.log("os inputs estão vazios")


        envieMsg('Preencha todos os campos', 'erro')

        return true;

        //vamos criar uma funçao que envie ou coloque na tela uma msg de erro
    }
    else {
        console.log("os inputs estão preenchidos")


        envieMsg('Cadastrado com sucesso', 'sucesso')
        return false;
    }
}

function envieMsg(msg, tipoMsg) {

    let msgDiv = document.getElementById("msg");
    msgDiv.innerHTML = '';

    let msgParaTela = `
    <p class='${tipoMsg}'>${msg}</p>
    `

    msgDiv.innerHTML = msgParaTela;


    setTimeout(function () {
        msgDiv.innerHTML = '';
    }, 3000)

}

function concludeRegister(){
    let nome = document.getElementById("input-name").value;
    let telefone = document.getElementById("input-landline").value;
    let celular = document.getElementById("input-cellphone").value;
    let img = document.getElementById("input-imgLink").value;
    let data = document.getElementById("input-birthdate").value;
    let email = document.getElementById("input-email").value;
    let cep = document.getElementById("input-cep").value;
    let cidade = document.getElementById("input-city").value;
    let insta = document.getElementById("input-instagram").value;
    let git = document.getElementById("input-github").value;

    const contact = new Contact(nome, telefone, celular, img, data, email, cep, cidade, insta, git);

    console.log(contact);


    contactBook.add(contact);
    
    renderizarConteudo();

}


class ListContact{
    constructor(){
        this.arrayContact = [];
    }

    add(parametro) {


        if (checkInputs()) {
            envieMsg("preencha todos os campos")
        }
        else if (!isURLValida(parametro.imgLink)){
            envieMsg("URL da imagem inválida!", 'erro');
        }
        else {
            this.arrayContact.push(parametro);
        }

    }
}

const contactBook = new ListContact();
console.log(contactBook);

function renderizarConteudo(){

    const listaHTML = document.getElementById("container-list");
    listaHTML.innerHTML = "";

    let array =  contactBook.arrayContact;

    array.forEach(contact => {
        const contactDiv = `
        <div onclick="infoContact()" class="contactDetalhe">
        <img src="${contact.imgLink}" alt="${contact.name}">
        <h2>${contact.name}</h2>
        <p>Telefone Fixo: ${contact.landline}</p>
        <p>Telefone Celular: ${contact.cellphone}</p>
        </div>
        `;

        listaHTML.innerHTML += contactDiv;
    });

   
}

function isURLValida(url) {
    if(url.match(/\.(jpeg|jpg|gif|png)$/) != null){
        return true;
    } else {
        return false;
    }

}

function whatsappLink(){
    let link = "https://api.whatsapp.com/send?phone=55" + this.cellphone;
    return link;
}

function infoContact(){
    const listaHTML = document.getElementById("container-info");
    listaHTML.innerHTcontactDetalheML = "";let array =  contactBook.arrayContact;

    array.forEach(contact => {
        const contactDiv = `
        <div class="contactInfo">
        <img src="${contact.imgLink}" alt="${contact.name}">
        <h2>${contact.name}</h2>
        <p>celular: ${contact.celphone}</p>
        <p>Telefone: ${contact.landline}</p>
        <p>Data de nascimento: ${contact.birthdate}</p>
        <p>Idade: ${contact.age}</p>
        <p>Signo: ${contact.getZodiacSign}</p>
        <p>Email: ${contact.email}</p>
        <p>CEP: ${contact.cep}</p>
        <p>Cidade: ${contact.city}</p>
        <p>Instagram: ${contact.instagram}</p>
        <p>Github: ${contact.github}</p>
        <br>
        <img onclick="whatsappLink()" src="assets/images/whatsapp (1).png" alt="Whatsapp">
        <img onclick="" src="assets/images/instagram.png" alt="Instagram">
        <img onclick="" src="assets/images/github.png" alt="Github">
        </div>
        `;

        listaHTML.innerHTML += contactDiv;
    });


}

//method: Age

