
const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let stars = [];
let shootingStars = [];

let constellationOpacity = 0;
let constellationGrowing = true;





/*
=========================
      CREATE STARS
=========================
*/


for(let i=0;i<500;i++){

    stars.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height*0.7,

        radius:
        Math.random()*1.8,

        brightness:
        Math.random(),

        twinkle:
        Math.random()*0.02

    });

}






/*
=========================
        STARS
=========================
*/


function drawStars(){


stars.forEach(star=>{


ctx.beginPath();


ctx.fillStyle =
`rgba(255,255,255,${star.brightness})`;


ctx.arc(

star.x,

star.y,

star.radius,

0,

Math.PI*2

);


ctx.fill();



star.brightness +=

(Math.random()-.5)
*
star.twinkle;



if(star.brightness<0.2)

star.brightness=.2;



if(star.brightness>1)

star.brightness=1;



});


}







/*
=========================
     SHOOTING STARS
=========================
*/


function createShootingStar(){


shootingStars.push({


x:Math.random()*canvas.width,

y:Math.random()*canvas.height/3,


length:
Math.random()*150+80,


speed:
Math.random()*12+8,


opacity:1


});


}



setInterval(

createShootingStar,

2500

);







function drawShootingStars(){


shootingStars.forEach((star,index)=>{


let gradient =
ctx.createLinearGradient(

star.x,

star.y,

star.x-star.length,

star.y+star.length

);



gradient.addColorStop(
0,
"white"
);


gradient.addColorStop(
1,
"transparent"
);



ctx.beginPath();


ctx.strokeStyle =
gradient;


ctx.lineWidth=3;


ctx.moveTo(

star.x,

star.y

);


ctx.lineTo(

star.x-star.length,

star.y+star.length

);



ctx.stroke();



star.x += star.speed;

star.y += star.speed;



star.opacity-=.01;



if(star.opacity<=0)

shootingStars.splice(index,1);



});

}







/*
=========================
      CONSTELLATION
        M + L
=========================
*/


function drawConstellation(){


let x =
canvas.width/2;


let y = 170;



let points=[


{x:x-90,y:y},

{x:x-50,y:y-70},

{x:x-10,y:y},


// L

{x:x+40,y:y-70},

{x:x+40,y:y},

{x:x+80,y:y}



];





ctx.globalAlpha =
constellationOpacity;



ctx.strokeStyle =
"#dbeafe";


ctx.lineWidth=2;



ctx.beginPath();



points.forEach((p,i)=>{


if(i===0)

ctx.moveTo(
p.x,
p.y
);

else

ctx.lineTo(
p.x,
p.y
);



});



ctx.stroke();




points.forEach(p=>{


ctx.beginPath();


ctx.fillStyle="white";


ctx.shadowBlur=20;

ctx.shadowColor="white";


ctx.arc(

p.x,

p.y,

5,

0,

Math.PI*2

);


ctx.fill();



});




ctx.font="30px serif";

ctx.fillText(

"M + L",

x-35,

y+80

);



ctx.shadowBlur=0;



if(constellationGrowing){

constellationOpacity+=0.005;


if(constellationOpacity>=1)

setTimeout(()=>{

constellationGrowing=false;

},3000);


}

else{


constellationOpacity-=0.003;


if(constellationOpacity<=0){

constellationGrowing=true;

}



}




ctx.globalAlpha=1;


}








/*
=========================
        ANIMATION
=========================
*/


function animate(){


ctx.clearRect(

0,

0,

canvas.width,

canvas.height

);



drawStars();


drawShootingStars();


drawConstellation();



requestAnimationFrame(
animate
);



}



animate();






window.addEventListener(

"resize",

()=>{


canvas.width =
window.innerWidth;


canvas.height =
window.innerHeight;


}

);
