<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
  <link rel="stylesheet" href="js/bootstrap.min.js">
  <link rel="stylesheet" href="css/style.css">
  <link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet">
  <title>Aditya Welly Andi | Mencari Rute Terpendek</title>
  <link type="text/css" rel="stylesheet" href="css/materialize.min.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body>
  <nav class="navbar navbar-expand-sm">
     <ul class="navbar-nav">
        <li class="nav-item">
          <a href="index.html" class="navbar-brand">Mencari Rute Terpendek</a>
        </li>
      </ul>
    </nav>
  <div class="row">
    <div class="col s12 m4 l3 teal lighten-2" style="height:500px">
      <form class="white">
        <div class="input-field col s12">
          <select name="ke">
            <option value="0">Cicaheum</option>
            <option value="1">Samsat</option>
            <option value="2">Buah Batu</option>
            <option value="3">Leuwi Panjang</option>
            <option value="4">Cicadas</option>
            <option value="5">Cikutra</option>
            <option value="6">Kosambi</option>
            <option value="7">Alun-alun</option>
          </select>
          <label class="black-text">Dari</label>
        </div>

        <div class="input-field col s12">
          <select name="dari">
            <option value="0">Cicaheum</option>
            <option value="1">Samsat</option>
            <option value="2">Buah Batu</option>
            <option value="3">Leuwi Panjang</option>
            <option value="4">Cicadas</option>
            <option value="5">Cikutra</option>
            <option value="6">Kosambi</option>
            <option value="7">Alun-alun</option>
          </select>
          <label class="black-text">Dari</label>
        </div>

        <ul class="collection">
          <li class="collection-item"><input type="button" class="linkcol" value="Tampilkan Rute Terdekat" onclick='dijkstra(dari.value, ke.value)'></li>
          <li class="collection-item"><input type="button" class="linkcol" value="Bersihkan Map" onclick='initMap()'></li>
          <li class="collection-item"><input type="button" class="linkcol" value="Tampilkan Desa" onclick='initMap();initDesa();'></li>
          <li class="collection-item"><input type="button" class="linkcol" value="Tampilkan Jalur" onclick='initMap();initJalan();initDesa();'></li>
        </ul>
        <input id="debug" type="hidden" value="false">
      </form>
    </div>

    <div class="col s12 m8 l9 deep-orange lighten-2" style="height:500px">
    <br/><br/>
    <canvas id="mycanvas" width="850" height="400" style="border:8px solid black;"></canvas>
  </div>
  <div class="row">
    <div class="col s12 m12 l12 deep-orange lighten-2"><br>
      <iframe src="JavaScript:''" style="border:1px; height:auto; width:500px; align:center"></iframe>
    </div>
    <br>
  </div>

  <div class="container-fluid" id="footer" style="margin-top: 100px">
    <div class="row" style="background-color: #202020">
      <div class="garis">
        <p><a href="#" class="navbar-brand" style="color: #bf9b30;border-top: 0;">AW</a>Copyright©Aditya Welly Andi All Right Reserved.</p>
      </div>
    </div>
  </div>
  <div class="contaier-fluid" id="garis"></div>
  <script src="js/jquery.js"></script>
  <script src="js/algoritma.js"></script>
  <script src="js/materialize.min.js"></script>
  <script>
    $(document).ready(function(){
    $('select').formSelect();
    });
  </script>
</body>
</html>