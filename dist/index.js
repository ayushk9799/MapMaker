    let statesandUT=[
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Daman and Diu",
    "Delhi",
    "Dadra and Nagar Haveli",
    "Goa",
    "Gujarat",
    "Himachal Pradesh",
    "Haryana",
    "Jharkhand",
    "Jammu and Kashmir",
    "Karnataka",
    "Kerala",
    "Lakshadweep",
    "Maharashtra",
    "Meghalaya",
    "Manipur",
    "Madhya Pradesh",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Puducherry",
    "Rajasthan",
    "Sikkim",
    "Telangana",
    "Tamil Nadu",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
]
let max=100;
  let min=0;
const inputRange = [0, 100];
const palettes = {
  "Sunset": ["#FDC830", "#F19406", "#D46B19", "#BF360C"],
  "Beach": ["#D5F5E3", "#A0DEE5", "#74CFE4", "#22A7F0"],
  "Forest": ["#C0C0C0", "#808080", "#404040", "#000000"],
};

// Create color scale
let colorScale = d3.scaleLinear()
  .domain(inputRange)
  .range(['yellow', 'red']); // Blue to red colormap

// Generate color for a given input

const width = 200;
    const height = 20;

const svgpalette = d3.select("#color-palette");
const gradient = svgpalette.append("linearGradient")
  .attr("id", "gradient")
  .attr("x1", "0%")
  .attr("x2", "100%")
  .attr("y1", "0")
  .attr("y2", "0");

gradient.append("stop")
  .attr("offset", "0%")
  .attr("stop-color", "yellow");

gradient.append("stop")
  .attr("offset", "100%")
  .attr("stop-color", "red");

// Create the rectangle with the gradient fill
svgpalette.append("rect")
  .attr("width", 200)
  .attr("height", 20)
  .attr("fill", "url(#gradient)");

  
  const xScale = d3.scaleLinear()
      .domain(inputRange)
      .range([0, 200]);
     
    // Create and draw the axis
    const axis = d3.axisBottom(xScale)
      .ticks(4) // Adjust based on desired tick frequency
      .tickSize(4) // Adjust tick length
      .tickFormat(d => `${d}`) // Customize tick labels

    svgpalette.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(axis)
      .attr('text-anchor','start');

const redraw=()=>
{
  console.log('redraw')
  
  let inputRange1=[min,max];
  colorScale= d3.scaleLinear()
  .domain(inputRange1)
  .range(['yellow', 'red']);
  console.log(min,' ',max)
  xScale.domain(inputRange1);
  svgpalette.select('g').remove()
  svgpalette.selectAll(".tick").remove();
  const axis = d3.axisBottom(xScale)
    .ticks(5)
    .tickSize(6);
  svgpalette.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0, 30)")
    .call(axis)
    .attr('text-anchor','start'); 
}

   
    const tableBody = document.getElementById('stateUTTableBody');
  //  const mapContainer=document.getElementById('alleditorComponent');
  //  mapContainer.addEventListener('contextmenu',(event)=>
  //  {
  //   event.preventDefault();
  // let div=  document.createElement('div');
  
  //  })
   let svg;

  fetch('indiaStatesedited.svg').then((res)=>res.text()).then((data)=>
  {
    document.getElementById('svg-container').innerHTML=data;
    svgPanZoom(document.getElementById('svg2'),{preventMouseEventsDefault: false});
     svg=document.getElementById('svg-container').firstChild;
    console.log(svg)
    var paths = svg.getElementsByTagName('path')

    console.log(paths)
    
    statesandUT.forEach(stateOrUT => {
    const row = document.createElement('tr');
    const stateCell = document.createElement('td');
    stateCell.textContent = stateOrUT;

    const inputCell = document.createElement('td');
    const input = document.createElement('input');
    input.type = 'number';
    input.name = stateOrUT;
    input.id = stateOrUT;
    inputCell.appendChild(input);

    row.appendChild(stateCell);
    row.appendChild(inputCell);
    tableBody.appendChild(row);
  });
  const textStates=svg.getElementsByTagName('text');
for(let i=0;i<textStates.length;i++)
{
  // textStates[i].addEventListener('click',()=>
  // {
  //   console.log(textStates[i].textContent)

  // })
}

// const addTextBlock=()=>
// {
//   const editor=document.getElementById('alleditorComponent');
//   editor.addEventListener("click",(event)=>
//   {
    
//   })
// }
let shouldBeDoneOrNot=false;
document.getElementById('svg-container').addEventListener('click',(event)=>
{

  console.log('clicking')


  if(!shouldBeDoneOrNot)
  {
    const foreignObject=document.createElementNS('http://www.w3.org/2000/svg','foreignObject');
    foreignObject.setAttribute('x',`${event.clientX}`)
    foreignObject.setAttribute('y',`${event.clientY}`);
    foreignObject.setAttribute("width", "100%");
    foreignObject.setAttribute("height", "100%");
    
    const divinforeign=document.createElement('div');
    divinforeign.style.display="inline-block";
    divinforeign.style.width="auto";
    divinforeign.setAttribute('contentEditable','true');
    divinforeign.addEventListener("mousedown", ()=>
    {
      shouldBeDoneOrNot=true;
    },false);
  
    const text=document.createTextNode("Click To Edit...")
    divinforeign.append(text);
    foreignObject.append(divinforeign);
    svg.append(foreignObject)
  }
  else
  {
    shouldBeDoneOrNot=false;
  }
 
  
})


const values = new Array(36).fill(null);
  const allInput =document.getElementsByTagName('input');
   console.log(allInput[0])
  for(let i=0;i<allInput.length;i++)
  {
    
    allInput[i].addEventListener('input',(event)=>
    {
      console.log(allInput[i]);
      values[i]=event.target.value;
      console.log('input');
         
          coloringthemap();
        });

      }
      const coloringthemap=()=>
      {
        for(let i=0;i<values.length;i++)
        {
          if(values[i]!==null)
          {
            console.log(colorScale(values[i]))
            paths[i].style.fill=colorScale(values[i]);
          }
          if(values[i]===""){
            paths[i].style.fill='black';
          }
          max=Math.max(...values);
          min=Math.min(...values);
                redraw();
        }
        console.log(values)
      }  
      console.log(statesandUT);

  }
   
    )
  function generateHtml(svgString)
  {

  const colorpalette=  document.getElementById('svgPaletteContainer').innerHTML;
  console.log(colorpalette);
    // const encodedSvgString=encodeURIComponent(svgString);
//     return `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <script src="https://bumbu.me/svg-pan-zoom/dist/svg-pan-zoom.js"></script>
//       <title>Published Page</title>
//       <style>
//       #alleditorComponent
//       { 
//         width:max-content;
//         position: relative;
//       }
//       #svg-container {
//         top: 0;
//         border:1px solid red;
//         overflow: hidden;
//         background-color: rgb(200, 200, 200);
//       }
    
//      #svgPaletteContainer
//      {
//       position:absolute;
//       top:10px;
//      left:300px;
    
//      }
//       </style>
//     </head>
//     <body>

//     <div id="alleditorComponent">
//       <div id="svg-container">
//       ${svgString}
//       </div>
     
//       <div id="svgPaletteContainer">
//       ${colorpalette}
//     </div>
//     </div>
// </body>
//       <script>
//       svgPanZoom(document.getElementById('svg2'),{preventMouseEventsDefault: false});

//       </script>
//     </body>

//     </html>
//   `;

const data=
{
  svgString:svgString,
  colorpalette:colorpalette
}
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Specify the content type if sending JSON data
    // You can add other headers if needed
  },
  body: JSON.stringify(data) // Convert the data to a JSON string
};
fetch(`http://localhost:3000/create`,options)
.then(response => {

  
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
})
.then(data => {
    // Handle the fetched data
    console.log(data)
})
.catch(error => {
    // Handle errors
    console.error('Fetch error:', error);
});

  }

    function handler () {

      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svg);
  
  //       const blob = new Blob([svgString], { type: 'image/svg+xml' });
  // console.log(blob);
  console.log('hello')
  console.log(svgString);

  generateHtml(svgString);
  // console.log(html);
  // downloadHTML(html)
  // Create a download link
  // const link = document.createElement('a');
  // link.href = window.URL.createObjectURL(blob);
  // link.download = 'edited_svg.svg';
  // link.click();
      }
      // function downloadHTML(htmlContent) {
      //   const blob = new Blob([htmlContent], { type: 'text/html' });
      //   console.log(blob);
      //   // Create a download link
      //   const link = document.createElement('a');
      //   link.href = window.URL.createObjectURL(blob);
      //   link.download = 'published_page.html';
      //   link.click();
      // }
  
 document.getElementById('button').addEventListener('click',()=>
 {
  handler();
 })
 