// DELETED FITUR 
    // DELETED ORDER
function deleteItem(itemId) {
    if (confirm("Are you sure you want to delete this item?")) {
        fetch(`/delete/${itemId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            window.location.reload();
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    }
  }

    // DELETED EMPLOYE
function deleteEmply(itemId) {
    if (confirm("Are you sure you want to delete this employ?")) {
        fetch(`/deleteEmply/${itemId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            window.location.reload();
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    }
}

    // DELETED CUSTOMER SERVICE
function deleteCs(itemId) {
    if (confirm("Are you sure you want to delete this customer service?")) {
        fetch(`/deleteCs/${itemId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            window.location.reload();
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    }
}

    // DELETED SUPPLIER



//   END DELETED FITUR

// PRINT FITUR
function generateReceipt(noInvoice, idOrder, jumlahHarga, tanggal) {
    const receiptContent = `
        <h2 class="text-2xl font-bold mb-4 text-center text-yellow-400">Invoices ${noInvoice}</h2>
        <p class="text-md"><strong>No Invoice:</strong> ${noInvoice}</p>
        <p class="text-md"><strong>ID Order:</strong> ${idOrder}</p>
        <p class="text-md"><strong>Total Harga:</strong> ${jumlahHarga}</p>
        <p class="text-md"><strong>Tanggal:</strong> ${tanggal}</p>        
    `;
    document.getElementById('receipt-content').innerHTML = receiptContent;
    document.getElementById('receipt-container').style.display = 'block';
}

function printReceipt() {
    const receiptContainer = document.getElementById('receipt-content');
    const newWin = window.open('');
    newWin.document.write(receiptContainer.innerHTML);
    newWin.print();
    newWin.close();
    document.getElementById('receipt-container').style.display = 'none';
}

function generateOrder(id_pembeli,nama_pembeli, email_pembeli, no_handphone, alamat, nama_barang, harga) {
    // Create a receipt template as a string
    const receiptTemplate = `
      <html>
    <head>
      <title>Receipt</title>
      <link rel="stylesheet" href="css/style.css">
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .receipt-container {
          width: 90%;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
          text-align: start;
          margin : 50px 0 50px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        th, td {
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        .total {
          font-weight: bold;
        }

        .information{
            margin-bottom : 50px;
        }
      </style>
    </head>
    <body>
      <div class="receipt-container">
        <h1>Invoice</h1>

        <table class="information">
            <tr>
                <th style= "color: orange">Bills To</th>
                <th style= "color: orange">Invoice Number</th>
                <th style= "color: orange">Date</th>
                <th style= "color: orange">Total</th>
            </tr>

            <tr>
            <td>${nama_pembeli},<br>${alamat},<br> ${no_handphone}</td>
            <td>${id_pembeli}</td>
            <td>10/7/24</td>
            <td>Rp.${harga}</td>
            </tr>
        </table>

        <table class="information">
            <tr>
                <th style= "color: orange">Item</th>
                <th style= "color: orange">Price</th>
                <th style= "color: orange">Qty</th>
            </tr>

            <tr>
                <td>${nama_barang}</td>
                <td>${harga}</td>
                <td>1</td>
            </tr>
        </table>
        
        <h2 style= "color: orange">
             uhuy<span class="text-yellow-400">.com</span>
        </h2>
      </div>
    </body>
  </html>
`;
  
    // Get the iframe element
    const printIframe = document.getElementById('print-iframe');
  
    // Create a new document in the iframe
    const doc = printIframe.contentDocument || printIframe.contentWindow.document;
    doc.write(receiptTemplate);
    doc.close();
  
    // Print the iframe content
    printIframe.contentWindow.print();
  }
// END PRINT FITUR

// SIDE BAR FITUR
document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll(".menu-link");
    const pageContents = document.querySelectorAll(".page-content");
  
    pageContents.forEach(function (content) {
      content.style.display = "none"; // Hide all page contents by default
    });

    document.getElementById("orderan").style.display = "block";

    menuLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const contentId = link.getAttribute("data-content");
        pageContents.forEach(function (content) {
          content.style.display = "none";
        });
        document.getElementById(contentId).style.display = "block";
      });
    });
  });
// END SIDE BAR FITUR


// POP UP FITUR
  let popupOverlay = document.getElementById("popup-overlay");
  let popup = document.getElementById("popup");

  function popUp(){
    popup.style.display = 'block';
  }

  popup.addEventListener('click', function(event) {
    this.style.display = 'none';
  })
// END POP UP FITUR

  