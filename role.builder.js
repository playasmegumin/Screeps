var B = require('behaviors');

module.exports = {
    run: function(creep) {
        const room = creep.room.name;
        if(creep.store.getUsedCapacity() == 0) creep.memory.building = 0;
        if(creep.store.getFreeCapacity() == 0) creep.memory.building = 1;

        if(creep.memory.building){
            var target = Game.getObjectById(creep.memory.target);
            if(target == null){
                target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if(target) creep.memory.target = target.id;
                else{
                    creep.say("💤");
                    return;
                }
            }
            if(creep.pos.inRangeTo(target,3)) creep.build(target);
            else creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'},reuse:200});
        }else{
            const pos1 = new RoomPosition(Memory.rooms[room].Source1.x, Memory.rooms[room].Source1.y, room);
            const pos2 = new RoomPosition(Memory.rooms[room].Source2.x, Memory.rooms[room].Source2.y, room);
            const pos3 = new RoomPosition(Memory.rooms[room].Mineral.x, Memory.rooms[room].Mineral.y, room);
            var target = pos1;
            if(B.DetectResource(pos1,'energy') < B.DetectResource(pos2,'energy')) target = pos2;
            if(Memory.rooms[room].storage) target = creep.room.storage.pos; 
            if(creep.pos.isNearTo(target)) B.GetResource(creep, target, 'energy');
            else creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'},reuse:200});
        }

        /*
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('饿了= =');
        }
        
	    if(!creep.memory.building && creep.store[RESOURCE_ENERGY] >= 50) {
	        creep.memory.building = true;
	        creep.say('BiuBiuBiu!');
	    }

	    if(creep.memory.building) {
            if(creep.room.name == 'W35N28'){
                if(creep.pos.inRangeTo(40,25,1)){
                    creep.moveTo(42,25);
                }
            }else{
                if(creep.pos.inRangeTo(16,33,1)){
                    creep.moveTo(18,33);
                }
            }

            var targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            
			if(targets == null)
                creep.memory.role = 'wk';
            else if(creep.build(targets) == ERR_NOT_IN_RANGE)
                creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
            else creep.say('无线充电!');
	    }else{
            if(creep.pos.isNearTo(creep.room.storage)){
                var amount = creep.store.getFreeCapacity();
                if(creep.room.storage.store[RESOURCE_ENERGY] < amount) amount = creep.room.storage.store[RESOURCE_ENERGY];
                creep.withdraw(creep.room.storage,RESOURCE_ENERGY,amount);
            }else creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffaa00'}});
	    }*/
	}
};