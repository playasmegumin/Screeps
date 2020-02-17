var roleESC = require('act.role.ESC');
var roleESH = require('act.role.ESH');
var roleESP = require('act.role.ESP');
module.exports = {
    run: function(){
        

        if(!Game.creeps['ESH B'] && Game.rooms['W34N28'].energyAvailable > 1500 && !Game.spawns['S2'].spawning){
            var body = [WORK,WORK,WORK,WORK,WORK, WORK,WORK,WORK,WORK,WORK, MOVE,MOVE,MOVE,MOVE,MOVE];
            var name = 'ESH B'; //3500
            Game.spawns['S2'].spawnCreep(body,name,{memory:{src:'5bbcab279099fc012e632fb0',flag:'ESP B'}}); // here
        }

        if(!Game.creeps['ESC B'] && Game.rooms['W34N28'].energyAvailable > 1650 && !Game.spawns['S2'].spawning){
            var body = [CLAIM,CLAIM,MOVE];
            var name = 'ESC B'; //650
            Game.spawns['S2'].spawnCreep(body,name,{memory:{ctl:'5bbcab279099fc012e632faf'}}); // here
        }

        if(!Game.creeps['ESP BA'] && Game.rooms['W34N28'].energyAvailable > 1850 && !Game.spawns['S2'].spawning){
            var body = [CARRY,CARRY,CARRY,CARRY,CARRY, CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE, WORK];
            var name = 'ESP BA'; // 2500
            Game.spawns['S2'].spawnCreep(body,name,{memory:{role:'ESP B'}});
        }

        if(!Game.creeps['ESP BB'] && Game.rooms['W34N28'].energyAvailable > 1850 && !Game.spawns['S2'].spawning){
            var body = [CARRY,CARRY,CARRY,CARRY,CARRY, CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE, WORK];
            var name = 'ESP BB'; // 2500
            Game.spawns['S2'].spawnCreep(body,name,{memory:{role:'ESP B'}});
        }

        if(!Game.creeps['ESP BC'] && Game.rooms['W34N28'].energyAvailable > 1850 && !Game.spawns['S2'].spawning){
            var body = [CARRY,CARRY,CARRY,CARRY,CARRY, CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE, WORK];
            var name = 'ESP BC'; // 2500
            Game.spawns['S2'].spawnCreep(body,name,{memory:{role:'ESP B'}});
        }

        if(!Game.creeps['ESP BD'] && Game.rooms['W34N28'].energyAvailable > 1850 && !Game.spawns['S2'].spawning){
            var body = [CARRY,CARRY,CARRY,CARRY,CARRY, CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE, WORK];
            var name = 'ESP BD'; // 2500
            Game.spawns['S2'].spawnCreep(body,name,{memory:{role:'ESP B'}});
        }

        if(false){if(!Game.creeps['ESC A'] && Game.rooms['W35N28'].energyAvailable > 1650 && !Game.spawns['Ber'].spawning){
            var body = [CLAIM,CLAIM,MOVE];
            var name = 'ESC A'; //65
            Game.spawns['Ber'].spawnCreep(body,name,{memory:{ctl:'5bbcaafb9099fc012e63292d'}}); // here
        }
        if(!Game.creeps['ESH A'] && Game.rooms['W35N28'].energyAvailable > 3500 && !Game.spawns['Ber'].spawning){
            var body = [WORK,WORK,WORK,WORK,WORK, WORK,WORK,WORK,WORK,WORK, MOVE,MOVE,MOVE,MOVE,MOVE];
            var name = 'ESH A'; //3500
            Game.spawns['Ber'].spawnCreep(body,name,{memory:{src:'5bbcaafb9099fc012e63292c',flag:'ESP A'}}); // here
        }

        if(!Game.creeps['ESP AA'] && Game.rooms['W35N28'].energyAvailable > 1850 && !Game.spawns['Ber'].spawning){
            var body = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH, TOUGH,TOUGH,TOUGH,TOUGH,TOUGH, CARRY,CARRY,CARRY,CARRY,CARRY, CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE, WORK];
            var name = 'ESP AA'; // 2500
            Game.spawns['Ber'].spawnCreep(body,name,{memory:{role:'ESP A'}});
        }

        if(!Game.creeps['ESP AB'] && Game.rooms['W35N28'].energyAvailable > 1850 && !Game.spawns['Ber'].spawning){
            var body = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH, TOUGH,TOUGH,TOUGH,TOUGH,TOUGH, CARRY,CARRY,CARRY,CARRY,CARRY, CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE, WORK];
            var name = 'ESP AB'; // 2500
            Game.spawns['Ber'].spawnCreep(body,name,{memory:{role:'ESP A'}});
        }

        if(!Game.creeps['ESP AC'] && Game.rooms['W35N28'].energyAvailable > 1850 && !Game.spawns['Ber'].spawning){
            var body = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH, TOUGH,TOUGH,TOUGH,TOUGH,TOUGH, CARRY,CARRY,CARRY,CARRY,CARRY, CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE, WORK];
            var name = 'ESP AC'; // 2500
            Game.spawns['Ber'].spawnCreep(body,name,{memory:{role:'ESP A'}});
        }

        if(!Game.creeps['ESP AD'] && Game.rooms['W35N28'].energyAvailable > 1850 && !Game.spawns['Ber'].spawning){
            var body = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH, TOUGH,TOUGH,TOUGH,TOUGH,TOUGH, CARRY,CARRY,CARRY,CARRY,CARRY, CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE, WORK];
            var name = 'ESP AD'; // 2500
            Game.spawns['Ber'].spawnCreep(body,name,{memory:{role:'ESP A'}});
        }}
        if(Game.creeps['ESC A']) roleESC.run(Game.creeps['ESC A']);
        if(Game.creeps['ESH A']) roleESH.run(Game.creeps['ESH A']);
        if(Game.creeps['ESC B']) roleESC.run(Game.creeps['ESC B']);
        if(Game.creeps['ESH B']) roleESH.run(Game.creeps['ESH B']);
        if(Game.creeps['ESP AA']) roleESP.run(Game.creeps['ESP AA']);
        if(Game.creeps['ESP AB']) roleESP.run(Game.creeps['ESP AB']);
        if(Game.creeps['ESP AC']) roleESP.run(Game.creeps['ESP AC']);
        if(Game.creeps['ESP AD'] && Game.creeps['ESH A'] && Game.creeps['ESH A'].pos.isEqualTo(Game.flags['ESP A'])) roleESP.run(Game.creeps['ESP AD']);
        if(Game.creeps['ESP BA']) roleESP.run(Game.creeps['ESP BA']);
        if(Game.creeps['ESP BB']) roleESP.run(Game.creeps['ESP BB']);
        if(Game.creeps['ESP BC']) roleESP.run(Game.creeps['ESP BC']);
        if(Game.creeps['ESP BD']) roleESP.run(Game.creeps['ESP BD']);
    }
}