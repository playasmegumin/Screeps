module.exports = {
    run: function(creep){
        if(creep.memory.tower == undefined) creep.memory.tower = 0;

        if(creep.store.getUsedCapacity() == 0){
            if(creep.pos.isNearTo(creep.room.storage)){
                var amount = creep.store.getFreeCapacity();
                if(creep.room.storage.store[RESOURCE_ENERGY] < amount) amount = creep.room.storage.store[RESOURCE_ENERGY];
                creep.withdraw(creep.room.storage,RESOURCE_ENERGY,amount);
            }else creep.moveTo(creep.room.storage);
        }else{
            var tower = null;
            if(creep.memory.tower) tower = Game.getObjectById(creep.memory.tower);
            if(tower == null || tower.store.getFreeCapacity() < 200){
                tower = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                    filter: function(ss){
                        return ss.structureType == STRUCTURE_TOWER && ss.store[RESOURCE_ENERGY] < 800;
                    }
                });
                if(tower != null) creep.memory.tower = tower.id;
            }

            if(creep.pos.isNearTo(tower)) creep.transfer(tower,RESOURCE_ENERGY);
            else creep.moveTo(tower);
        }
    }
};