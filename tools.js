/*
###################################################################################################################
# Original Name: tool.js                                                                                          #
# UnderStand:70  | Help: DR.B | Collb: null | Creator: null (DR.B)                                                #
###################################################################################################################

#Ghost File - DO NOT EDIT - MIB - TMS 

#V 1.1 - GHOST + 

#CLOSED - 10/16/2019 

###################################################################################################################
###################################################################################################################
*/


const axios = require('axios');
const cheerio = require('cheerio');
const fs = require("fs");


var retrievePage = function(url,command)
{
    axios.get(url)
    .then(function(response)
    {
        command(response.data);   
    })
    .catch(function(error)
    {
        console.log("unable to retrieve URL",error);    
    })
}


var storeToDisk = function(filename,data,callback)
{
    var json = JSON.stringify(data);
    fs.writeFile(filename,json,"utf8",callback);
    console.log("Saving to - maybe - "+filename);
}

//scrapes a URL, parses it with parseFcn, and archives the data in a JSON file called filename.
exports.scraper = function(url,parseFcn,filename)
{
    console.log("reading page");
    retrievePage(url,function(html)
    {
        console.log("reading page 2s");
        console.log("picked up html");
        console.log(html.posts);
        /*
        const $ = cheerio.load(html);
        var data = [];
        parseFcn($,data);
        //if not in jsom form use this code to convert
        */
        storeToDisk(filename,html,function(){console.log("Saved to "+filename);});
    });
}


