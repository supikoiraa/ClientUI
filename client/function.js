

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password :  '*****',
  database : 'Asiakas'
});

function validateForm() {
    var a = document.forms["myForm"]["id"].value;
    var b =document.forms["myForm"]["firstName"].value;
    var c =document.forms["myForm"]["lastName"].value;
    var d =document.forms["myForm"]["address"].value;
    var e =document.forms["myForm"]["phoneNumber"].value;
    var f =document.forms["myForm"]["email"].value;
    if (a == null || a == "") {
        alert("ID must be filled out");
        return false;
    }
    if (b == null || b == "") {
        alert("First name must be filled out");
        return false;
    }
    if (c == null || c == "") {
        alert("Last name must be filled out");
        return false;
    }
    if (d == null || d == "") {
        alert("Address must be filled out");
        return false;
    }
    if (e == null || e == "") {
        alert("Phone number must be filled out");
        return false;
    }
    if (f == null || f == "") {
        alert("Email must be filled out");
        return false;
    }

}

//tietokantaan lisääminen 
exports.insert= function(req, res){
 
 var insert = {id:req.body.id,firstName:req.body.firstName,lastName:req.body.lastName,address:req.body.address,phone:req.body.phoneNumber,email:req.body.email};

  connection.query("INSERT INTO employee SET ?",insert , function(err, rows, fields){
    if (err){
        console.log("Cannot insert client database");
       res.redirect(303,'/');
    }
    else{
       console.log(JSON.stringify(rows));
       res.redirect(303,'/');
     }
}

)};

//Html:ään tulostaminen
function clients() {
$.get('/showdb', function(data){
var loki = data;
console.log(data);
$( '#content' ).empty();
/*Luodaan pari muuttujaa taulukon ylimmän rivin tulostamista varten*/
var id = "<b> ID </b>";
var firstname = "<b> First Name </b>";
var lastname = "<b> Last Name </b>";
var address = "<b> Address </b>";
var phone = "<b> Phone Number </b>";
var email = "<b> Email </b>";
/*Luodaan taulukko johon sijoitetaan lyhyt ja pitkä url*/
var $table = $( '<table class="table"></table>' );
var $line = $( "<tr></tr>" );
$line.append( $( "<td></td>" ).html( id ) );
$line.append( $( "<td></td>" ).html( firstname ) );
$line.append( $( "<td></td>" ).html( lastname ) );
$line.append( $( "<td></td>" ).html( address ) );
$line.append( $( "<td></td>" ).html( phone ) );
$line.append( $( "<td></td>" ).html( email ) );
$table.append( $line );
for ( i in loki ) {
var $line = $( "<tr></tr>" );
$line.append( $( "<td></td>" ).html( loki[i].id ) );
$line.append( $( "<td></td>" ).html( loki[i].firstName ));
$line.append( $( "<td></td>" ).html( loki[i].lastName ));
$line.append( $( "<td></td>" ).html( loki[i].address ));
$line.append( $( "<td></td>" ).html( loki[i].phone ));
$line.append( $( "<td></td>" ).html( loki[i].email));
$table.append( $line );
}
/*Liitetään taulukko HTML-dokumenttiin*/
$table.appendTo( $( '#content' ) );
});
};