const { Telegraf } = require('telegraf');
const { Pool } = require('pg');
const moment = require('moment');
const fs = require('fs')

const pool = new Pool ({
    user: 'postgres',
    database: 'nossosonho',
    password: 'postgres',
    port: 5432,
    host: '192.168.0.45'
});

const TOKEN = 'TOKEN HERE';
const bot = new Telegraf(TOKEN);

bot.command('guardarRendimento', async ctx => {
    const user = ctx.message.from.first_name;
    const id = ctx.message.from.id;
    const datetime = moment().format('DD/MM/YYYY hh:mm:ss');
    const context = (`${datetime} - ${id} - ${user} digitou o comando /guardarRendimento\n`);
    fs.appendFile('bot.log',context, err => {
        if (err) throw err;
    });
    console.log(context);

    var insert = false;
    var executeFunc = false;

    var argv = ctx.update.message.text.split(' ');

    try{
        if (argv[1]){
            var value_receiv = argv[1]
            executeFunc = true;
        } else {
            executeFunc = false;
        };
    } catch {
        executeFunc = false;
    };

    if (executeFunc==true){
        console.log(`insert into investiments (code,name_code,valor,data_invest) values (nextval('investiments_code_seq'),3,${value_receiv},now())`);
        //const query1 = await pool.query(`insert into investiments (code,name_code,valor,data_invest) values (nextval('investiments_code_seq'),3,${value_receiv},now())`);
        insert = true;
    } else {
        var mensagem = "Não foi possivel inserir o valor desejado!";
        insert = false;
    };

    if (insert == false) {
        ctx.reply(mensagem);
    } else {
        value_receiv = formataDinheiro(value_receiv);
        ctx.reply(`Valor de R$ ${value_receiv} foi inserido para Rendimentos!`);
    };
});

bot.command('guardarBrenda', async ctx => {
    const user = ctx.message.from.first_name;
    const id = ctx.message.from.id;
    const datetime = moment().format('DD/MM/YYYY hh:mm:ss');

    const context = (`${datetime} - ${id} - ${user} digitou o comando /guardarBrenda\n`);
    fs.appendFile('bot.log', context, err => {
        if (err) throw err;
    } )
    console.log(context);

    var insert = false;
    var executeFunc = false;

    var argv = ctx.update.message.text.split(' ');

    try{
        if (argv[1]){
            var value_receiv = argv[1]
            executeFunc = true;
        } else {
            executeFunc = false;
        };
    } catch {
        executeFunc = false;
    };

    if (executeFunc==true){
        console.log(`insert into investiments (code,name_code,valor,data_invest) values (nextval('investiments_code_seq'),2,${value_receiv},now())`)
        //const query1 = await pool.query(`insert into investiments (code,name_code,valor,data_invest) values (nextval('investiments_code_seq'),2,${value_receiv},now())`)
        insert = true;
    } else {
        var mensagem = "Não foi possivel inserir o valor desejado!";
        insert = false;
    };

    if (insert == false) {
        ctx.reply(mensagem);
    } else {
        value_receiv = formataDinheiro(value_receiv);
        ctx.reply(`Valor de R$ ${value_receiv} foi inserido para Brenda!`);
    };
});

bot.command('guardarFernando', async ctx => {
    const user = ctx.message.from.first_name;
    const id = ctx.message.from.id;
    const datetime = moment().format('DD/MM/YYYY hh:mm:ss');

    const context = (`${datetime} - ${id} - ${user} digitou o comando /guardarFernando\n`);
    fs.appendFile('bot.log', context, err => {
        if (err) throw err;
    } )
    console.log(context);

    var insert = false;
    var executeFunc = false;

    var argv = ctx.update.message.text.split(' ');

    try{
        if (argv[1]){
            var value_receiv = argv[1]
            executeFunc = true;
        } else {
            executeFunc = false;
        };
    } catch {
        executeFunc = false;
    };

    if (executeFunc==true){
        console.log(`insert into investiments (code,name_code,valor,data_invest) values (nextval('investiments_code_seq'),1,${value_receiv},now())`)
        //const query1 = await pool.query(`insert into investiments (code,name_code,valor,data_invest) values (nextval('investiments_code_seq'),2,${value_receiv},now())`)
        insert = true;
    } else {
        var mensagem = "Não foi possivel inserir o valor desejado!";
        insert = false;
    };

    if (insert == false) {
        ctx.reply(mensagem);
    } else {
        value_receiv = formataDinheiro(value_receiv);
        ctx.reply(`Valor de R$ ${value_receiv} foi inserido para Fernando!`);
    };
});

bot.command('valorTotal', async ctx => {
    const user = ctx.message.from.first_name;
    const id = ctx.message.from.id;
    const datetime = moment().format('DD/MM/YYYY hh:mm:ss');

    const context = (`${datetime} - ${id} - ${user} digitou o comando /valorTotal\n`);
    fs.appendFile('bot.log', context, err => {
        if (err) throw err;
    } )
    console.log(context);

    const query = await pool.query("select sum(acc.valor),nom.name from investiments acc join nomes nom on (acc.name_code=nom.code) group by nom.name,nom.code order by nom.code");
    var valorTotal = 0;
    var array_message = [];

    if (query.rows.length==0) {
        ctx.reply("Não há registros!");
    } else {
        for (row in query.rows) {
            var valor = formataDinheiro(query.rows[row].sum);
            valorTotal = valorTotal + Number(query.rows[row].sum);
            var mensagem = "\n\n"+query.rows[row].name+"\n"+valor;
            array_message.push(mensagem.toString());
        }
        valorTotal = formataDinheiro(valorTotal);
        array_message.push(`\n\nValor Total\nR$ ${valorTotal}`);
        ctx.reply(array_message.toString());
    };

});

bot.command('relacaoFernando', async ctx => {
    const user = ctx.message.from.first_name;
    const id = ctx.message.from.id;
    const datetime = moment().format('DD/MM/YYYY hh:mm:ss');

    const context = (`${datetime} - ${id} - ${user} digitou o comando /relacaoFernando\n`);
    fs.appendFile('bot.log', context, err => {
        if (err) throw err;
    } )
    console.log(context);

    const query = await pool.query('select acc.valor,nom.name,acc.data_invest from investiments acc join nomes nom on (acc.name_code=nom.code) where nom.code=1');

    var valorTotal = 0;
    var array_message = [];
    array_message.push("Resumo de Fernando");

    if(query.rows.length==0) {
        ctx.reply("Não há registros!");
    } else {
        for (row in query.rows){
            var valor = formataDinheiro(Number(query.rows[row].valor));
            valorTotal = valorTotal + Number(query.rows[row].valor);
            var mensagem = `\n\n${moment(query.rows[row].data_invest).format("DD/MM/YYYY hh:mm")}\nR$ ${valor}`;
            array_message.push(mensagem.toString());
        };
        valorTotal = formataDinheiro(valorTotal);
        array_message.push(`\n\nValor Total\nR$ ${valorTotal}`);
        ctx.reply(array_message.toString());
    };
});

bot.command('relacaoBrenda', async ctx => {
    const user = ctx.message.from.first_name;
    const id = ctx.message.from.id;
    const datetime = moment().format('DD/MM/YYYY hh:mm:ss');

    const context = (`${datetime} - ${id} - ${user} digitou o comando /relacaoBrenda\n`);
    fs.appendFile('bot.log', context, err => {
        if (err) throw err;
    } )
    console.log(context);

    const query = await pool.query('select acc.valor,nom.name,acc.data_invest from investiments acc join nomes nom on (acc.name_code=nom.code) where nom.code=2');

    var valorTotal = 0;
    var array_message = [];
    array_message.push("Resumo de Fernando");

    if(query.rows.length==0) {
        ctx.reply("Não há registros!");
    } else {
        for (row in query.rows){
            var valor = formataDinheiro(Number(query.rows[row].valor));
            valorTotal = valorTotal + Number(query.rows[row].valor);
            var mensagem = `\n\n${moment(query.rows[row].data_invest).format("DD/MM/YYYY hh:mm")}\nR$ ${valor}`;
            array_message.push(mensagem.toString());
        };
        valorTotal = formataDinheiro(valorTotal);
        array_message.push(`\n\nValor Total\nR$ ${valorTotal}`);
        ctx.reply(array_message.toString());
    };
});

bot.command('relacaoMensal', async ctx => {
    const user = ctx.message.from.first_name;
    const id = ctx.message.from.id;
    const datetime = moment().format('DD/MM/YYYY hh:mm:ss');

    const context = (`${datetime} - ${id} - ${user} digitou o comando /relacaoMensal\n`);
    fs.appendFile('bot.log', context, err => {
        if (err) throw err;
    } )
    console.log(context);

    const query1 = await pool.query("select date_trunc('month',data_invest) as data_invest, sum(valor),name from investiments acc join nomes nom on (acc.name_code=nom.code) group by date_trunc('month',data_invest),name,name_code order by data_invest,acc.name_code;")
    const query2 = await pool.query("select date_trunc('month',data_invest) as data_invest from investiments group by date_trunc('month',data_invest) order by data_invest;")

    var valorTotal = 0;
    var array_message = [];
    array_message.push("Resumo Mensal");

    if(query1.rows.length==0){
        ctx.reply("Não há registros!");
    }else{

        for (row in query2.rows) {

            array_message.push(`\n\n${moment(query2.rows[row].data_invest).format("MM/YYYY")}`);
            for (row2 in query1.rows) {
                if(moment(query2.rows[row].data_invest).format("MM")==moment(query1.rows[row2].data_invest).format("MM")){
                    let valor = (query1.rows[row2].sum);
                    valorTotal = valorTotal + query1.rows[row2].sum;
                    let mensagem = `\n${query1.rows[row2].name} R$ ${formataDinheiro(valor)}`;
                    array_message.push(mensagem);
                };
            };
        };

        ctx.telegram.sendMessage(id,array_message.toString());
    };
});

bot.command('retirarSonho', async ctx => {
    const user = ctx.message.from.first_name;
    const id = ctx.message.from.id;
    const datetime = moment().format('DD/MM/YYYY hh:mm:ss');

    const context = (`${datetime} - ${id} - ${user} digitou o comando /retirarSonho\n`);
    fs.appendFile('bot.log', context, err => {
        if (err) throw err;
    } )
    console.log(context);

    var insert = false;
    var executeFunc = false;

    var argv = ctx.update.message.text.split(' ');

    try{
        if (argv[1]){
            var value_receiv = argv[1]
            executeFunc = true;
        } else {
            executeFunc = false;
        };
    } catch {
        executeFunc = false;
    };

    if (executeFunc==true){
        console.log(`insert into investiments (code,name_code,valor,data_invest) values (nextval('investiments_code_seq'),4,${value_receiv},now())`)
        //const query1 = await pool.query(`insert into investiments (code,name_code,valor,data_invest) values (nextval('investiments_code_seq'),4,${value_receiv},now())`)
        insert = true;
    } else {
        var mensagem = "Não foi possivel inserir o valor desejado!";
        insert = false;
    };

    if (insert == false) {
        ctx.reply(mensagem);
    } else {
        value_receiv = formataDinheiro(value_receiv);
        ctx.reply(`Valor de R$ ${value_receiv} foi retirado para realização sonho!`);
    };
});

bot.command('relacaoRetirada', async ctx => {
    const user = ctx.message.from.first_name;
    const id = ctx.message.from.id;
    const datetime = moment().format('DD/MM/YYYY hh:mm:ss');

    const context = (`${datetime} - ${id} - ${user} digitou o comando /relacaoRetirada\n`);
    fs.appendFile('bot.log', context, err => {
        if (err) throw err;
    } )
    console.log(context);

    const query = await pool.query('select acc.valor,nom.name,acc.data_invest from investiments acc join nomes nom on (acc.name_code=nom.code) where nom.code=4');

    var valorTotal = 0;
    var array_message = [];
    array_message.push("Resumo de retiradas");

    if(query.rows.length==0) {
        ctx.reply("Não há registros!");
    } else {
        for (row in query.rows){
            var valor = formataDinheiro(Number(query.rows[row].valor));
            valorTotal = valorTotal + Number(query.rows[row].valor);
            var mensagem = `\n\n${moment(query.rows[row].data_invest).format("DD/MM/YYYY hh:mm")}\nR$ ${valor}`;
            array_message.push(mensagem.toString());
        };
        valorTotal = formataDinheiro(valorTotal);
        array_message.push(`\n\nValor Total\nR$ ${valorTotal}`);
        ctx.reply(array_message.toString());
    };
});

bot.command("help", ctx => {
    const user = ctx.message.from.first_name;
    const id = ctx.message.from.id;
    const datetime = moment().format('DD/MM/YYYY hh:mm:ss');

    const context = (`${datetime} - ${id} - ${user} digitou o comando /help\n`);
    fs.appendFile('bot.log', context, err => {
        if (err) throw err;
    } )
    console.log(context);

    ctx.reply("Lista de Comandos\n\n/guardarFernando\n/relacaoFernando\n/guardarBrenda\n/relacaoBrenda\n/valorTotal\n/relacaoMensal\n/guardarRendimento\n/retirarSonho\n/relacaoRetirada")
})

function formataDinheiro(n) {
    return  Number(n).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}

bot.launch();
console.log("press CTRL + C to cancel.")