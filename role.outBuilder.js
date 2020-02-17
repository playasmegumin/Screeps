module.exports = {
    run: function(creep){
        console.log('ddd?' + creep.memory.arrive);
        if(creep.memory.arrive != 1 && creep.pos.isEqualTo(Game.flags['OutBuild']))
            creep.memory.arrive = 1;
        if(creep.memory.arrive != 1){
            creep.moveTo(Game.flags['OutBuild']);
            return;
        }

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('资源资源!');
        }
        
	    if(!creep.memory.building && creep.store[RESOURCE_ENERGY] >= 50) {
	        creep.memory.building = true;
	        creep.say('Move!');
	    }

	    if(creep.memory.building) {
            var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            
			if(targets == null)
                creep.say('累了');
            else if(creep.build(targets) == ERR_NOT_IN_RANGE)
                creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                
	    }else{
            if(creep.room.name == 'W35N28'){
                if(creep.pos.isEqualTo(41,25)){
                    creep.pickup(creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES));
                }else creep.moveTo(41,25);
            }else{
                if(creep.pos.isEqualTo(17,33)){
                    creep.pickup(creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES));
                }else creep.moveTo(17,33);
            }return;

            var tar = creep.pos.findClosestByPath(FIND_SOURCES);

			if(!tar){
                creep.say('Where to Harvest?');
                return -1;
            }

            if(creep.harvest(tar) == ERR_NOT_IN_RANGE)
                creep.moveTo(tar, {visualizePathStyle: {stroke: '#ffaa00'}});
	    }
    }
}