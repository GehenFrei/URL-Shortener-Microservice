'use strict';
var Urls = require('../models/urls.js');

function UrlHandler () {
    
    this.setShortUrl = function(req, res) {
        var path = req.path.substring(5, req.path.length);

        var allowInvalid = req.query.allow === "true" || false;
        if (!isValidUrl(path) && !allowInvalid) {
            res.json({"error": "Invalid Url"});
            return;
        }
        
        Urls.find({"original_url": req.path.substring(5, req.path.length) }).exec(function(err, result) {
            if (err) console.error(err);
            
            var orgin = "original_url";
            var short = "short_url";
            
            var resultLength = result.length;
            if (resultLength === 0) {
                Urls.find({}).exec(function(err, result) {
                    if (err) console.error(err);
                    
                    var data = {"original_url": path, "short_url": process.env.APP_URL + result.length };
                    var url = new Urls(data);
                    url.save(function (err, result) {
                        if (err) console.error("Error: " +err );
                        
                        res.json({original_url: result[orgin], "short_url": result[short]});
                    });
                
                });
            }
            else {
                res.json({"original_url": result[0][orgin], "short_url": result[0][short]});
            }
        });
    };
    
    
    this.findUrl = function(req, res) {
        var path = req.path.substring(1, req.path.length);

        Urls.find({"short_url": process.env.APP_URL + path}).exec(function(err, result) {
            if (err) console.error(err);
            
            if (result.length === 0 ) {
                res.json({"error":"No short url found for given input"});
            }
            else {
                res.redirect(result[0]["original_url"]);
            }
        });
    };
    
    var isValidUrl = function(url) {
        var match = url.match(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i);
        return match !== null;
    }
    
}

module.exports = UrlHandler;
