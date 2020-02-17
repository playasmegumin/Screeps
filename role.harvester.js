module.exports = {
    run: function(creep){
        if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity() || 1) {
            creep.say('欧拉!');

            var tar = creep.pos.findClosestByPath(FIND_SOURCES);
            if(!tar){ creep.say('Confused :('); return -1; }
            if(creep.room.name == 'W35N28'){
                creep.say('dd');
                if(creep.pos.isEqualTo(Game.flags['Source1R1'])) creep.harvest(tar);
                else creep.moveTo(Game.flags['Source1R1'],{visualizePathStyle: {stroke: '#ffaa00'}});
            }else{
                creep.say('dd');
                if(creep.pos.isEqualTo(Game.flags['Source1R2'])) creep.harvest(tar);
                else creep.moveTo(Game.flags['Source1R2'],{visualizePathStyle: {stroke: '#ffaa00'}});
            }
            if(creep.pos.isEqualTo(Game.flags['Source1R1'])) creep.drop(RESOURCE_ENERGY);
            if(creep.pos.isEqualTo(Game.flags['Source1R2'])) creep.drop(RESOURCE_ENERGY);
        }else{
            //creep.drop(RESOURCE_ENERGY);
            //return;
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