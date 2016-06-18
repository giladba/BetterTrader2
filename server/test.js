var loopback = require('loopback');
var boot     = require('loopback-boot');

/**
 * Created by giladba on 6/5/2016.
 */
var myFunc  = function(app) {
    var Client = app.models.Client;
    var Instrument = app.models.Instrument;

    //
    //Client.create(
    //    {name:"aaa", password:"bbb", email:"aaa@gmail.com"},
    //    function(err,output){
    //      if (err) {
    //        console.log(err);
    //        return;
    //      }
    //      console.log("no error");
    //    }
    //);

    //Client.create({name:"rrr2", password:"uuu", email:"rrr2@gmail.com"}, function(err,c2) {
    //    if (err) {
    //        console.log(err);
    //        return;
    //    }
    //    console.log(JSON.stringify(c2));
    //});
	//
    //Instrument.create({name:"K", displayName:"B", pip:1.5, maxTradeUnits:3}, function(err,c2) {
    //    if (err) {
    //        console.log(err);
    //        return;
    //    }
    //    console.log(JSON.stringify(c2));
    //});

    Instrument.find({where:{name:"XPD_USD"}}
        ,function(err, inst) {
            console.log("inst = " + JSON.stringify(inst));

            Client.find({where:{username:"natan"}}
                ,function(err, output) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("output = " + JSON.stringify(output));
                    var client = output[0];
                    console.log("client = " + JSON.stringify(client));
                    client.instruments.create({name:"A", displayName:"B", pip:1.5, maxTradeUnits:3} ,function(err,created) {
                        if (err) {
                            console.log(err);
                            return;
                        }

                        Instrument.find({where:{name:"A"}}
                            ,function(err, f) {
                                console.log("FFFFFF="+ JSON.stringify(f));

                            });

                        console.log("created inst = " + JSON.stringify(created));

                        client.instruments({},function(err,res){
                            if(err) {
                                console.log("ERRRRRRORRRRRRRR");
                                console.log(err);
                                return;
                            }
                            console.log("found by id = " + JSON.stringify(res));
                        });
                    });
                }
            );
        });




//
//
//Client.find({filter: {
//  include: [
//    'instruments'
//  ]
//}}, function(err, found) {
//  if (err) {
//    console.log(err);
//
//    return;
//  }
//  var client = new Client(found[0]);
//  console.log("client="+JSON.stringify(client));
//  console.log("found="+JSON.stringify(found));
//})

//var t = Client.find({}, function(err, found) {
//    if(err){
//      console.log(err);
//      return;
//    }
//  console.log("found="+found);
//});
// var Rate = app.models.Rate;
//var Insts = app.models.Instrument;

//var Client = app.models.Client;
//console.log(Client);


//Rate.find({ }, function(err, rates) {
//    console.log(rates)
// });

//console.log("Client Inst");
//
//Client.findById("575d723dafcd45404341aee6", function(err, foundUser)  {
//  var myUser = foundUser;
//  console.log(foundUser);
//});
//
//console.log("aaaa = " + Insts.users + " !!!!!!!");


//Client.instruments.findById("575d723dafcd45404341aee6", function(err, foundUser)  {
//  console.log(foundUser);
//});

// Client.instruments({}, function(value, responseHeaders) {}, function(httpResponse) {});
// console.log(Client.instruments.findById({"id:":"575d723dafcd45404341aee6"}));

//
//Insts.create({"userID":"111","InstID":333},function(err){
//  if(err)
//    console.log(err)
//});
//Insts.find({}, function(err, answer){
//  console.log("start inst tracking log");
//  console.log(answer);
//  console.log("end inst tracking log");
//});
//
//Insts.sayHi(function(err, answer){
//  console.log("start inst ans log");
//  console.log(answer);
//  console.log("end inst ans log");
//});

}

var app = loopback();

boot(app, __dirname, function (err) {
    if (err) throw err;

});

myFunc(app);
