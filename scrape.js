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

