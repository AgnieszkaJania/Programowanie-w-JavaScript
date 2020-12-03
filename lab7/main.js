var snieg = document.querySelector('#snow');
var abc = snieg.getContext('2d');
abc.beginPath();
abc.arc(95,50,20,0,2*Math.PI);

abc.fillStyle = 'gray';
abc.fill();
abc.arc(120,80,20,0,2*Math.PI);

abc.fillStyle = 'gray';
abc.fill();