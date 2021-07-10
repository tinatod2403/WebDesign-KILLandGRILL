$(document).ready(function () {
    $("#pdfBtn").click(saveToPDF)
});

function saveToPDF() {
    var pdf = new jsPDF()
    console.log($("#recipeContent").text())
    var content =$("#recipeTitle").html() + "VREME SPREMANJA: "+$("#recipeTime").html()+$("#recipeContent").html()
    var filename = $("#recipeTitle").text() +".pdf"
    pdf.fromHTML(content);
    pdf.save(filename);
}

window.addEventListener("load", () => {
    var opis = document.querySelector("label[for=opisProblema]").innerHTML;
    document.getElementById("potvrdaForme").addEventListener("click", () => savePDF(opis)); 
})

function savePDF(opis) {
    if (storageGet("logged") == null) {
      if (isEnglish()) alert("Log in to make reservations");
      else alert("Ulogujte se kako biste omogucili zakazivanja");
      return;
    }
    var form = document.forms["onlyForm"];
    var eng = isEnglish();
    var rows = [
        [eng?"Name" : "Ime", form["formName"].value],
        [eng?"Surname" : "Prezime", form["formSurname"].value],
        ["Email", form["formMail"].value],
        [eng?"Phone number" : "Broj telefona", form["formNumber"].value],
        [eng?"Date" : "Datum", form["formDate"].value],
        [opis, form["opisProblema"].value]
    ];
    

    var pdf = new jsPDF('l');

  
    pdf.autoTable({
        startY: 60,
        head: [
          [
            {
              content: eng?"Appointment" : "Zahtev za pregled",
              colSpan: 2,
              styles: { halign: 'center', fillColor: [22, 160, 133] },
            },
          ],
        ],
        body: rows,
        theme: 'grid',
        styles: { overflow: 'ellipsize', cellWidth: 'wrap' },
        columnStyles: { 1: { cellWidth: 'auto' } },
      })
  
    pdf.save(eng?"appointment.pdf" : "zahtev.pdf");
};