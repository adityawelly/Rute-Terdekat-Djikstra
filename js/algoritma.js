
var request = new XMLHttpRequest();
request.open("GET", "data.json", false);
request.send(null)
var json = JSON.parse(request.responseText);
console.log(json); // this will show the info in firebug console 

var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');
NilaiAcuan = 100;


// koordinat desa
var desa = new Array();
for (var i = 0; i < 8; i++) {
    desa[i] = new Array(json[i].x, json[i].y, json[i].nama);
}
var radiusdesa = 10;

//data matriks jarak
var jarak = new Array(8);
var x = NilaiAcuan;
jarak[0] = new Array(0, x, x, x, 1, x, x, x);
jarak[1] = new Array(x, 0, 1, x, 1, x, x, x);
jarak[2] = new Array(x, 1, 0, 1, 1, x, x, x);
jarak[3] = new Array(x, x, 1, 0, x, x, x, x);
jarak[4] = new Array(1, 1, 1, x, 0, 1, 1, x);
jarak[5] = new Array(x, x, x, x, 1, 0, x, x);
jarak[6] = new Array(x, x, x, x, 1, x, 0, 1);
jarak[7] = new Array(x, x, x, x, x, x, 1, 0);

//data garis jalan antar desa
var garis = new Array();
for (var i = 0; i < desa.length; i++)
    garis[i] = new Array(0, 0, 0, 0, 0, 0, 0, 0);
    garis[0][4] = new Array(542);
    garis[1][4] = new Array(542);
    garis[1][2] = new Array(542);
    garis[2][3] = new Array(542);
    garis[2][4] = new Array(542);
    garis[4][6] = new Array(542);
    garis[4][5] = new Array(542);
    garis[6][7] = new Array(542);


//membuat titik kantor desa
function drawDesa(x, y, radius, warnaIsi, warnaLingkar, warnaBayang, lebarBayang, huruf, warnaHuruf, Keterangan) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = warnaIsi;
    ctx.shadowColor = warnaBayang;
    ctx.shadowBlur = lebarBayang;
    ctx.fill();
    ctx.strokeStyle = warnaLingkar;
    ctx.stroke();
    ctx.font = "10px Calibri";
    ctx.fillStyle = warnaHuruf;
    ctx.fillText(huruf, x - (radius / 2), y + (radius / 2));
    ctx.font = "12px Tahoma";
    ctx.fillStyle = warnaHuruf;
    ctx.fillText(Keterangan, x + (radius) + 4, y + (radius / 2));
}

//membuat garis antar desa
function drawGaris(awal, akhir, color) {
    ctx.beginPath();
    if (akhir < awal) {
    var temp = akhir;
    akhir = awal;
    awal = temp;
    }
    ctx.moveTo(desa[awal][0], desa[awal][1]);
    for (var i = 0; i <= (garis[awal][akhir].length); i += 2) {
    ctx.lineTo(garis[awal][akhir][i], garis[awal][akhir][i + 1]);

    }

    ctx.lineTo(desa[akhir][0], desa[akhir][1]);

    ctx.strokeStyle = color;
    ctx.stroke();
}

//Inisialisasi Peta
function initDesa() {
    ctx.lineWidth =
    1;
    for (var i = 0; i < (desa.length); i++) {
    drawDesa(desa[i][0], desa[i][1], radiusdesa, "White", "Red", "Blue", 10, i, "Blue", desa[i][2]);
    }

}

function initJalan() {
    ctx.lineWidth = 2;
    for (var i = 0; i < (desa.length); i++) {
    for (var j = 0; j < (desa.length); j++) {
        if (garis[i][j] != 0) {
        drawGaris(i, j, "green");
        }
    }
    }
}

function initMap() {
    ctx.drawImage(img, 0, 0);
}

//Load image untuk peta
var img = new Image();
img.onload = function () {

    initMap();
    initJalan();
    initDesa();

};
img.src = "2.png";

// ambil data dari matriks jarak
function bobot(a, b) {
    return jarak[a][b];
}

function dijkstra(Awal, Akhir) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initMap();
    initJalan();
    initDesa();
    Awal = parseInt(Awal);
    Akhir = parseInt(Akhir);
    JumlahVerteks = jarak.length;
    var Posisi = new Array(JumlahVerteks);
    var Kunjungan = new Array(JumlahVerteks);
    var Sebelum = new Array(JumlahVerteks);
    var TakTerdefinisi = -1;
    var i;
    var Verteks;
    var Berhenti;
    var iframe = document.getElementsByTagName('iframe')[0];
    var debug1 = document.getElementById('debug').checked;
    var doc = iframe.contentWindow.document;
    doc.body.innerHTML = "";

    //inisialisasi array;
    for (i = 0; i < JumlahVerteks; i++) {
    Posisi[i] = NilaiAcuan; //nilai acuan = 10000;
    Sebelum[i] = TakTerdefinisi; //tak terdefinisi = -1;
    Kunjungan[i] = false;

    }

    Posisi[Awal] = 0;

    for (Verteks = 0; Verteks < JumlahVerteks; Verteks++) {
    var JarakTerpendek = NilaiAcuan;
    Berhenti = -1;
    for (i = 0; i < JumlahVerteks; i++) {
        if (!Kunjungan[i]) {
        if (Posisi[i] <= JarakTerpendek) {
            JarakTerpendek = Posisi[i];
            Berhenti = i;
        }
        }
    }
    Kunjungan[Berhenti] = true;
    for (i = 0; i < JumlahVerteks; i++) {
        if (!Kunjungan[i]) {
        var w = bobot(Berhenti, i);
        if (Posisi[Berhenti] + w < Posisi[i]) {
            Posisi[i] = Posisi[Berhenti] + w;
            Sebelum[i] = Berhenti;
        }
        }
    }



    //for debugging dijkstra

    if (debug1) {

        doc.write("Iterasi ke " + Verteks);
        var n;
        n = Posisi.length;
        doc.write("<table border=1 align=center><tr>");
        for (i = 0; i < n; i++) {
        doc.write("<th style='width: 60px;'>" + i + "</th>");
        }
        doc.write("</tr><tr>");
        var fixnum;
        for (i = 0; i < n; i++) {
        fixnum = Posisi[i].toFixed(2);
        doc.write("<td style='width: 60px;'>" + fixnum + "</td>");
        }
        doc.write("</tr><tr>");
        for (i = 0; i < n; i++) {
        doc.write("<td style='width: 60px;'>" + Sebelum[i] + "</td>");
        }
        doc.write("</tr><tr>");
        for (i = 0; i < n; i++) {
        doc.write("<td style='width: 60px;'>" + Kunjungan[i] + "</td>");
        }
        doc.write("</tr></table>");
        doc.write("<br>");
    }

    }

    i = Akhir;

    if (Posisi[i] < NilaiAcuan) {
    var Verteks = i;
    var Asal = i;
    ctx.lineWidth = 4;
    doc.write('<link type="text/css" rel="stylesheet" href="css/materialize.min.css">');
    doc.write("<table border=1 class='centered highlight white' align=center><thead><tr>");
    doc.write("<th>Dari</th>");
    doc.write("<th>Ke</th><th>Jarak</th></tr></thead><tbody>");
    while (Verteks >= 0) {
        p =
        Verteks = Sebelum[Verteks];
        if (Verteks >= 0) {
        drawGaris(Verteks, Asal, "Red");
        doc.write("<tr>");
        doc.write("<td>" + desa[Asal][2] + "</td>");
        doc.write("<td>" + desa[Verteks][2] + "</td>");
        doc.write("<td>" + jarak[Asal][Verteks] + " Lokasi </td>");
        doc.write("</tr>");
        Asal = Verteks;

        }


    }
    initDesa();

    alert("Jarak :" + Posisi[i]);
    doc.write("<td colspan=2 rowspan=1>Jarak Total </td>");
    doc.write("<td>" + Posisi[i] + " Lokasi</td>");
    doc.write("</tbody></table>");

    } else {
    alert("Tidak ada Jalur")
    }
}