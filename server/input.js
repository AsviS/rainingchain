io.sockets.on('connection', function (socket) {
	socket.on('click', function (d) {
        //data format: [side,x,y]
		try {
			Test.bandwidth('download',d);
			
			var key = socket.key;
			if(List.main[key]){
				Button.reset(key);    
				
				d[1] = d[1].mm(0,WIDTH);
				d[2] = d[2].mm(0,HEIGHT);
				
				Button.test(key,d[1],d[2],d[0]);
			}
		} catch(err){ logError(err); disconnectPlayer(socket,'Reload the page'); } 
	});
	
	socket.on('input', function (d) {	
		try {
		    Test.bandwidth('download',d);
            
			var player = List.all[socket.key];
			
			if(d.i){
                //d.i format: right,down,left,up,ability0,ability1...
				var move = d.i.slice(0,4);
				for(var i = 0 ; i < 4 ; i++){player.moveInput[i] = +move[i];}
				var ab = d.i.slice(4);
				player.abilityChange.press = ab;
			}

			if(d.m){
				player.mouseX = Math.min(Math.max(d.m[0],0),WIDTH);
				player.mouseY = Math.min(Math.max(d.m[1],0),HEIGHT);
			}
			player.angle = atan2(player.mouseY - HEIGHT/2,player.mouseX - WIDTH/2);	
				
		} catch(err){ logError(err); disconnectPlayer(socket,'Reload the page'); } 
	
	});
});
















