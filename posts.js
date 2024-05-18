/*
    <div class="container">
        <h1>Post</h1>
        <div id="posts-holder">
            <div class="post">
                <h3>Title</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sint adipisci cumque qui
                     optio voluptatibus, beatae, eius quos illo accusantium voluptate enim quidem quibusdam?
                      Assumenda quod perferendis eum eius eveniet?
                </p>
            </div>
            <div class="tags">
                <div class="tag">wef</div>
                <div class="tag">earhg</div>
            </div>
        </div>
    </div>

ez lesz a html szerkezet 
1. container
2. ebbe lesz a posts-holder, ami egy grid lesz 
3.majd ezekbe lesznek a post-ok 

css
-> 
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

h1, h2, h3 ,h4, h5, h6 {
    margin: 10px 0;
}

p {
    padding: 10px 0;
}

.container {
    max-width: 800px;
    margin: auto;
    padding: 15px;
}

.post {
    width: 90%;
    background-color: #efefef;
    border: 1px solid #dcdcdc;
    border-radius: 10px;
    margin-bottom: 15px; 
}

.tags {
    display: flex;
    justify-content: left;
}

.tag {
    background-color: #aaf0f5;
    border: 1px solid #88bfc3;
    padding: 5px;
    margin: 5px 5px 0 0;
    border-radius: 4px;
}
*/ 

const postsDiv = document.querySelector("#posts-holder");

async function getPosts() {
    const response = await fetch("https://dummyjson.com/posts");
    const json = await response.json();
    console.log(json);

/*
{posts: Array(30), total: 150, skip: 0, limit: 30}
    limit: 30
    posts: Array(30)
        0: {id: 1, title: 'His mother had always taught him', body: 'His mother ...' }
    skip: 0
    total: 150
    [[Prototype]]: Object

és akkor itt nekünk ebből a json-ből, ami lejött a json.posts-ra lesz szükségünk 
azon kell majd végigmenni és megcsinálni úgy mint a html-be van most a szerkezetet
*/
    for(const post of json.posts) {
        const div = document.createElement("div");
        div.classList.add("post");
        const p = document.createElement("p");
        p.innerText = post.body;
        const title = document.createElement("h3");
        title.innerText = post.title;
        const tags = docuemnt.createElement("div");
        tags.classList.add("tags");

        for(const tag of post.tags) {
            const t = document.createElement("div");
            t.innerText = tag;
            t.classList.add("tag");
            tags.appendChild(tag);
        }
    }

    div.appendChild(p);
    div.appendChild(title);
    div.appendChild(tags);

    postsDiv.appendChild(div);

}

/*
Végigmentünk a post-okon egy for-val, megcsináltuk a dolgokat, amikben ki szeretnénk írni különböző dolgaokat amiket tartalmaz 
ez a json.posts objektum (title, body, id stb.)
és aszerint, hogy ezek milyen hosszúak vagy mi a szerepük, csináltunk nekik html szerkezetet
pl. a post.title az cím lesz, nem olyan hosszú és azt szeretnénk, hogy ez felül legyen 
->
1. csináltunk neki egy h3-ast és utána innerText-vel megadtuk neki, hogy mi az értéke -> post.title

de előtte csináltunk egy div-et, amibe bent lesznek ezek és annak megadtunk egy class-t is a classList.add-val 
és utána appendChild-oltunk legvégén meg mindent appendChild-oltunk abba ami le van mentve a postsDiv-be

ugy mivel a post.tags is egy tömb, azon is végig kell menni és minden tag div-et amit ott csináltunk majd appendChild-olni kell a tags-hoz 
ami a parent div-e lesz ezeknek 
valahogy így 
->
<div class="tags">
    <div class="tag">wef</div>
    <div class="tag">earhg</div>
</div>

*/

getPosts();