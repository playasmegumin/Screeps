module.exports = {
    run: function(creep){
        var mineral = Game.getObjectById(creep.memory.target);
        
        if(mineral.mineralAmount == 0) creep.memory.mining = 0;
        else creep.memory.mining = 1;
    
        if(creep.memory.mining){
            var target = mineral;
            if(creep.pos.isEqualTo(Game.flags[creep.name])){
                creep.harvest(target);
            }else creep.moveTo(Game.flags[creep.name]);
            for(var resource in creep.store){
                creep.drop(resource);
            }
        }else{
            var target = creep.room.storage;
            if(creep.pos.isNearTo(target)){
                for(const res in creep.store)
                    creep.transfer(target,res);
                creep.memory.mining = 1;    
            }else creep.moveTo(target);
        }
    }
};