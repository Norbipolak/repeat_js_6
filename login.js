/*
<form>
    <h3>Felhasználónév</h3>
    <input type="text" id="userName">
    <h3>Jelszó</h3>
    <input type="password" id="pass">
    <button id="login">Bejelentkezés</button>
</form>

Csinéltuk ezt a form-ot bejelentkezéshez 
*/

//lementjük a dolgokat
const userNameInput = document.querySelector("#userName");
const passwordInput = document.querySelector("#pass");
const loginBtn = document.querySelector("#login");
const messagesDiv = document.querySelector("#messages");

//nagyon, fontos, hogy ennek async-nek kell lenni ennek a function-nek, ami az eventListener-ben van 

loginBtn.addEventListener("click", async (e)=> {
    e.preventDefault();
    const userName = userNameInput.value.trim();
    const pass = passwordInput.value.trim();

    //csináltuk egy objektet ezzekkel a lementett userName és pass-val
    const obj = {
        userName,
        pass
    }

    //dummyjson-on van egy olyan, hogy bejelentkezés és be probálunk jelenkezni ezzekkel a dolgokkal amik az obj-ben vannak

    const response = await fetch("https://dummyjson.com/login", {
        method: "POST",
        headers: {"content-type":"applicaiton/json"},
        body: JSON.stringify(obj)
    });

    const json = await response.json();

    //ugye response-nak van egy olyanja, hogy status meg egy olyan is, hogy ok
    console.log(response.status);

    //és ha amit visszakatunk response-ból, hogy ok az true, akkor jó ha meg ez false az meg azt jelenti, hogy nem sikerült 
    if(response.ok) {
        console.log("Sikeres bejelentkezés!");
        /*
        <div id="messages"></div>
        csináltunk egy ilyet és ha sikeres, akkor ennek az innerHTML vagy Text-jébe kiírjuk, hogy sikeres bejelentkezés
        de elöször le kell menteni
        */ 
        messagesDiv.innerHTML = "Sikeres bejelentkezés!";
    } else {
        console.log(json);
        messagesDiv.innerHTML = json.messages;//itt json-nak van egy olyan, hogy messages és kiírja, hogyha a response nem ok, akkor mi a hiba
    }
})

/*
fontos 
- btn-be csinéltunk egy fetch-et, akkor a function annak async-nek kell hogy legyen és mindenhol kell az await
- response.ok, így vizsgáljuk meg, hogy sikeres volt-e a bejelentkezés nem úgy, hogy try catch és akkor az error-t ott meg kiloggoljuk 
***************************************************************************************************************************************/
/*
Ahhoz, hogy be tudjunk jelentkezni kell egy token, ami alapján beenged minket, mert bejelentkezésnél is van, hogy kapunk egy token-t és 
csak azzal együtt tudunk bejelentkezni

és ezt majd headers-ben kell, hogy küldje!!!!! 
*/

//ez egy get kérés lesz 
async function getToken() {
    const response = await fetch("https://dumyjson.com/auth/me", {
        method: "GET",
        headers: {"Authorization":"Bearer Your token is here"}
    });

    const json = await response.json();
    console.log(json);

    for(const header of json.headers) {
        console.log(header);
    }
}

getToken();


//így van a dummyjson-on 
// fetch('https://dummyjson.com/auth/me', {
//     method: 'GET',
//     headers: {'Authorization':'Bearer you token is here'}
// }).then(res=> res.json()).then(console.log);
