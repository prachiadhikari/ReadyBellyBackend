//Required package
var pdf = require("pdf-creator-node");
var fs = require("fs");
const PurchaseController = require("../controller/PurchaseController");

function getOptions() {
    return {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        header: {
          height: "45mm",
          contents: '<div style="text-align: center;"> City Sports Invoice</div>',
        },
        footer: {
          height: "28mm",
          contents: {
            first: "Cover page",
            2: "Second page", // Any page number is working. 1-based index
            default:
              '<span style="color: #444;">{{page}}</span>Voila!/<span>{{pages}}</span>', // fallback value
            last: "Last Page",
          },
        },
      };
}

function getUser(purchases) {
    return purchases[0].user;
}


function finalizeCreatingPDF(document, options, res) {
    pdf
    .create(document, options)
    .then((result) => {
      res.status(200);
      res.download(result.filename + "");
    //   res.json({status: 200, message: "Successfully Generated"});
    })
    .catch((error) => {
      console.error(error);
      res.status(500);
      res.json({status: 500, message: "Generating pdf failed"});
    });
}

function getDocument(html, user, outputPath, purchases) {
    var purchases = purchases.map(purchase => {
        return {
            id: purchase.id,
            price: purchase.price,
            productName: purchase.product.name
        }
    });

    var user = {
        fullname: user.fullname,
        address1: user.address1
    }

    var document = {
        html: html,
        data: {
          user: user,
          purchases: purchases,
          createdDate: new Date(),
          total: purchases.reduce((accumulator, purchase) => {
              return accumulator + purchase.price;
          }, 0)
        },
        path: outputPath
      };

    return document;
}

function createPdf(res, purchases) {
    var user = getUser(purchases);
    var outputPath = "./invoice-" + user.fullname + "-" + new Date().getTime() +".pdf";
    var html = fs.readFileSync('./templates/invoice.html', 'utf8');
    var options = getOptions();

    var document = getDocument(html, user, outputPath, purchases)
    
    finalizeCreatingPDF(document, options, res);
}

function createInvoice(req, res, next) {
    var userId = req.params.userId;
    var purchasedDate = req.params.purchaseDate;

    try {
        PurchaseController.fetchAllByCreatedDateAndUserIdAndDelivered(req, res, next).then( (purchases) => {
            var purchases = purchases;
            if (purchases.length < 1) {
                res.status(500);
                res.json({status: 500, messaage: "Could not find purchase for purchase date " + req.params.purchasedDate + " and user id " + req.params.userId});
                return;
            }

            createPdf(res, purchases);
        }, (err) => {
            console.log(err);
            res.json({status:500, message: "Could not find purchases"});
        }) 
        
    } catch(err) {
        console.log(err);
        res.status(500);
        res.json({messaage: "Could not fetch purchase by user id " + userId + " and purchasedDate "+ purchasedDate, status: 500});
    }
}

module.exports = { createInvoice };
