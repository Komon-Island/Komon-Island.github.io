var sprite1, sprite2, sprite3;
var vmin=2;
var vmax=6;
var vr=0.6;
var vstopit=false;

window.addEventListener('load', function() {
	sprite1 = new Chip("sprite1",501,471);
	sprite2 = new Chip("sprite2",591,450);
	sprite3 = new Chip("sprite3",567,363);
	sprite4 = new Chip("sprite4",348,327);
	sprite5 = new Chip("sprite5",260,260);
	movechip("sprite1");
	movechip("sprite2");
	movechip("sprite3");
	movechip("sprite4");
	movechip("sprite5");
});

window.addEventListener('keydown', function(e) {
	var keynum;
	if(!e) e = window.event; // IE
	if(window.event) keynum = e.keyCode; // IE
	else keynum = e.which;
	switch(keynum) {
	case 27: //Esc
		vstopit=true; break;
	}
});

function Chip(chipname,width,height){
	this.named=chipname;
	this.vx=vmax*Math.random()-vmin;
	this.vy=vmax*Math.random()-vmin;
	this.w=width+20;
	this.h=height;
	this.xx=Math.random()*1000;
	this.yy=Math.random()*500;
	this.timer1=null;
	document.getElementById(chipname).style.display="block";
}

function movechip(chipname){
	if(!document.getElementById) return;
	eval("chip="+chipname);
	pageX=-350;
	pageY=-200;
	pageW= window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	pageH= window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	pageW+=650;
	pageH+=450;

	chip.xx=chip.xx+chip.vx;
	chip.yy=chip.yy+chip.vy;
	chip.vx+=vr*(Math.random()-0.5);
	chip.vy+=vr*(Math.random()-0.5);
	if(chip.vx>(vmax+vmin))  chip.vx=(vmax+vmin)*2-chip.vx;
	if(chip.vx<(-vmax-vmin)) chip.vx=(-vmax-vmin)*2-chip.vx;
	if(chip.vy>(vmax+vmin))  chip.vy=(vmax+vmin)*2-chip.vy;
	if(chip.vy<(-vmax-vmin)) chip.vy=(-vmax-vmin)*2-chip.vy;

	if(chip.xx<=pageX) {
		chip.xx=pageX;
		chip.vx=vmin+vmax*Math.random();
	}
	if(chip.xx>=pageX+pageW-chip.w) {
		chip.xx=pageX+pageW-chip.w;
		chip.vx=-vmin-vmax*Math.random();
	}
	if(chip.yy<=pageY){
		chip.yy=pageY;
		chip.vy=vmin+vmax*Math.random();
	}
	if(chip.yy>=pageY+pageH-chip.h) {
		chip.yy=pageY+pageH-chip.h;
		chip.vy=-vmin-vmax*Math.random();
	}

	document.getElementById(chip.named).style.left=chip.xx+"px";
	document.getElementById(chip.named).style.top=chip.yy+"px";

	if(vstopit) return;
	chip.timer1=setTimeout("movechip('"+chip.named+"')",120);
}