module.exports = {
    run: function(){
		for(var name in Memory.creeps){
			if(!Game.creeps[name]){
				if(name == 'W35N28' || name == 'W34N28' || name == 'BtE' || name == 'W42N28' || name == 'W48N31' || name == 'W49N35'){
					continue;
				}
				delete Memory.creeps[name];
			}
		}
	}
}