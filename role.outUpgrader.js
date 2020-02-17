module.exports = {
    run: function(creep){
        if(creep.memory.arrive != 1 && creep.pos.isEqualTo(Game.flags['OutBuild']))
            creep.memory.arrive = 1;
        if(creep.memory.arrive != 1){
            creep.moveTo(Game.flags['OutBuild']);
            return;
        }

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('Now to Harvest!');
        }
        
	    if(!creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('Now to Upgrade!');
	    }

	    if(creep.memory.upgrading) {
            creep.say('♂ Ah~');
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }else{
            /*if(creep.room.name == 'W35N28'){
                if(creep.pos.isEqualTo(41,25)){
                    creep.pickup(creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES));
                }else creep.moveTo(41,25);
            }else{
                if(creep.pos.isEqualTo(17,33)){
                    creep.pickup(creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES));
                }else creep.moveTo(17,33);
            }return;
*/
            var tar = creep.pos.findClosestByPath(FIND_SOURCES);
			if(tar == null) creep.say('Where the fuck source is???');

            if(creep.harvest(tar) == ERR_NOT_IN_RANGE)
                creep.moveTo(tar, {visualizePathStyle: {stroke: '#ffaa00'}});
            else{
                creep.pickup(creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES));
            }
        }
    }
};