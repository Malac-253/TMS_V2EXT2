var getData = function(link, file_name)
{
    var scraper = require('./tools').scraper;
    //scraper = function(url,parseFcn,filename)
    //scrapes a URL, parses it with parseFcn, and archives the data in a JSON file called filename.
    var getChars = function($,data)
    {
        var parent = $("body");
        var children = parent.find("pre");
        children.toArray()       
            .forEach(function(item,index)
            {
                data.push($(item).text());
            });
    }
    //to test
    //var link = "http://a.4cdn.org/adv/thread/21471264.json";
    //var file_name = "test.json";
    scraper(link ,getChars, file_name)
}

//exports.getData




//main function for success 
var codeMain = function(filmData)
{
    addtopageData(filmData);
    
}

var drawHomepage = function(filmData)
{
    d3.selectAll("body *").remove()
    d3.select("body").append("div").attr("id","heading")
    d3.select("#heading").append("h1").attr("id","heading-text").text("Choose a Movie!")
    d3.select("body").append("div").attr("id", "banner").text("Click on a title to see more!")
    d3.select("body").append("div").attr("id", "movie-holder").text("")
    d3.select("body").append("div").attr("id", "info-box").text("")
    d3.select("body").append("script").attr("src", "https://d3js.org/d3.v5.min.js")
    d3.select("body").append("link").attr("href", "style.css").attr("rel","stylesheet").attr("type","text/css")
 d3.select("body").append("script").attr("type","text/javascript").attr("src","script.js")
    
    addtopageData(filmData);
}

//draws the pages for each film
var drawFilmpage = function(aFilmData,filmData)
{
    d3.selectAll("body *").remove()
    d3.select("body").append("div").attr("id","heading")
    d3.select("#heading").append("h1").attr("id","heading-text").text(aFilmData.title)
    d3.select("body").append("div").attr("id", "banner")
        d3.select("#banner").append("p").attr("class","director").text("Director: "+aFilmData.director)
        d3.select("#banner").append("p").attr("class","producer").text("Producer: " +aFilmData.producer)
        d3.select("#banner").append("p").attr("class","release_date").text("Release Date: "+aFilmData.release_date)
        d3.select("#banner").append("p").attr("class","rt_score").text("Rotten Tomatoes Score: "+aFilmData.rt_score)
        d3.select("body").append("div").attr("id", "info-box").text("")
        d3.select("#info-box").append("p").attr("class","movie_description").text("Description:  "+aFilmData.description)
        d3.select("body").append("div").attr("id", "back-button").text("Click to Go Back")           .on("click",function(aFilmData){
                d3.selectAll("body *").remove()
        d3.select("body").append("script").attr("src", "https://d3js.org/d3.v5.min.js")
    
        
        d3.select("body").append("script").attr("type","text/javascript").attr("src","script.js")    
                console.log("filmData")
                    drawHomepage(filmData)
                // Promise to get data from API
                var dataPromise = d3.json("https://ghibliapi.herokuapp.com/films")
                dataPromise.then(
                    function(filmData)
                    {
                        console.log("filmData: ", filmData)
                        addtopageData(filmData)
                        
                    },
                    function(err)
                    {
                        console.log("Failure - Error : ", err)
                        d3.select("#heading").append("p").attr("id","heading-text").text(" Backup Movie Load failed  - Check Back later")
                    }
                )

        
                    })
d3.select("body").append("link").attr("href", "style.css").attr("rel","stylesheet").attr("type","text/css")
}


//code to add in and bind the data
var addtopageData = function(filmData)
{
        
        
        d3.select("#movie-holder")
        .append("div")
        .selectAll("span")
        .data(filmData)
        .enter()
        .append("div")
        .attr("class","movie_icon")
        .attr("id",function(aFilmData){return "I" + aFilmData.id})
        .text(function(aFilmData){return aFilmData.title})
        .on("click",function(aFilmData){       
          drawFilmpage(aFilmData,filmData)
                }   )
        .on("mouseover",function(aFilmData){
                d3.selectAll("#info-box *").remove()
                d3.select("#info-box")
                    .append("div")
                    .attr("class","movie_description")
                    .text(function(){return aFilmData.description})
                    })
                    
}

// Promise to get data from API
//var getDatafromSite = require('./scrape.js') //exports.getData = function(link, file_name )
var dataPointLink = "http://a.4cdn.org/adv/thread/21471264.json"
var file_name = "test.json"
getData(dataPointLink, file_name)
var dataPromise = d3.json(file_name)

dataPromise.then(
    function(postData)
    {
        console.log("postData.posts: ", postData.posts)
    },
    function(err)
    {
        console.log("Failure - Error : ", err)
        d3.select("#heading").append("p").attr("id","heading-text").text(" Full Movie Load failed - Check Back later")
    }
)