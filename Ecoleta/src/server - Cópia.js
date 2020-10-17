const express = require("express")
const server = express()

//pegar um banco de dados
const db = require("./database/db.js")


//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))


//Ultilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true

})



//configurar caminhos da minha aplicação 
//pagina inicial
//req: Requisição
// res: Resposta

server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um titulo" })

})




server.get("/create-point", (req, res) => {

    //req.query: Query Strings da nossa url
    console.log(req.query)



    return res.render("create-point.html")

})


server.post("/savepoint", (req, res) => {

    //req.body: O corpo do nosso formulário
    // console.log(req.body)

    //inserir dados no banco de dados


    const query = `
INSERT INTO places (
image,
name,
address,
address2,
state,
city,
items

) VALUES (?,?,?,?,?,?,?);
  `
    const values = [ 
       req.body.image,
       req.body.name,
       req.body.address,
       req.body.address2,
       req.body.state,
       req.body.city,
       req.body.items 
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.send("ok")
    }

    db.run(query, values, afterInsertData)


    return res.send("ok")

})





server.get("/search", (req, res) => {

    //pegar os dados de um banco de dados

    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })

})



//ligar o servidor
server.listen(3000)