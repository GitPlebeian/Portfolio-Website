const fs = require('fs')
const ejs = require('ejs')

module.exports = {
    homepage: function(req, res, next) {
        fs.readFile("public/views" + '/dashboard.ejs', 'utf-8', (err, html) => {
            if (err) {
                res.send("Error")
                //Debug.log("error: " + err);
                return
            }
            Game.find({}, function(err, games) {
                if (err) {
                    Debug.log(err)
                    res.send("Error Finding Games")
                    return
                } else if (games) {
                    User.find({}, function(err, users) {
                        if (err) {
                            Debug.log(err)
                            res.send("Error Finding Users")
                            return
                        } else if (users) {
                            Bug.find({}, function(err, bugs) {
                                if (err) {
                                    Debug.log(err)
                                    res.send("Error Finding Bugs")
                                } else if (bugs) {
                                    var usersCount = users.length
                                    var gamesCount = games.length
                                    var bugCount = bugs.length
                                    res.send(ejs.render(html, {
                                        gamesCount: gamesCount,
                                        usersCount: usersCount,
                                        bugCount: bugCount
                                    }))
                                } else {
                                    res.send("No Bugs")
                                }
                            })
                        } else {
                            res.send("No Users")
                        }
                    })
                } else {
                    res.send("No Games Found")
                }
            })
        })
    },
    bugs: function(req, res, next) {
        let networkKey = req.query.networkKey
        if (!networkKey) {
            res.send("Fields not provided")
            return
        }
        if (networkKey != NetworkKey.key) {
            res.send("Fields not provided")
            return
        }
        fs.readFile("public/views" + '/bugs.ejs', 'utf-8', (err, html) => {
            if (err) {
                res.send("Error")
                //Debug.log("error: " + err);
                return
            }
            Bug.find({}, function(err, bugs) {
                if (err) {
                    Debug.log(err)
                    res.send("Error Finding Bugs")
                    return
                } else if (bugs) {
                    res.send(ejs.render(html, {
                        bugs: bugs.reverse()
                    }))
                } else {
                    res.send("No Bugs Found Error")
                }
            })
        })
    }
}
