module.exports = {
    tempA: function(){
        if(Game.creeps['LtS']){
            var LtS = Game.creeps['LtS'];
            if(LtS.store.getUsedCapacity() == 0){
                var L = Game.getObjectById(LtS.memory.L);
                var amount = LtS.store.getUsedCapacity();
                if(amount > L.store.getUsedCapacity()) amount = L.store.getUsedCapacity();
                
            }        
        }else if(!Game.creeps['LtS'].spawning) Game.spawns['Ber'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],'LtS',{memory:{L:'5df87103324dd070219ce64c'}});
    }
};