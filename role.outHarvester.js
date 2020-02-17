module.exports = {
    run: function(creep){
        if(creep.memory.arrive == 0 && creep.pos.isEqualTo(Game.flags['OutBuild']))
            creep.memory.arrive = 1;
        if(creep.memory.arrive == 0){
            creep.moveTo(Game.flags['OutBuild']);
            return;
        }

        if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {

            var tar = creep.pos.findClosestByPath(FIND_SOURCES);
            if(!tar){ creep.say('Where the fuck Source is??'); return -1; }
            
            
            if(creep.pos.isEqualTo(Game.flags['Source1R2']) == 0 && Game.flags['Source1R2'].pos.lookFor(LOOK_CREEPS).length == 0){
                creep.moveTo(Game.flags['Source1R2'],{visualizePathStyle: {stroke: '#ffaa00'}});
                return ;
            }else if(0 && creep.pos.isEqualTo(Game.flags['Source2R2']) == 0 && Game.flags['Source2R2'].pos.lookFor(LOOK_CREEPS).length == 0){
                creep.moveTo(Game.flags['Source2R2'],{visualizePathStyle: {stroke: '#ffaa00'}});
                return ;
            }


            var target = creep.pos.findClosestByRange(FIND_SOURCES);
            if(creep.pos.isEqualTo(Game.flags['Source2R2'])) target = Game.getObjectById('5bbcab1c9099fc012e632d94');
            creep.harvest(target);
            creep.drop(RESOURCE_ENERGY);

        }else{
            
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ( 
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.store[RESOURCE_ENERGY] < structure.energyCapacity;
                }
            });
            if(creep.room.energyAvailable >= 1000) targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) && structure.store[RESOURCE_ENERGY] < structure.energyCapacity;
                }
            });
            if(targets) {
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else console.log("CRY!");
        }
    }
};