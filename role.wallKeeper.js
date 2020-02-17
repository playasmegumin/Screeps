module.exports = {
    run: function(creep){

        if(creep.memory.target == undefined) creep.memory.target = 0;

        var tW = null;
        if(creep.memory.target) tW = Game.getObjectById(creep.memory.target);
        
        if(tW == null){
            tW = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                filter: function(ss) {
                    return (ss.structureType == STRUCTURE_WALL && ss.hits < 1700000)|| 
                            (ss.structureType == STRUCTURE_RAMPART && ss.hits < 1000000); }
            });

            if(tW != null) creep.memory.target = tW.id;
            else creep.say('❌');
        
        }else if(tW != null && tW.hits >= 1020000){
            creep.memory.target = 0;
        }else{
            if(creep.store.getUsedCapacity() == 0){
                if(creep.pos.isNearTo(creep.room.storage)) creep.withdraw(creep.room.storage,RESOURCE_ENERGY,creep.store.getCapacity());
                else creep.moveTo(creep.room.storage);
            }else{
                if(creep.pos.inRangeTo(tW,3)) creep.repair(tW);
                else creep.moveTo(tW);
            }
        }
    }
};