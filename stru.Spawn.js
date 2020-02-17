module.exports = {
    run: function(Spawn){
        var spawn = Game.spawns[Spawn];
        if(spawn.spawning) return;
        const room = spawn.room.name;
        var creep_list = spawn.room.find(FIND_MY_CREEPS);
        var srcminer_count = 0;
        var picker_count = 0;
        var upgrader_count = 0;
        var upgpicker_count = 0;
        var maintainer_count = 0;
        var builder_count = 0;
        var cs_list = spawn.room.find(FIND_CONSTRUCTION_SITES);
        
        for(var creep of creep_list){
            if(creep.memory.role == 'srcminer') srcminer_count++;
            if(creep.memory.role == 'picker') picker_count++;
            if(creep.memory.role == 'upgrader') upgrader_count++;
            if(creep.memory.role == 'upgpicker') upgpicker_count++;
            if(creep.memory.role == 'maintainer') maintainer_count++;
            if(creep.memory.role == 'builder') builder_count++;
        }

        if(srcminer_count < Memory.rooms[room].spawnlist.srcminer.count){
            const body = Memory.rooms[room].spawnlist.srcminer.body;
            const name = 'srcminer '+Game.time%010503;
            spawn.spawnCreep(body,name,{memory:{role:'srcminer'}});
        }

        if(picker_count < Memory.rooms[room].spawnlist.picker.count){
            const body = Memory.rooms[room].spawnlist.picker.body;
            const name = 'picker '+Game.time%010503;
            spawn.spawnCreep(body,name,{memory:{role:'picker'}});
        }

        if(upgrader_count < Memory.rooms[room].spawnlist.upgrader.count){
            const body = Memory.rooms[room].spawnlist.upgrader.body;
            const name = 'upgrader '+Game.time%010503;
            spawn.spawnCreep(body,name,{memory:{role:'upgrader'}});
        }

        if(upgpicker_count < Memory.rooms[room].spawnlist.upgpicker.count){
            const body = Memory.rooms[room].spawnlist.upgpicker.body;
            const name = 'upgpicker '+Game.time%010503;
            spawn.spawnCreep(body,name,{memory:{role:'upgpicker'}});
        }

        if(maintainer_count < Memory.rooms[room].spawnlist.maintainer.count){
            const body = Memory.rooms[room].spawnlist.maintainer.body;
            const name = 'maintainer '+Game.time%010503;
            spawn.spawnCreep(body,name,{memory:{role:'maintainer'}});
        }

        if(cs_list.length > 0 && builder_count < 2){
            const body = Memory.rooms[room].spawnlist.builder.body;
            const name = 'builder '+Game.time%010503;
            spawn.spawnCreep(body,name,{memory:{role:'builder'}});
        }

        if(spawn.room.name == 'W48N31' && false){
            if(picker_count >= Memory.rooms[room].spawnlist.picker.count && srcminer_count == Memory.rooms[room].spawnlist.srcminer.count){
                if(!Game.creeps['S']){
                    Game.spawns['R4S1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE, MOVE,WORK,WORK,CARRY,MOVE, 
                        MOVE,MOVE,WORK,WORK,CARRY, MOVE,MOVE,MOVE,WORK,WORK, 
                        CARRY,MOVE,MOVE,MOVE],'S',{memory:{role:'digger'}}); 
                } 
                if(!Game.creeps['T']){
                    Game.spawns['R4S1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE, MOVE,WORK,WORK,CARRY,MOVE, 
                        MOVE,MOVE,WORK,WORK,CARRY, MOVE,MOVE,MOVE,WORK,WORK, 
                        CARRY,MOVE,MOVE,MOVE],'T',{memory:{role:'digger'}}); 
                }
                if(!Game.creeps['V']){
                    Game.spawns['R4S1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE, WORK,WORK,CARRY,MOVE,MOVE,MOVE,
                        WORK,WORK,CARRY,MOVE,MOVE,MOVE, WORK,WORK,CARRY,MOVE,MOVE,MOVE],'V',{memory:{role:'digger'}}); 
                }
                if(!Game.creeps['U']){
                    Game.spawns['R4S1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE, WORK,WORK,CARRY,MOVE,MOVE,MOVE,
                        WORK,WORK,CARRY,MOVE,MOVE,MOVE, WORK,WORK,CARRY,MOVE,MOVE,MOVE],'U',{memory:{role:'digger'}}); 
                }
                if(!Game.creeps['W']){
                    Game.spawns['R4S1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE, MOVE,WORK,WORK,CARRY,MOVE, 
                        MOVE,MOVE,WORK,WORK,CARRY, MOVE,MOVE,MOVE,WORK,WORK,CARRY,MOVE,MOVE,MOVE],'W',{memory:{role:'digger'}}); 
                }
                if(!Game.creeps['X']){
                    Game.spawns['R4S1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE, MOVE,WORK,WORK,CARRY,MOVE, 
                        MOVE,MOVE,WORK,WORK,CARRY, MOVE,MOVE,MOVE,WORK,WORK, 
                        CARRY,MOVE,MOVE,MOVE],'X',{memory:{role:'digger'}}); 
                }
                if(!Game.creeps['Z']){
                    Game.spawns['R4S1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE, MOVE,WORK,WORK,CARRY,MOVE, 
                        MOVE,MOVE,WORK,WORK,CARRY, MOVE,MOVE,MOVE,WORK,WORK, 
                        CARRY,MOVE,MOVE,MOVE],'Z',{memory:{role:'digger'}}); 
                }
            }
        }

        if(spawn.room.name == 'W49N35' && false){
            if(picker_count >= Memory.rooms[room].spawnlist.picker.count && srcminer_count == Memory.rooms[room].spawnlist.srcminer.count){
                if(!Game.creeps['Y']){
                    Game.spawns['R5S'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE,WORK,WORK,CARRY,MOVE,MOVE,MOVE,WORK,WORK,CARRY,MOVE,MOVE,MOVE],'Y',{memory:{role:'digger'}}); 
                }
            }
        }
    }
};