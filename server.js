const express=require('express');
const path= require('path');
const fs=require('fs')
const app=express();
app.use(express.json({limit:'5mB'}))
app.use(express.static(path.join(__dirname,"dist")))

app.post('/create',(req,res)=>
{
console.log('jhbcjh')
const svgString=req.body.svgString;
const colorpalette=req.body.colorpalette;
console.log(__dirname);
const baseUrl='http://localhost:3000';
const filePath = path.join(__dirname,'/dist/published.html');
console.log(filePath)
const pageContent = ` <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://bumbu.me/svg-pan-zoom/dist/svg-pan-zoom.js"></script>
  <title>Published Page</title>
  <style>
  #alleditorComponent
  { 
    width:max-content;
    position: relative;
  }
  #svg-container {
    top: 0;
    border:1px solid red;
    overflow: hidden;
    background-color: rgb(200, 200, 200);
  }

 #svgPaletteContainer
 {
  position:absolute;
  top:10px;
 left:300px;

 }
  </style>
</head>
<body>

<div id="alleditorComponent">
  <div id="svg-container">
  ${svgString}
  </div>
 
  <div id="svgPaletteContainer">
  ${colorpalette}
</div>
</div>
</body>
  <script>
  svgPanZoom(document.getElementById('svg2'),{preventMouseEventsDefault: false});

  </script>
</body>

</html>

`;

fs.writeFileSync(filePath, pageContent);

const pageUrl = `${baseUrl}/pages/published.html`;

res.json({message:`Page created successfully. URL: ${pageUrl}`});
})


app.get('/pages/published.html',(req,res)=>
{
    console.log('pages');
    res.sendFile(path.join(__dirname,'dist','published.html'));
})
app.get('/',(req,res)=>
{
    console.log('hello')
    res.sendFile(__dirname+'/index.html')
})

app.listen(3000,()=>
{
    console.log('server runnig')
})