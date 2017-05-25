/********************************************************
Database Connection Settings
*********************************************************/

// user@server:port/database
exports.conString = "postgres://andres@127.0.0.1:5432/andres";



// module.exports = {
//    query: function(text, values, cb) {
//       pg.connect(function(err, client, done) {
//         client.query(text, values, function(err, result) {
//           done();
//           cb(err, result);
//         })
//       });
//    }
// }

